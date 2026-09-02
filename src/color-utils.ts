// Small color helpers used by the wheel + fallback scene tiles.
// No external deps on purpose - keeps the bundle tiny.

export function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  // h: 0-360, s: 0-1, v: 0-1
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

export function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return [h, s, v];
}

export function rgbToCss([r, g, b]: [number, number, number]): string {
  return `rgb(${r}, ${g}, ${b})`;
}

// Simple deterministic string hash -> used to pick a stable hue for scenes
// that have no matching image (so the same scene always gets the same fallback color).
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const FALLBACK_ICONS: [RegExp, string][] = [
  [/christmas|noel|santa/i, "mdi:pine-tree"],
  [/halloween|ghost|pumpkin|fright|witch/i, "mdi:ghost"],
  [/valentine|romantic|love/i, "mdi:heart"],
  [/easter/i, "mdi:egg-easter"],
  [/birthday|party|carnival|dance|disco/i, "mdi:party-popper"],
  [/sunset|sunrise|sun|sunny|sunshine/i, "mdi:weather-sunny"],
  [/rain|storm|thunder|cloud/i, "mdi:weather-lightning-rainy"],
  [/snow|winter|glacier|ice/i, "mdi:snowflake"],
  [/ocean|sea|wave|beach|lake/i, "mdi:waves"],
  [/forest|tree|leaf|jungle|garden/i, "mdi:pine-tree"],
  [/fire|bonfire|flame/i, "mdi:fire"],
  [/star|meteor|galaxy|nebula|milky/i, "mdi:star-four-points"],
  [/mercury|venus|earth|mars|jupiter|saturn|uranus|neptune|planet/i, "mdi:orbit"],
  [/sleep|rest|calm|meditat|healing|soothing|quiet|leisure/i, "mdi:weather-night"],
  [/work|reading|focus/i, "mdi:book-open-page-variant"],
  [/game|sport/i, "mdi:controller-classic"],
  [/music|piano|song/i, "mdi:music"],
  [/candy|sweet/i, "mdi:candy"],
  [/rainbow|colorful|vivid/i, "mdi:palette"],
];

export function fallbackIconFor(sceneName: string): string {
  for (const [re, icon] of FALLBACK_ICONS) {
    if (re.test(sceneName)) return icon;
  }
  return "mdi:auto-fix";
}

// Deterministic pastel-to-vivid gradient background for scenes without a real image.
export function fallbackGradientFor(sceneName: string): string {
  const hash = hashString(sceneName);
  const h1 = hash % 360;
  const h2 = (h1 + 46) % 360;
  return `linear-gradient(135deg, hsl(${h1}, 70%, 42%), hsl(${h2}, 80%, 30%))`;
}
