import * as styles from "./Share.css";
import * as React from "react";
import {
  Vk,
  Tg,
  Ok,
  Fb,
  Tw
} from '../icons';

type shareProps = {|
  +link: string,
|}

export function Share(props: shareProps) {
  const {
    link
  } = props;

  return (
    <div className={styles.share}>
      <p className={styles.title}>поделиться</p>
      <div className={styles.shareIcons}>
        <a href={`http://vk.com/share.php?url=${link}`}><Vk/></a>
        <a href={`https://twitter.com/intent/tweet?text==${link}`}><Tw/></a>
        <a href={`https://www.facebook.com/dialog/share?app_id=1727953450799543&display=popup&href=${link}`}><Fb/></a>
        <a href={`https://connect.ok.ru/offer?url=${link}`}><Ok/></a>
        <a href={`https://t.me/share/url?url=${link}`}><Tg/></a>
      </div>
    </div>
  )
}