import * as React from "react";
import * as styles from "./TitlePage.css";
import {Share} from '../Share/Share';

let PAGE_URL = process.env.PAGE_URL;

if (PAGE_URL === null) {
  PAGE_URL = 'http://localhost:8081/';
}

type titleProps = {|
  +startGame: void => void
|}

export function TitlePage(props: titleProps) {
  const { startGame } = props;

  let link: string = "";

  if(typeof PAGE_URL === "string")
    link = encodeURIComponent(PAGE_URL);

  return (
    <div className={styles.titlePage}>
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

