import * as React from "react";
import * as styles from "./Supports.css";

export class Supports extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={styles.supports}>
        <div className={styles.supportsText}>
          К сожалению, ваш браузер не умеет читать рэп.
          <br/>
          Попробуйте другой, например, <a className={styles.link} href="https://www.google.com/chrome/" target="_blank">Chrome</a>.
        </div>
      </div>
    );
  }
}
