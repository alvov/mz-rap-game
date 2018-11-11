export const getShareLink = (guid: string): string => {
  return `${location.origin}${location.pathname}?rec=${guid}&_share=1`;
};

export const randomInRange = (min: number, max: number): number => {
  return min + Math.random() * (max - min);
};

export const getRecordFromUrl = (url: string = window.location.search): string | null => {
  const urlParams = new URLSearchParams(url);
  return urlParams.get("rec");
};

export const getNewsDurationMs = (text: string): number => {
  return text.length * 50;
};
