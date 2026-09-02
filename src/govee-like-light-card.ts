import { LitElement, html, nothing, PropertyValues } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { hsvToRgb, rgbToHsv, rgbToCss, fallbackIconFor, fallbackGradientFor } from "./color-utils";
import { SCENE_IMAGE_MAP } from "./scene-image-map";
import "./govee-like-light-card-editor";

interface HomeAssistant {
  states: Record<string, any>;
  callService: (domain: string, service: string, data: Record<string, any>) => Promise<void>;
  formatEntityState?: (stateObj: any) => string;
}

export interface GoveeCardConfig {
  type: string;
  entity: string;
  scene_entity?: string;
  diy_scene_entity?: string;
  music_switch_entity?: string;
  music_mode_entity?: string;
  music_sensitivity_entity?: string;
  name?: string;
  icon?: string;
  icon_color?: [number, number, number];
  image_path?: string;
  show_temperature?: boolean;
  collapsible?: boolean;
}

type TabId = "color" | "temp" | "scenes" | "music";
type SceneTabId = "official" | "diy";

const MUSIC_MODE_ICONS: Record<string, string> = {
  Rhythm: "mdi:waveform",
  Sway: "mdi:motion",
  Flow: "mdi:waves",
  Star: "mdi:star-four-points",
  Twinkle: "mdi:star-shooting",
  Hopping: "mdi:chart-bell-curve",
  Rolling: "mdi:rotate-3d-variant",
  "Day and Night": "mdi:weather-night-partly-cloudy",
  "Piano Keys": "mdi:piano",
  Separation: "mdi:call-split",
};

const DEFAULT_IMAGE_PATH = "/local/images/govee_img/";

