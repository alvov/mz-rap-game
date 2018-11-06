import * as React from 'react';
import cn from 'classnames';
import {
  Vk,
  Tg,
  Ok,
  Fb,
  Tw
} from '../icons';
import type {ShareThemeEnum} from "../../types";
import * as styles from './Share.css';

type ShareProps = {|
  +link: string,
  +theme?: ShareThemeEnum,
  +hasRecord?: boolean,
|}

export function Share(props: ShareProps) {
  const {
    link,
    theme,
    hasRecord,
  } = props;

  return (
    <div className={cn(styles.share, {
      [styles.inline]: theme === "inline",
      [styles.hasRecord]: hasRecord,
    })}>
      <p className={styles.title}>
        поделиться
        {hasRecord === true && ' результатом'}
      </p>
      <div className={styles.shareIcons}>
        <a href={`http://vk.com/share.php?url=${link}`}><Vk/></a>
        <a href={`https://twitter.com/intent/tweet?text=${link}`}><Tw/></a>
        <a href={`https://www.facebook.com/dialog/share?app_id=1727953450799543&display=popup&href=${link}`}><Fb/></a>
        <a href={`https://connect.ok.ru/offer?url=${link}`}><Ok/></a>
        <a href={`https://t.me/share/url?url=${link}`}><Tg/></a>
      </div>
    </div>
  )
}
