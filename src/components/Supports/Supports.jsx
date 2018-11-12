import * as React from "react";
import {testSpeechSynthesis, testSpeechSynthesisUtterance} from "../../utils/utils";

import * as styles from "./Supports.css";

export class Supports extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const supportsSpeech = testSpeechSynthesis() && testSpeechSynthesisUtterance();

    if (supportsSpeech) {
      return null;
    }

    return (
      <div className={styles.supports}>
        К сожалению, ваш браузер <abbr title="или принципиально не хочет">не умеет</abbr> читать рэп.
        <br />
        Попробуйте заставить <a className={styles.link} href="https://www.google.com/chrome/" target="_blank">вот этот</a>.
      </div>
    );
  }
}
