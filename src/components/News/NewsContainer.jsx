import * as React from "react";
import {connect} from "react-redux";
import Scrollbars from 'react-custom-scrollbars';
import {News} from "./News";
import {selectState as selectNews, setNewsState} from "../../ducks/news";
import {selectIsPlayingRecord} from "../../ducks/record";
import type {RootState} from "../../ducks";
import * as analytic from '../../analytics';
import {LoopState} from "../../consts";

import * as styles from "./NewsContainer.css";

type NewsContainerComponentStateProps = {|
  +news: $Call<typeof selectNews, RootState>,
  +isPlayingRecord: $Call<typeof selectIsPlayingRecord, RootState>,
|}

type NewsContainerComponentDispatchProps = {|
  +setNewsState: typeof setNewsState,
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
        {news.map(({id, text, state, duration}) => {
          return <News
            key={id}
            id={id}
            text={text}
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
    if (selectedNews) {
      if (selectedNews.state === LoopState.Off) {
        analytic.GAInteractZag(selectedNews.text);
        this.props.setNewsState({ id, state: LoopState.Active });
      } else {
        this.props.setNewsState({ id, state: LoopState.Off });
      }
    }
  };
}

const mapStateToProps = (state: RootState): NewsContainerComponentStateProps => {
  return {
    news: selectNews(state),
    isPlayingRecord: selectIsPlayingRecord(state),
  };
};

const mapDispatchToProps: NewsContainerComponentDispatchProps = {
  setNewsState,
};

export const NewsContainer = connect(mapStateToProps, mapDispatchToProps)(NewsContainerComponent);
