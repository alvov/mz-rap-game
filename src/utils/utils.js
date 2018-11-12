import {SpeechSynthesisUtterance} from "../consts";

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

export const testSpeechSynthesis = (): boolean => {
  return typeof window.speechSynthesis === "object" &&
    typeof window.speechSynthesis.getVoices === "function" &&
    typeof window.speechSynthesis.speak === "function" &&
    typeof window.speechSynthesis.cancel === "function";
};

export const testSpeechSynthesisUtterance = (): boolean => {
  try {
    const utter = new SpeechSynthesisUtterance("тест");
    return typeof utter.voice === "object" &&
      typeof utter.pitch === "number" &&
      typeof utter.rate === "number";
  } catch (e) {
    return false;
  }
};
