export type TimelineConfig = {
  startHour: number;
  endHour: number;
  slotMinutes: number;
};

type CreateTimelineConfigInput = Partial<TimelineConfig>;

export function createTimelineConfig(input?: CreateTimelineConfigInput): TimelineConfig {
  const startHour = input?.startHour ?? 7;
  const endHour = input?.endHour ?? 19;
  const slotMinutes = input?.slotMinutes ?? 30;
  return { startHour, endHour, slotMinutes };
}

export function getWindowMinutes(config: TimelineConfig): number {
  const hours = Math.max(0, config.endHour - config.startHour);
  return hours * 60;
}

export function getPxPerMinute(params: { baselineSlotMinutes: number; baselineSlotPx: number }): number {
  const { baselineSlotMinutes, baselineSlotPx } = params;
  const minutes = Math.max(1, Math.floor(baselineSlotMinutes));
  const px = Math.max(1, Math.floor(baselineSlotPx));
  return px / minutes;
}

export function parseHHmmToMinutesFromMidnight(time: string): number | null {
  // Expected formats: '07:15', '7:15' -> normalized to HH:mm
  if (!time || typeof time !== 'string') return null;
  const match = time.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  if (hours < 0 || hours > 23) return null;
  if (minutes < 0 || minutes > 59) return null;
  return hours * 60 + minutes;
}

export function minutesFromWindowStart(totalMinutesFromMidnight: number, config: TimelineConfig): number {
  const windowStart = config.startHour * 60;
  return Math.max(0, totalMinutesFromMidnight - windowStart);
}

export function clampToWindow(totalMinutesFromMidnight: number, config: TimelineConfig): number {
  const start = config.startHour * 60;
  const end = config.endHour * 60;
  return Math.min(Math.max(totalMinutesFromMidnight, start), end);
}

export function computeYAndHeight(params: {
  startAtMinutesFromMidnight: number;
  endAtMinutesFromMidnight: number;
  config: TimelineConfig;
  pxPerMinute: number;
  minTouchPx?: number;
  devicePixelRatio?: number;
}): { y: number; height: number; startMin: number; endMin: number } {
  const { startAtMinutesFromMidnight, endAtMinutesFromMidnight, config, pxPerMinute } = params;
  const minTouchPx = Math.max(1, params.minTouchPx ?? 44);
  const dpr = Math.max(1, Math.floor(params.devicePixelRatio ?? 1));

  const windowStart = config.startHour * 60;
  const windowEnd = config.endHour * 60;
  const windowMinutes = getWindowMinutes(config);

  const startClamped = Math.max(startAtMinutesFromMidnight, windowStart);
  const endClamped = Math.min(endAtMinutesFromMidnight, windowEnd);

  const startMin = Math.max(0, startClamped - windowStart);
  const endMin = Math.min(windowMinutes, Math.max(startMin, endClamped - windowStart));

  const rawY = startMin * pxPerMinute;
  const rawH = Math.max(minTouchPx, (endMin - startMin) * pxPerMinute);

  // Round to device pixel to avoid blurry lines
  const round = (v: number) => Math.round(v * dpr) / dpr;
  const y = round(rawY);
  const height = round(rawH);
  return { y, height, startMin, endMin };
}

export function minutesToHHmmFromWindowStart(params: {
  minutesFromTop: number;
  config: TimelineConfig;
  rounding?: number; // e.g., 5 for 5-minute snaps; default 1 (minute-precise)
}): string {
  const { minutesFromTop, config } = params;
  const rounding = Math.max(1, Math.floor(params.rounding ?? 1));
  const clampedTop = Math.max(0, Math.min(minutesFromTop, getWindowMinutes(config)));
  const roundedTop = Math.round(clampedTop / rounding) * rounding;
  const total = config.startHour * 60 + roundedTop;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
}


