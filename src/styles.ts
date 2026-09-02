import { css } from "lit";

// Glassmorphism cyan/teal theme, consistent with the "HOLM Claude" dashboard theme
// used across Oliv's other custom cards (navbar-card, hue-like-light-card-holm, ...).
export const cardStyles = css`
  :host {
    --govee-accent: #22d3ee;
    --govee-accent-2: #14b8a6;
    --govee-glass-bg: rgba(20, 30, 38, 0.55);
    --govee-glass-border: rgba(148, 211, 224, 0.18);
    --govee-glass-highlight: rgba(255, 255, 255, 0.06);
    --govee-radius: 22px;
    --govee-text: #eaf6f8;
    --govee-text-dim: rgba(234, 246, 248, 0.6);
    display: block;
  }

  ha-card {
    position: relative;
    overflow: hidden;
    border-radius: var(--govee-radius);
    background: var(--govee-current-tint, var(--govee-glass-bg));
    border: 1px solid var(--govee-glass-border);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    color: var(--govee-text);
    padding: 18px 18px 14px;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 var(--govee-glass-highlight);
    transition: background 0.6s ease;
  }

  ha-card.is-off {
    --govee-current-tint: rgba(20, 26, 32, 0.6);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  .header .icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--govee-glass-border);
    flex-shrink: 0;
    transition: background 0.3s ease, color 0.3s ease;
  }

  .header .icon-wrap ha-icon {
    color: var(--govee-icon-color, var(--govee-text-dim));
    --mdc-icon-size: 22px;
  }

  .header .titles {
    flex: 1;
    min-width: 0;
  }

  .header .name {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header .state {
    font-size: 12.5px;
    color: var(--govee-text-dim);
    margin-top: 2px;
  }

  ha-switch {
    --mdc-theme-secondary: var(--govee-accent);
    flex-shrink: 0;
  }

  .brightness-row {
    margin: 4px 0 16px;
  }

  .slider {
    position: relative;
    height: 30px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--govee-glass-border);
    overflow: hidden;
    cursor: pointer;
    touch-action: none;
  }

  .slider .fill {
    position: absolute;
    inset: 0;
    width: 40%;
    background: linear-gradient(90deg, var(--govee-accent-2), var(--govee-accent));
    opacity: 0.85;
    transition: width 0.08s linear;
  }

  .slider .label {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    font-size: 11.5px;
    font-weight: 600;
    pointer-events: none;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }

  .slider.disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  .tabs {
    display: flex;
    gap: 4px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--govee-glass-border);
    border-radius: 14px;
    padding: 4px;
    margin-bottom: 14px;
  }

  .tabs button {
    flex: 1;
    min-width: 0;
    border: none;
    background: transparent;
    color: var(--govee-text-dim);
    font-size: 11px;
    font-weight: 600;
    padding: 8px 4px;
    border-radius: 10px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background 0.2s ease, color 0.2s ease;
    font-family: inherit;
  }

  .tabs button.active {
    background: linear-gradient(135deg, var(--govee-accent-2), var(--govee-accent));
    color: #06232a;
  }

  .tabs button:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .panel {
    min-height: 150px;
  }

  /* --- color wheel --- */
  .wheel-wrap {
    display: flex;
    justify-content: center;
    padding: 6px 0 4px;
  }

  .wheel {
    position: relative;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    touch-action: none;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px var(--govee-glass-border), 0 6px 18px rgba(0, 0, 0, 0.3);
  }

  .wheel .thumb {
    position: absolute;
    width: 22px;
    height: 22px;
    margin: -11px 0 0 -11px;
    border-radius: 50%;
    background: var(--govee-thumb-color, #fff);
    border: 3px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  /* --- temperature slider --- */
  .temp-slider {
    position: relative;
    height: 46px;
    border-radius: 16px;
    margin-top: 16px;
    background: linear-gradient(90deg, #ff9a4d, #fff3d6 50%, #a9d4ff);
    border: 1px solid var(--govee-glass-border);
    touch-action: none;
    cursor: pointer;
  }

  .temp-slider .thumb {
    position: absolute;
    top: 50%;
    width: 8px;
    height: 58px;
    margin-top: -29px;
    margin-left: -4px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  .kelvin-label {
    text-align: center;
    font-size: 12.5px;
    color: var(--govee-text-dim);
    margin-top: 8px;
  }

  /* --- scenes --- */
  .scene-subtabs {
    display: flex;
    gap: 6px;
    margin-bottom: 10px;
  }

  .scene-subtabs button {
    border: none;
    background: rgba(255, 255, 255, 0.05);
    color: var(--govee-text-dim);
    font-size: 11.5px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 20px;
    cursor: pointer;
    font-family: inherit;
  }

  .scene-subtabs button.active {
    background: rgba(34, 211, 238, 0.22);
    color: var(--govee-accent);
  }

  .scene-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
    gap: 10px;
    max-height: 260px;
    overflow-y: auto;
    padding-right: 2px;
  }

  .scene-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
    font-family: inherit;
  }

  .scene-tile .thumb {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 16px;
    background-size: cover;
    background-position: center;
    border: 2px solid transparent;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transition: transform 0.15s ease, border-color 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .scene-tile:active .thumb {
    transform: scale(0.94);
  }

  .scene-tile.selected .thumb {
    border-color: var(--govee-accent);
  }

  .scene-tile .thumb ha-icon {
    --mdc-icon-size: 26px;
    color: rgba(255, 255, 255, 0.85);
  }

  .scene-tile .scene-name {
    font-size: 10.5px;
    color: var(--govee-text-dim);
    text-align: center;
    line-height: 1.2;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .scene-tile.selected .scene-name {
    color: var(--govee-text);
  }

  .empty-hint {
    color: var(--govee-text-dim);
    font-size: 13px;
    text-align: center;
    padding: 24px 8px;
  }

  /* --- music mode --- */
  .music-toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--govee-glass-border);
    border-radius: 14px;
    padding: 10px 14px;
    margin-bottom: 14px;
  }

  .music-toggle-row .label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
  }

  .music-toggle-row ha-icon {
    --mdc-icon-size: 20px;
    color: var(--govee-accent);
  }

  .mode-section-label {
    font-size: 11.5px;
    font-weight: 600;
    color: var(--govee-text-dim);
    margin: 2px 0 8px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .mode-chip-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }

  .mode-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--govee-glass-border);
    background: rgba(255, 255, 255, 0.05);
    color: var(--govee-text-dim);
    font-size: 12px;
    font-weight: 600;
    padding: 7px 12px;
    border-radius: 20px;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .mode-chip ha-icon {
    --mdc-icon-size: 16px;
  }

  .mode-chip.selected {
    background: linear-gradient(135deg, var(--govee-accent-2), var(--govee-accent));
    border-color: transparent;
    color: #06232a;
  }

  .sensitivity-row {
    margin-top: 2px;
  }
`;
