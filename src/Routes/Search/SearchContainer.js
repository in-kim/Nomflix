import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component{
  state = {
    movieResults:null,
    tvResults:null,
    searchTerm:"",
    error:null,
    loading:false
  };
  // 객체 비구조화 할당
  render(){
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    return(
      <SearchPresenter 
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
      />
    )
  }
}