import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GoveeCardConfig } from "./govee-like-light-card";

interface HomeAssistant {
  states: Record<string, any>;
}

// Visual (GUI) editor for govee-like-light-card, built on <ha-selector> —
// the same generic selector component the HA frontend already uses for
// automations/scripts, so it comes "for free" with entity/icon/color
// pickers, filtering, and search, without bundling our own.
@customElement("govee-like-light-card-editor")
export class GoveeLikeLightCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: GoveeCardConfig;

  static styles = css`
    .row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 16px;
    }
    .row.inline {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    label {
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color, #888);
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color, #888);
      margin-top: -2px;
    }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
  `;

  setConfig(config: GoveeCardConfig) {
    this._config = config;
  }

  render() {
    if (!this._config) return nothing;

    return html`
      <div class="row">
        <label>Entité lumière Govee *</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { domain: "light" } }}
          .value=${this._config.entity ?? ""}
          @value-changed=${(e: CustomEvent) => this._valueChanged("entity", e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Sélecteur de scènes (officielles)</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { domain: "select" } }}
          .value=${this._config.scene_entity ?? ""}
          @value-changed=${(e: CustomEvent) => this._valueChanged("scene_entity", e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Sélecteur de scènes DIY</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { domain: "select" } }}
          .value=${this._config.diy_scene_entity ?? ""}
          @value-changed=${(e: CustomEvent) => this._valueChanged("diy_scene_entity", e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Mode musique (interrupteur)</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { domain: "switch" } }}
          .value=${this._config.music_switch_entity ?? ""}
          @value-changed=${(e: CustomEvent) => this._valueChanged("music_switch_entity", e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Type d'ambiance musicale</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { domain: "select" } }}
          .value=${this._config.music_mode_entity ?? ""}
          @value-changed=${(e: CustomEvent) => this._valueChanged("music_mode_entity", e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Sensibilité micro</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { domain: "number" } }}
          .value=${this._config.music_sensitivity_entity ?? ""}
          @value-changed=${(e: CustomEvent) => this._valueChanged("music_sensitivity_entity", e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Nom affiché</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{ text: {} }}
          .value=${this._config.name ?? ""}
          @value-changed=${(e: CustomEvent) => this._valueChanged("name", e.detail.value)}
        ></ha-selector>
        <div class="hint">Laisser vide pour utiliser le nom de l'entité</div>
      </div>

      <div class="two-col">
        <div class="row">
          <label>Icône</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${this._config.icon ?? ""}
            @value-changed=${(e: CustomEvent) => this._valueChanged("icon", e.detail.value)}
          ></ha-selector>
        </div>
        <div class="row">
          <label>Couleur de l'icône</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ color_rgb: {} }}
            .value=${this._config.icon_color ?? undefined}
            @value-changed=${(e: CustomEvent) => this._valueChanged("icon_color", e.detail.value)}
          ></ha-selector>
          <div class="hint">Laisser vide pour suivre la couleur de la lumière</div>
        </div>
      </div>

      <div class="row inline">
        <div>
          <label>Replier couleur / température / scènes par défaut</label>
          <div class="hint">Un clic sur un onglet déplie/replie son contenu</div>
        </div>
        <ha-selector
          .hass=${this.hass}
          .selector=${{ boolean: {} }}
          .value=${this._config.collapsible !== false}
          @value-changed=${(e: CustomEvent) => this._valueChanged("collapsible", e.detail.value)}
        ></ha-selector>
      </div>
    `;
  }

  private _valueChanged(key: keyof GoveeCardConfig, value: unknown) {
    const config = { ...this._config } as any;

    if (value === "" || value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
      delete config[key];
    } else {
      config[key] = value;
    }

    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "govee-like-light-card-editor": GoveeLikeLightCardEditor;
  }
}
