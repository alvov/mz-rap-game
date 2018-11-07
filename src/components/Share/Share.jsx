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

  const encodeLink = encodeURIComponent(link);

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
        <a target="_blank" href={`http://vk.com/share.php?url=${encodeLink}`}><Vk/></a>
        <a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeLink}`}><Tw/></a>
        <a target="_blank" href={`https://www.facebook.com/dialog/share?app_id=1727953450799543&display=popup&href=${encodeLink}`}><Fb/></a>
        <a target="_blank" href={`https://connect.ok.ru/offer?url=${encodeLink}`}><Ok/></a>
        <a target="_blank" href={`https://t.me/share/url?url=${encodeLink}`}><Tg/></a>
      </div>
    </div>
  )
}
