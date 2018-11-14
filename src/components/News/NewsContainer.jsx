import * as React from "react";
import {connect} from "react-redux";
import Scrollbars from 'react-custom-scrollbars';
import {News} from "./News";
import {selectShotsByCategory, setShotState} from "../../ducks/shots";
import {selectIsPlayingRecord} from "../../ducks/record";
import type {RootState} from "../../ducks";
import * as analytic from '../../analytics';
import {LoopState} from "../../consts";

import * as styles from "./NewsContainer.css";

type NewsContainerComponentStateProps = {|
  +news: $Call<typeof selectShotsByCategory, RootState, "news">,
  +isPlayingRecord: $Call<typeof selectIsPlayingRecord, RootState>,
|}

type NewsContainerComponentDispatchProps = {|
  +setShotState: typeof setShotState,
|}

type NewsContainerComponentProps = NewsContainerComponentStateProps & NewsContainerComponentDispatchProps;

class NewsContainerComponent extends React.Component<NewsContainerComponentProps> {
  render() {
    const {news, isPlayingRecord} = this.props;
    return (
      <Scrollbars
        autoHeight
        className={styles.newsContainer}
        autoHeightMin={700}
      >
        {news.map(({id, meta, state, duration}) => {
          return <News
            key={id}
            id={id}
            text={meta.text}
            state={state}
            duration={duration}
            onClick={isPlayingRecord ? undefined : this.onClickNews}
          />
        })}
      </Scrollbars>
    );
  }

  onClickNews = (id) => {
    const {news} = this.props;
    const selectedNews = news.find(news => news.id === id);
    if (selectedNews === undefined) {
      return;
    }
    let newState = selectedNews.state;
    if (selectedNews.state === LoopState.Off) {
      analytic.GAInteractZag(selectedNews.meta.text);
      newState = LoopState.Active;
    } else if (selectedNews.state === LoopState.Active) {
      newState = LoopState.Off;
    }
    this.props.setShotState({ id, state: newState });
  };
}

const mapStateToProps = (state: RootState): NewsContainerComponentStateProps => {
  return {
    news: selectShotsByCategory(state, "news"),
    isPlayingRecord: selectIsPlayingRecord(state),
  };
};

const mapDispatchToProps: NewsContainerComponentDispatchProps = {
  setShotState,
};

export const NewsContainer = connect(mapStateToProps, mapDispatchToProps)(NewsContainerComponent);
