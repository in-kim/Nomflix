import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from 'react-helmet';
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
    width:100%;
    height:calc(100vh - 50px);
    position:relative;
    padding:50px;
`;

const Backdrop = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-image:url(${props => props.bgImage});
    background-position:center center;
    background-size:cover;
    filter:blur(3px);
    opacity:0.5;
    z-index:0;
`;

const Content = styled.div`
    display:flex;
    width:100%;
    height:100%;
    position:relative;
    z-index:1;
`;

const Cover = styled.div`
    width:30%;
    height:100%;
    background-image:url(${props => props.bgImage});
    background-size:cover;
    background-position:center center;
    border-radius:5px;
`;

const Data = styled.div`
    width:70%;
    margin-left:10px;
`;
const Title = styled.h3`
    font-size:32px;
    margin-bottom:10px;
`;

const ItemContainer = styled.div`
    margin:20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin:0 10px;
`;

const Overview = styled.p`
    font-size:12px;
    opacity:0.7;
    line-height:1.5;
    width:50%;
    margin-bottom:20px;
`;

const TabContainer = styled.div`
    display:flex;
    width:50%;
    align-items:center;
    margin-bottom:50px;
`;

const TabItem = styled.span`
    font-size:12px;
    flex:1;
    color:#fff;
    text-align:center;
`;

const CollectionContainer = styled.div`
    display:flex;
    width:100%;
    flex-wrap:nowrap;
    overflow:auto;
    margin-top:20px;
`;

const CollectionItem = styled.div`
    flex:0 0 20%;
    /* min-width:120px; */
    height:100%;
    margin-right:20px;
`;

const CollectionThumn = styled.span`
    display:block;
    width:100%;
    height:400px;
    background-image:url(${props => props.bgImage});
    background-size:cover;
    background-position:center center;
    border-radius:5px;
    margin-bottom:10px;
`;

const CollectionName = styled.span`
    display:block;
    font-size:12px;
    margin-bottom:10px;
`;
const CollectionOverview = styled.span`
    display:block;
    height:140px;
    line-height:25px;
    font-size:10px;
    color:#fff;
    overflow:auto;
`;

const DetailPresenter = ({result,collection, error, loading}) => (
    loading ? (
            <>
                <Helmet>
                    <title>Loding | Nomflix</title>
                </Helmet>
                <Loader />
            </>
        ) :(
            error ? <Container>
                <Message color="#e74c3c" text="Not found"/>
            </Container> :
            <Container>
                <Helmet>
                    <title>{result.original_title ? result.original_title : result.original_name} | Nomflix</title>
                </Helmet>
                <Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}></Backdrop>
                <Content>
                    <Cover bgImage={result.poster_path ? 
                        `https://image.tmdb.org/t/p/original/${result.poster_path}` :
                        '/noPosterSmall.png'
                    }/>
                    <Data>
                        <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                        <ItemContainer>
                            <Item>{result.release_date ? result.release_date.substring(0,4) : result.first_air_date.substring(0,4)}</Item>
                            <Divider>•</Divider>
                            <Item>{result.runtime ? result.runtime : result.episode_run_time} min</Item>
                            <Divider>•</Divider>
                            <Item>{result.genres && 
                                result.genres.map((genre, index) => 
                                    index === result.genres.length -1 ? 
                                        genre.name : `${genre.name} / `
                                )}
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {
                                    result.imdb_id && 
                                    <a href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank">IMDB</a>
                                }
                            </Item>
                        </ItemContainer>
                        <Overview>{result.overview}</Overview>

                        <TabContainer>
                            <TabItem>You Tube Videos</TabItem>
                            <TabItem>Production Compoany</TabItem>
                            <TabItem>Countries</TabItem>
                        </TabContainer>
                        {   collection &&
                            <>
                                <Title>{collection.name}</Title>
                                <CollectionContainer>
                                    {
                                        collection.parts.map(part =>
                                            <CollectionItem key={part.id}>
                                                <CollectionThumn bgImage={part.poster_path ? 
                                                    `https://image.tmdb.org/t/p/original/${part.poster_path}` :
                                                    '/noPosterSmall.png'} 
                                                />
                                                <CollectionName>
                                                    {part.original_title}
                                                </CollectionName>
                                                <CollectionOverview>
                                                    {part.overview}
                                                </CollectionOverview>
                                            </CollectionItem>
                                        )   
                                    }
                                </CollectionContainer>
                            </>
                        }
                    </Data>
                </Content>
            </Container>
        )
);

DetailPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
}

export default DetailPresenter;