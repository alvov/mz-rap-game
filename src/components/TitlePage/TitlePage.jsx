import * as React from "react";
import * as styles from "./TitlePage.css";
import {Share} from '../Share/Share';
import {TitlePlayer} from './TitlePlayer';
// import {Supports} from "../Supports/Supports";
// import {testSpeechSynthesis, testSpeechSynthesisUtterance} from "../../utils/utils";

type titleProps = {|
  +startGame: void => void
|}

export function TitlePage(props: titleProps) {
  const { startGame } = props;

  // const supportsSpeech = testSpeechSynthesis() && testSpeechSynthesisUtterance();

  const link: string = `${location.origin}${location.pathname}`;

  let title = 'Мрачный чтец. Создай свой трек из новостей «Медиазоны»';
  let description = `Окрыленная сокрушительным успехом робота-новостника, «Медиазона» продолжает экспериментировать с автоматизацией творческого труда. На этот раз редакции удалось приспособить искусственный интеллект к сочинению остросоциального рэпа: робот-битмейкер научился комбинировать несколько гнетущих заунывных звуков, а робот-MC — читать, за неимением оригинального поэтического материала, новости (впрочем, он еще ошибается с ударением в некоторых сложных словах — таких, как «челябинец», «шаурма», «Ленобласть» и «велосипедист»).

При тестировании рэп-роботов в общественных местах настоятельно рекомендуем использовать наушники`;

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
        {/* supportsSpeech ? (
            <button onClick={startGame} className={styles.startGame}>Создать свой трек</button>
          ) : (
            <Supports />
          )
        */}
        <TitlePlayer />
      </div>
      <Share
        link={link}
      />
    </div>
  );
}

