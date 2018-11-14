const GAME_NAME = 'rap_game';

let startTimeStampSecond: number;
const GATimerStart = () => {
  if (window.ga) {
    startTimeStampSecond = Date.now() / 1000;
    let currentGameTime: number = 0;
    setInterval(() => {
      currentGameTime = parseInt(Date.now() / 1000 - startTimeStampSecond);
      window.ga('send', 'event', GAME_NAME, 'game_duration', currentGameTime.toString());
    }, 5000)
  } else {
    console.error('No GA in WINDOW')
  }
};

const GAGameStart = () => {
  if (window.ga) {
    const isRepeatStartGame: boolean   = !!localStorage.getItem('isRepeatStartGame');
    GATimerStart();
    if(!isRepeatStartGame) {
      window.ga('send', 'event', GAME_NAME, 'unique_start_game');
    }
    window.ga('send', 'event', GAME_NAME, 'start_game');
    localStorage.setItem('isRepeatStartGame', '1');
  } else {
    console.error('No GA in WINDOW')
  }
};

let isFirstStart: boolean = true;

const GAStartRecord = () => {
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'start_record')
    if(isFirstStart) {
      window.ga('send', 'event', GAME_NAME, 'first_start_record')
      isFirstStart = false;
    }
  } else {
    console.error('No GA in WINDOW')
  }
};

let isFirstStop: boolean = true;

const GAStopRecord = () => {
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'stop_record')
    if(isFirstStop) {
      window.ga('send', 'event', GAME_NAME, 'first_stop_record')
      isFirstStop = false;
    }
  } else {
    console.error('No GA in WINDOW')
  }
};

let isFirstInteractTrack: boolean = true;

const GAInteractTrack = (track: string) => {
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'interact_track', track)
    if(isFirstInteractTrack) {
      window.ga('send', 'event', GAME_NAME, 'first_interact_track', track)
      isFirstInteractTrack = false;
    }
  } else {
    console.error('No GA in WINDOW')
  }
};

let isFirstInteractZag: boolean = true;

const GAInteractZag = (zag: string) => {
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'interact_zag', zag)
    if(isFirstInteractZag) {
      window.ga('send', 'event', GAME_NAME, 'first_interact_zag', zag)
      isFirstInteractZag = false;
    }
  } else {
    console.error('No GA in WINDOW')
  }
}

export {
  GAGameStart,
  GAStartRecord,
  GAStopRecord,
  GAInteractTrack,
  GAInteractZag
}