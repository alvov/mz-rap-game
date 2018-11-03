const GAME_NAME = 'rap_game'

const GAGameStart = () => {
  if (window.ga) {
    const isRepeatStartGame: ?string = localStorage.getItem('isRepeatStartGame')
    if(isRepeatStartGame !== null) {
      window.ga('send', 'event', GAME_NAME, 'unique_start_game')
    }
    window.ga('send', 'event', GAME_NAME, 'start_game')
    localStorage.setItem('isRepeatStartGame', '1');
  } else {
    console.error('No GA in WINDOW')
  }
}

const GAStartRecord = () => {
  let isFirstStart: boolean = true;
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'start_record')
    if(isFirstStart) {
      window.ga('send', 'event', GAME_NAME, 'first_start_record')
      isFirstStart = false;
    }
  } else {
    console.error('No GA in WINDOW')
  }
}

const GAStopRecord = () => {
  let isFirstStop: boolean = true;
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'stop_record')
    if(isFirstStop) {
      window.ga('send', 'event', GAME_NAME, 'first_stop_record')
      isFirstStop = false;
    }
  } else {
    console.error('No GA in WINDOW')
  }
}

const GAInteractTrack = (track: string) => {
  let isFirstInteractTrack: boolean = true;
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'interact_track', track)
    if(isFirstInteractTrack) {
      window.ga('send', 'event', GAME_NAME, 'first_interact_track', track)
      isFirstInteractTrack = false;
    }
  } else {
    console.error('No GA in WINDOW')
  }
}

const GAInteractZag = (zag: string) => {
  let isFirstInteractZag: boolean = true;
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