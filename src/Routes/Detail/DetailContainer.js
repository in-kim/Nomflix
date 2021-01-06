import { moviesApi, TVApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
    constructor(props){
        super(props);
        const {location: {pathname}} = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie"),
            collection : null,
        };
    }

    async componentDidMount(){
        const {
            match: 
            { params:{id} },
            history: {push},
        } = this.props;

        const{ isMovie } = this.state;

        
        const parsedId = parseInt(id);
        // id값을 받을때 리소스를 String으로 낭비하지 않기 위해서 숫자 검증
        if(isNaN(parsedId)){
            return push("/");
        }

        let result=null;
        let collection=null;
        // movie, show 체크
        try{
            if(isMovie){
                ({data:result} = await moviesApi.movieDetail(parsedId));
                
                if(result.belongs_to_collection != null){
                    const {belongs_to_collection:{id}} = result;
                    ({data:collection} = await moviesApi.collection(id));
                    console.log(collection);
                }
            }else{
                ({data:result} = await TVApi.showDetail(parsedId));
            }
        }catch{
            this.setState({error:"Can't find anything."})
        }finally{
            this.setState({
                loading:false,
                result,
                collection
            })
        }


    }
    // 객체 비구조화 할당
    render() {
        const {result, collection, error, loading} = this.state;
        console.log(this.state);
        return (
            <DetailPresenter 
                result={result} 
                error={error} 
                loading={loading}
                collection={collection}
            />
        )
    }
}