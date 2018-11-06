import * as React from "react";
import * as styles from "./TitlePage.css";
import {Share} from '../Share/Share';

type titleProps = {|
  +startGame: void => void
|}

export function TitlePage(props: titleProps) {
  const { startGame } = props;

  const link: string = `${location.origin}${location.pathname}`;

  return (
    <div className={styles.titlePage}>
      <div className={styles.background}/>
      <div className={styles.body}>
        <h2 className={styles.title}>Рэпчик от Медиазоны</h2>
        <p className={styles.description}>Проснувшись однажды утром после беспокойного сна, вы решили стать
          муниципальным
          депутатом в Москве. Выборы будут в сентябре, проверить вашу готовность к ним уже сейчас поможет игра
          «Медиазоны»
          и Штаба независимой муниципальной кампании.</p>
        <button onClick={startGame} className={styles.startGame}>Создать свой трек</button>
      </div>
      <Share
        link={link}
      />
    </div>
  );
}

