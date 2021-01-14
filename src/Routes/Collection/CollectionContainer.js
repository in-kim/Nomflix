import {moviesApi} from "api";
import React from 'react';
import CollectionPresenter from './CollectionPresenter';

export default class extends React.Component{
  constructor(props){
    super(props);
    const {location: {pathname}} = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isCollection: pathname.includes("/collection"),
    }
  }
  async componentDidMount(){
    const { match: {params:{id}}, history:{push}} = this.props;
    
    const { iscollection } = this.state;

    const parsedId = parseInt(id);

    if(isNaN(parsedId)){
      return push("/");
    }

    let result=null;

    try{
      ({data:result} = await moviesApi.collection(id));
    }catch{
      this.setState({error:"Cant't find anything."})
    }finally{
      this.setState({
        loading:false,
        result
      })
    }
  }

  render() {
    const {result, error, loading} = this.state;
    console.log(this.state);

    return (
      <CollectionPresenter 
        result={result}
        error={error}
        loading={loading}
      />
    )
  }
}
