import {getNewsDurationMs, randomInRange, testSpeechSynthesis, testSpeechSynthesisUtterance} from "../utils/utils";
import {SpeechSynthesisUtterance} from "../consts";

type VoiceMap = {|
  +name: string,
  +lang: string,
|};

type OnReady = (voiceMap: VoiceMap[]) => void;
type OnEnd = (id: string | null) => void;

type ReaderProps = {|
  +onEnd: OnEnd,
  +onReady: OnReady,
|}

export class Reader {
  isReady: boolean;
  newsReadingTimer: TimeoutID | null = null;
  onEnd: OnEnd;
  synth: SpeechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  currentId: string | null = null;

  constructor({onReady, onEnd}: ReaderProps) {
    this.isReady = false;
    this.onEnd = onEnd;
    if (testSpeechSynthesis() && testSpeechSynthesisUtterance()) {
      this.synth = window.speechSynthesis;
      this.voices = this.getRussianVoices();
      if (!this.voices.length) {
        this.synth.addEventListener("voiceschanged", () => {
          // this check is needed because "voiceschanged" is fired several times
          if (!this.isReady) {
            this.voices = this.getRussianVoices();
            this.isReady = true;
            onReady(this.getVoicesMap());
          }
        });
      } else {
        this.isReady = true;
        onReady(this.getVoicesMap());
      }
    }
  }

  read(id: string, text: string) {
    if (!this.isReady) {
      console.error("Reader is not ready");
      this.onEnd(id);
      return;
    }

    const voiceName = this.voices[Math.round(randomInRange(0, this.voices.length - 1))].name;
    const pitch = randomInRange(0.7, 1.1);
    const rate = randomInRange(0.9, 1);

    const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voices.find(voice => voice.name === voiceName) || this.voices[0];
    utterance.pitch = pitch;
    utterance.rate = rate;

    this.stop();

    this.synth.speak(utterance);

    this.currentId = id;

    this.newsReadingTimer = setTimeout(() => {
      this.onEnd(this.currentId);
      this.currentId = null;
    }, getNewsDurationMs(text));
  }

  stop() {
    this.synth.cancel();
    if (this.newsReadingTimer !== null) {
      clearTimeout(this.newsReadingTimer);
    }
    this.currentId = null;
  }

  getRussianVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices().filter(voice => voice.lang.startsWith("ru") && voice.localService);
  }

  getVoicesMap(): VoiceMap[] {
    return this.voices.map(voice => ({
      name: voice.name,
      lang: voice.lang,
    }));
  }

  getDuration(text: string) {
    return text.length * 50;
  }
}
