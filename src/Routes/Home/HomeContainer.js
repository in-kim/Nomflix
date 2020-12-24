import React from "react";
import HomePresenter from "./HomePresenter";

export default class extends React.Component{
  state = {
    NowPlaying:null,
    upcoming: null,
    popular: null,
    error:null,
    loading:true
  };
  // 객체 비구조화 할당
  render(){
    const { NowPlaying, upcoming, popular, error, loading } = this.state;
    return(
      <HomePresenter 
        nowPlaying={NowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    )
  };
}