import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
    state = {
        result: null,
        error: null,
        loading: true
    };
    // 객체 비구조화 할당
    render() {
        const {result, error, loading} = this.state;
        <DetailPresenter result={result} error={error} loading={loading}/>
    }
}