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
            activeTab : 0,
            arrTabName : [
                'YouTube Videos',
                'Production Compoany',
                'Countries',
            ],
        };
    }

    clickHandler = (id) => {
        this.setState({
            activeTab : id
        })
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
        // movie, show 체크
        try{
            if(isMovie){
                ({data:result} = await moviesApi.movieDetail(parsedId));
            }else{
                ({data:result} = await TVApi.showDetail(parsedId));
            }
        }catch{
            this.setState({error:"Can't find anything."})
        }finally{
            this.setState({
                loading:false,
                result
            })
        }


    }
    // 객체 비구조화 할당
    render() {
        const {result, activeTab, arrTabName, error, loading} = this.state;
        console.log(this.state);
        return (
            <DetailPresenter 
                result={result} 
                error={error} 
                loading={loading}
                activeTab={activeTab}
                arrTabName={arrTabName}
                clickHandler={this.clickHandler}
            />
        )
    }
}