@customElement("govee-like-light-card")
export class GoveeLikeLightCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: GoveeCardConfig;

  @state() private _activeTab: TabId | null = null;
  @state() private _sceneTab: SceneTabId = "official";
  private _initialTabPicked = false;

  // live-drag preview values (so the UI feels instant even before the state round-trips)
  @state() private _draggingBrightness: number | null = null;
  @state() private _draggingHue: number | null = null;
  @state() private _draggingSat: number | null = null;
  @state() private _draggingKelvin: number | null = null;
  @state() private _draggingSensitivity: number | null = null;

  @query(".slider.brightness") private _brightnessEl?: HTMLElement;
  @query(".wheel") private _wheelEl?: HTMLElement;
  @query(".temp-slider") private _tempEl?: HTMLElement;

  private _rafPending = false;

  setConfig(config: GoveeCardConfig) {
    if (!config.entity) {
      throw new Error("Il faut renseigner une entité `entity` (light.xxx Govee)");
    }
    this._config = {
      image_path: DEFAULT_IMAGE_PATH,
      show_temperature: true,
      collapsible: true,
      ...config,
    };
  }

  getCardSize() {
    return this._config?.collapsible === false ? 6 : 3;
  }

  static getStubConfig() {
    return { type: "custom:govee-like-light-card", entity: "", collapsible: true };
  }

  static getConfigElement() {
    return document.createElement("govee-like-light-card-editor");
  }

  private get _stateObj() {
    return this.hass?.states?.[this._config.entity];
  }

  private get _sceneStateObj() {
    return this._config.scene_entity ? this.hass?.states?.[this._config.scene_entity] : undefined;
  }

  private get _diySceneStateObj() {
    return this._config.diy_scene_entity ? this.hass?.states?.[this._config.diy_scene_entity] : undefined;
  }

  private get _musicSwitchStateObj() {
    return this._config.music_switch_entity ? this.hass?.states?.[this._config.music_switch_entity] : undefined;
  }

  private get _musicModeStateObj() {
    return this._config.music_mode_entity ? this.hass?.states?.[this._config.music_mode_entity] : undefined;
  }

  private get _musicSensitivityStateObj() {
    return this._config.music_sensitivity_entity
      ? this.hass?.states?.[this._config.music_sensitivity_entity]
      : undefined;
  }

  protected updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has("hass")) {
      // clear local drag-preview once a fresh state comes back from HA
      this._draggingBrightness = null;
      this._draggingHue = null;
      this._draggingSat = null;
      this._draggingKelvin = null;
      this._draggingSensitivity = null;
    }
  }

  render() {
    const stateObj = this._stateObj;
    if (!stateObj) {
      return html`<ha-card
        ><div class="empty-hint">
          Entité introuvable : <code>${this._config.entity}</code>
        </div></ha-card
      >`;
    }

    const isOn = stateObj.state === "on";
    const attrs = stateObj.attributes ?? {};
    const supportedModes: string[] = attrs.supported_color_modes ?? [];
    const supportsColor = supportedModes.includes("rgb") || supportedModes.includes("hs") || supportedModes.includes("xy");
    const supportsTemp = supportedModes.includes("color_temp") && this._config.show_temperature !== false;

    const hasSceneEntity = !!this._sceneStateObj;
    const hasDiyEntity = !!this._diySceneStateObj;
    const supportsScenes = hasSceneEntity || hasDiyEntity;

    const musicSwitchObj = this._musicSwitchStateObj;
    const musicModeObj = this._musicModeStateObj;
    const musicSensitivityObj = this._musicSensitivityStateObj;
    const supportsMusic = !!musicSwitchObj || !!musicModeObj || !!musicSensitivityObj;

    const collapsible = this._config.collapsible !== false;

    if (!collapsible && !this._initialTabPicked) {
      // non-collapsible mode keeps the old v1 behaviour: one panel always open
      this._activeTab = supportsColor
        ? "color"
        : supportsTemp
          ? "temp"
          : supportsScenes
            ? "scenes"
            : supportsMusic
              ? "music"
              : null;
      this._initialTabPicked = true;
    }
    // if the entity's capabilities change under us, don't stay stuck on a dead tab
    if (this._activeTab === "color" && !supportsColor) this._activeTab = null;
    if (this._activeTab === "temp" && !supportsTemp) this._activeTab = null;
    if (this._activeTab === "scenes" && !supportsScenes) this._activeTab = null;
    if (this._activeTab === "music" && !supportsMusic) this._activeTab = null;

    const onTabClick = (tab: TabId) => {
      this._activeTab = this._activeTab === tab && collapsible ? null : tab;
    };

    const brightnessPct =
      this._draggingBrightness ?? (isOn ? Math.round(((attrs.brightness ?? 255) / 255) * 100) : 0);

    const rgb: [number, number, number] = attrs.rgb_color ?? [255, 255, 255];
    const [hueFromState, satFromState] = rgbToHsv(rgb[0], rgb[1], rgb[2]);
    const hue = this._draggingHue ?? hueFromState;
    const sat = this._draggingSat ?? satFromState;
    const thumbColor = rgbToCss(hsvToRgb(hue, sat, 1));

    const tint = isOn ? this._tintFor(rgb, brightnessPct) : undefined;

    const icon = this._config.icon || attrs.icon || "mdi:led-strip-variant";
    const iconColor = this._config.icon_color
      ? rgbToCss(this._config.icon_color)
      : isOn
        ? thumbColor
        : undefined;

    return html`
      <ha-card
        class=${isOn ? "" : "is-off"}
        style=${tint ? `--govee-current-tint: ${tint}` : ""}
      >
        <div class="header">
          <div
            class="icon-wrap"
            style=${iconColor ? `--govee-icon-color: ${iconColor}` : ""}
            @click=${this._toggle}
          >
            <ha-icon icon=${icon}></ha-icon>
          </div>
          <div class="titles">
            <div class="name">${this._config.name || attrs.friendly_name || this._config.entity}</div>
            <div class="state">${isOn ? `Allumée · ${brightnessPct}%` : "Éteinte"}</div>
          </div>
          <ha-switch .checked=${isOn} @change=${this._toggle}></ha-switch>
        </div>

        ${isOn
          ? html`
              <div class="brightness-row">
                <div
                  class="slider brightness"
                  @pointerdown=${(e: PointerEvent) => this._startBrightnessDrag(e)}
                >
                  <div class="fill" style="width:${brightnessPct}%"></div>
                  <div class="label">
                    <span>Luminosité</span>
                    <span>${brightnessPct}%</span>
                  </div>
                </div>
              </div>

              <div class="tabs">
                <button
                  class=${this._activeTab === "color" ? "active" : ""}
                  ?disabled=${!supportsColor}
                  @click=${() => onTabClick("color")}
                >
                  Couleur
                </button>
                <button
                  class=${this._activeTab === "temp" ? "active" : ""}
                  ?disabled=${!supportsTemp}
                  @click=${() => onTabClick("temp")}
                >
                  Température
                </button>
                <button
                  class=${this._activeTab === "scenes" ? "active" : ""}
                  ?disabled=${!supportsScenes}
                  @click=${() => onTabClick("scenes")}
                >
                  Scènes
                </button>
                <button
                  class=${this._activeTab === "music" ? "active" : ""}
                  ?disabled=${!supportsMusic}
                  @click=${() => onTabClick("music")}
                >
                  Musique
                </button>
              </div>
            `
          : nothing}
        ${isOn && this._activeTab
          ? html`
              <div class="panel">
                ${this._activeTab === "color" && supportsColor
                  ? this._renderColorWheel(hue, sat, thumbColor)
                  : nothing}
                ${this._activeTab === "temp" && supportsTemp ? this._renderTempSlider(attrs) : nothing}
                ${this._activeTab === "scenes" && supportsScenes
                  ? this._renderScenes(hasSceneEntity, hasDiyEntity)
                  : nothing}
                ${this._activeTab === "music" && supportsMusic
                  ? this._renderMusic(musicSwitchObj, musicModeObj, musicSensitivityObj)
                  : nothing}
              </div>
            `
          : nothing}
      </ha-card>
    `;
  }

  private _tintFor(rgb: [number, number, number], brightnessPct: number): string {
    const [r, g, b] = rgb;
    const alpha = 0.16 + (brightnessPct / 100) * 0.22;
    return `linear-gradient(160deg, rgba(${r}, ${g}, ${b}, ${alpha}), rgba(20, 30, 38, 0.6))`;
  }

  // ---------- color wheel ----------

  private _renderColorWheel(hue: number, sat: number, thumbColor: string) {
    const angle = (hue * Math.PI) / 180;
    const radius = sat * 78; // px, wheel radius ~85 minus thumb margin
    const cx = 85 + radius * Math.cos(angle);
    const cy = 85 + radius * Math.sin(angle);
    const wheelBg = `conic-gradient(from 0deg, red, yellow, lime, cyan, blue, magenta, red)`;
    return html`
      <div class="wheel-wrap">
        <div
          class="wheel"
          style="background: radial-gradient(circle at center, white 0%, transparent 72%), ${wheelBg}"
          @pointerdown=${(e: PointerEvent) => this._startWheelDrag(e)}
        >
          <div class="thumb" style="left:${cx}px; top:${cy}px; --govee-thumb-color:${thumbColor}"></div>
        </div>
      </div>
    `;
  }

  private _startWheelDrag(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
    const update = (ev: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ev.clientX - cx;
      const dy = ev.clientY - cy;
      let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (angle < 0) angle += 360;
      const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy) / (rect.width / 2));
      this._draggingHue = angle;
      this._draggingSat = dist;
      this._throttledCallColor(angle, dist);
    };
    update(e);
    const onMove = (ev: PointerEvent) => update(ev);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (this._draggingHue !== null && this._draggingSat !== null) {
        this._callColor(this._draggingHue, this._draggingSat);
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  private _throttledCallColor(hue: number, sat: number) {
    if (this._rafPending) return;
    this._rafPending = true;
    requestAnimationFrame(() => {
      this._rafPending = false;
      this._callColor(hue, sat);
    });
  }

  private _callColor(hue: number, sat: number) {
    const [r, g, b] = hsvToRgb(hue, sat, 1);
    this.hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      rgb_color: [r, g, b],
    });
  }

  // ---------- brightness slider ----------

  private _startBrightnessDrag(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    if (el.classList.contains("disabled")) return;
    el.setPointerCapture(e.pointerId);
    const update = (ev: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const pct = Math.round(Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width)) * 100);
      this._draggingBrightness = pct;
      this._throttledCallBrightness(pct);
    };
    update(e);
    const onMove = (ev: PointerEvent) => update(ev);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (this._draggingBrightness !== null) this._callBrightness(this._draggingBrightness);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  private _throttledCallBrightness(pct: number) {
    if (this._rafPending) return;
    this._rafPending = true;
    requestAnimationFrame(() => {
      this._rafPending = false;
      this._callBrightness(pct);
    });
  }

  private _callBrightness(pct: number) {
    if (pct <= 0) {
      this.hass.callService("light", "turn_off", { entity_id: this._config.entity });
      return;
    }
    this.hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      brightness_pct: pct,
    });
  }

  // ---------- temperature slider ----------

  private _renderTempSlider(attrs: any) {
    const min = attrs.min_color_temp_kelvin ?? 2000;
    const max = attrs.max_color_temp_kelvin ?? 6500;
    const kelvin = this._draggingKelvin ?? attrs.color_temp_kelvin ?? Math.round((min + max) / 2);
    const pct = Math.max(0, Math.min(1, (kelvin - min) / (max - min)));
    return html`
      <div
        class="temp-slider"
        @pointerdown=${(e: PointerEvent) => this._startTempDrag(e, min, max)}
      >
        <div class="thumb" style="left:${pct * 100}%"></div>
      </div>
      <div class="kelvin-label">${kelvin} K</div>
    `;
  }

  private _startTempDrag(e: PointerEvent, min: number, max: number) {
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
    const update = (ev: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
      const kelvin = Math.round(min + pct * (max - min));
      this._draggingKelvin = kelvin;
      this._throttledCallTemp(kelvin);
    };
    update(e);
    const onMove = (ev: PointerEvent) => update(ev);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (this._draggingKelvin !== null) this._callTemp(this._draggingKelvin);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  private _throttledCallTemp(kelvin: number) {
    if (this._rafPending) return;
    this._rafPending = true;
    requestAnimationFrame(() => {
      this._rafPending = false;
      this._callTemp(kelvin);
    });
  }

  private _callTemp(kelvin: number) {
    this.hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      color_temp_kelvin: kelvin,
    });
  }

  // ---------- scenes ----------

  private _renderScenes(hasSceneEntity: boolean, hasDiyEntity: boolean) {
    if (hasSceneEntity && hasDiyEntity && this._sceneTab !== "official" && this._sceneTab !== "diy") {
      this._sceneTab = "official";
    }
    const showSubtabs = hasSceneEntity && hasDiyEntity;
    const activeSub = showSubtabs ? this._sceneTab : hasSceneEntity ? "official" : "diy";

    const stateObj = activeSub === "official" ? this._sceneStateObj : this._diySceneStateObj;
    const entityId = activeSub === "official" ? this._config.scene_entity : this._config.diy_scene_entity;
    const options: string[] = (stateObj?.attributes?.options ?? []).filter((o: string) => o !== "None");
    const current = stateObj?.state;

    return html`
      ${showSubtabs
        ? html`
            <div class="scene-subtabs">
              <button
                class=${activeSub === "official" ? "active" : ""}
                @click=${() => (this._sceneTab = "official")}
              >
                Scènes
              </button>
              <button class=${activeSub === "diy" ? "active" : ""} @click=${() => (this._sceneTab = "diy")}>
                DIY
              </button>
            </div>
          `
        : nothing}
      ${options.length === 0
        ? html`<div class="empty-hint">Aucune scène disponible pour le moment.</div>`
        : html`
            <div class="scene-grid">
              ${options.map((name) => this._renderSceneTile(name, name === current, entityId!))}
            </div>
          `}
    `;
  }

  private _renderSceneTile(name: string, selected: boolean, entityId: string) {
    const file = SCENE_IMAGE_MAP[name];
    const imagePath = this._config.image_path || DEFAULT_IMAGE_PATH;
    const thumbStyle = file
      ? `background-image: url('${imagePath}${file}')`
      : `background: ${fallbackGradientFor(name)}`;
    return html`
      <button class="scene-tile ${selected ? "selected" : ""}" @click=${() => this._selectScene(entityId, name)}>
        <div class="thumb" style=${thumbStyle}>
          ${file ? nothing : html`<ha-icon icon=${fallbackIconFor(name)}></ha-icon>`}
        </div>
        <div class="scene-name">${name}</div>
      </button>
    `;
  }

  private _selectScene(entityId: string, option: string) {
    this.hass.callService("select", "select_option", {
      entity_id: entityId,
      option,
    });
  }

  // ---------- music mode ----------

  private _renderMusic(musicSwitchObj: any, musicModeObj: any, musicSensitivityObj: any) {
    const musicOn = musicSwitchObj?.state === "on";
    const modeOptions: string[] = (musicModeObj?.attributes?.options ?? []).filter((o: string) => o !== "None");
    const currentMode = musicModeObj?.state;

    return html`
      ${musicSwitchObj
        ? html`
            <div class="music-toggle-row">
              <div class="label"><ha-icon icon="mdi:music"></ha-icon> Mode musique</div>
              <ha-switch .checked=${musicOn} @change=${() => this._toggleMusicMode(musicOn)}></ha-switch>
            </div>
          `
        : nothing}
      ${modeOptions.length
        ? html`
            <div class="mode-section-label">Type d'ambiance</div>
            <div class="mode-chip-grid">
              ${modeOptions.map(
                (mode) => html`
                  <button
                    class="mode-chip ${mode === currentMode ? "selected" : ""}"
                    @click=${() => this._setMusicMode(mode)}
                  >
                    <ha-icon icon=${MUSIC_MODE_ICONS[mode] || "mdi:music-note"}></ha-icon>
                    ${mode}
                  </button>
                `
              )}
            </div>
          `
        : nothing}
      ${musicSensitivityObj ? this._renderSensitivitySlider(musicSensitivityObj) : nothing}
    `;
  }

  private _toggleMusicMode(currentlyOn: boolean) {
    if (!this._config.music_switch_entity) return;
    this.hass.callService("switch", currentlyOn ? "turn_off" : "turn_on", {
      entity_id: this._config.music_switch_entity,
    });
  }

  private _setMusicMode(option: string) {
    if (!this._config.music_mode_entity) return;
    this.hass.callService("select", "select_option", {
      entity_id: this._config.music_mode_entity,
      option,
    });
  }

  private _renderSensitivitySlider(stateObj: any) {
    const min = stateObj.attributes?.min ?? 0;
    const max = stateObj.attributes?.max ?? 100;
    const value = this._draggingSensitivity ?? Number(stateObj.state ?? min);
    const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
    return html`
      <div class="sensitivity-row">
        <div class="slider" @pointerdown=${(e: PointerEvent) => this._startSensitivityDrag(e, min, max)}>
          <div class="fill" style="width:${pct}%"></div>
          <div class="label">
            <span>Sensibilité micro</span>
            <span>${Math.round(value)}</span>
          </div>
        </div>
      </div>
    `;
  }

  private _startSensitivityDrag(e: PointerEvent, min: number, max: number) {
    if (!this._config.music_sensitivity_entity) return;
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
    const update = (ev: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
      const value = Math.round(min + pct * (max - min));
      this._draggingSensitivity = value;
      this._throttledCallSensitivity(value);
    };
    update(e);
    const onMove = (ev: PointerEvent) => update(ev);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (this._draggingSensitivity !== null) this._callSensitivity(this._draggingSensitivity);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  private _throttledCallSensitivity(value: number) {
    if (this._rafPending) return;
    this._rafPending = true;
    requestAnimationFrame(() => {
      this._rafPending = false;
      this._callSensitivity(value);
    });
  }

  private _callSensitivity(value: number) {
    if (!this._config.music_sensitivity_entity) return;
    this.hass.callService("number", "set_value", {
      entity_id: this._config.music_sensitivity_entity,
      value,
    });
  }

  private _toggle() {
    const stateObj = this._stateObj;
    this.hass.callService("light", stateObj?.state === "on" ? "turn_off" : "turn_on", {
      entity_id: this._config.entity,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "govee-like-light-card": GoveeLikeLightCard;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "govee-like-light-card",
  name: "Govee-like Light Card",
  description: "Carte moderne glassmorphism pour les lumières Govee (govee-homeassistant), avec sélecteur de scènes graphique.",
});
