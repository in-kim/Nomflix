import { TVApi, moviesApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component{
  state = {
    movieResults:null,
    showResults:null,
    searchTerm:"",
    notFound:"",
    error:null,
    loading:false
  };

  handleSubmit = event => {
    //reload 막기
    event.preventDefault();
    const {target} = event;
    const { 0 :{defaultValue : inputValue} } = target.children;
    const { searchTerm } = this.state;
    this.setState({
      notFound: inputValue,
    })
    if(searchTerm !== ""){
      this.searchByTerm();
    }
  }

  updateTerm = event => {
    const {
      target: {value}
    } = event;
    this.setState({
      searchTerm:value
    })
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
    const { movieResults, showResults, searchTerm, notFound, error, loading } = this.state;
    //  epdlxj ghkrdls
    // console.log(this.state);
    // console.log(notFound);
    return(
      <SearchPresenter 
        movieResults={movieResults}
        showResults={showResults}
        searchTerm={searchTerm}
        notFound={notFound}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    )
  }
}