import * as React from "react";
import * as styles from "./TitlePage.css";
import {Share} from '../Share/Share';
import { TitlePlayer } from './TitlePlayer';

type titleProps = {|
  +startGame: void => void
|}

export function TitlePage(props: titleProps) {
  const { startGame } = props;

  const link: string = `${location.origin}${location.pathname}`;

  let title = 'Рэпчик от Медиазоны';
  let description = 'Проснувшись однажды утром после беспокойного сна, вы решили стать\n' +
    '          муниципальным\n' +
    '          депутатом в Москве. Выборы будут в сентябре, проверить вашу готовность к ним уже сейчас поможет игра\n' +
    '          «Медиазоны»\n' +
    '          и Штаба независимой муниципальной кампании.';

  if(window) {
    if(window.title) {
      title = window.title
    }
    if(window.description) {
      description = window.description;
    }
  }

  return (
    <div className={styles.titlePage}>
      <div className={styles.background}/>
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.description} dangerouslySetInnerHTML={{__html: description}} />
        <button onClick={startGame} className={styles.startGame}>Создать свой трек</button>
        <TitlePlayer />
      </div>
      <Share
        link={link}
      />
    </div>
  );
}

