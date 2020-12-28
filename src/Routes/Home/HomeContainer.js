import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

export default class extends React.Component{
  // NowPlaying, upcoming, popular 를 찾아서 에러가 잇으면 loading, error 값 변경
  state = {
    nowPlaying:null,
    upcoming: null,
    popular: null,
    error:null,
    loading:true
  };

  async componentDidMount(){
    try{
      moviesApi.nowPlaying();
    }catch{
      this.setState({
        error: "Can't find movies information."
      })
    }finally{
      this.setState({
        loading:false,
      })
    }
  }


  // 프로젝트가 클 경우 각각 state 별로 함수를 만들어서 DidMount에 호출하는 방식으로 작업 

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