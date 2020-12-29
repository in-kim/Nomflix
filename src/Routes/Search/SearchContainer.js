import { TVApi, moviesApi } from "api";
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

  handleSubmit = () => {
    const { searchTerm } = this.state;
    if(searchTerm !== ""){
      this.searchByTerm();
    }
  }

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({
      loading:true
    })
    try{
      const {data: {results:movieResults}} = await moviesApi.search(searchTerm);
      const {data: {results:showResults}} = await TVApi.search(searchTerm);

      this.setState({
        movieResults,
        showResults,
        loading:true
      })
    }catch{
      this.setState({ error: "Can't find results." });
    }finally{
      this.setState({loading:false})
    }
  }

  // 객체 비구조화 할당
  render(){
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    //  epdlxj ghkrdls
    // console.log(this.state);
    return(
      <SearchPresenter 
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}