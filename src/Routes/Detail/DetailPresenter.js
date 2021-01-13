import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from 'react-helmet';
import Loader from "Components/Loader";
import Message from "Components/Message";
import Collection from "./collection";

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
    margin-bottom:50px;
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

const Item = styled.span`
`;

const IMDB = styled.span`
    font-weight:700;
    color:#e67e22;
    background-color:#000;
    border:1px solid #e67e22;
    border-radius:4px;
    padding:3px;
`;


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
    margin-bottom:10px;
`;

const TabItem = styled.span`
    font-size:14px;
    font-weight:700;
    flex:1;
    color:#fff;
    text-align:center;
    padding-bottom:8px;
    cursor:pointer;
    border-bottom:5px solid ${props => props.current ? "#8e44ad" : "transparent"};
    transition:border-bottom .5s ease-in-out;
`;

const VideoContainer = styled.div`
    position:relative;
    display:flex;
    flex-wrap:nowrap;
    width:100%;
    padding:30px 0 50px 0;
    overflow:auto;
    &:after{
        content:'';
        position:absolute;
        width:10%;
        height:calc(100% - 80px);
        top:30px;
        right:0;
        background:linear-gradient( to right, transparent, #000 );
    }
`;

const VideoItem = styled.div`
    flex:0 0 60%;
    max-width:60%;
    height:400px;
    margin-right:20px;
`;

const Video = styled.iframe`
    width:100%;
    height:100%;
    margin-bottom:10px;
`;

const VideoName = styled.span`
    font-size:12px;
`;

const CompoanyContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    padding: 30px 0 50px 0;
`;

const Compoany = styled.div`
    flex:0 0 24%;
    background: rgba(255,255,255,0.1);
    border-radius:5px;
    margin-right:1%;
    margin-bottom:30px;
    padding:10px;
    text-align:center;
`;
const CompoanyLogo = styled.span`
    display:block;
    width:100%;
    height:150px;
    background:url(${props => props.bgImage}) no-repeat center;
    background-size:contain;
    margin-bottom:10px;
`;
const CompoanyName = styled.span`
    display:block;
    margin-bottom:10px;
`;
const CompoanyContry = styled.span`
    display:block;
    
`;


// 탭 index
const DetailPresenter = ({result, collection, error, loading, activeTab,arrTabName, clickHandler}) => (
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
                            {
                                result.imdb_id && (
                                    <>
                                        <Divider>•</Divider>
                                        <IMDB>
                                            {
                                                result.imdb_id && 
                                                <a href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank">IMDB</a>
                                            }
                                        </IMDB>
                                    </>
                                )
                            }
                            
                        </ItemContainer>
                        <Overview>{result.overview}</Overview>

                        <TabContainer>
                            {
                                arrTabName.map((name,idx) => {
                                    return <TabItem 
                                                key={idx} 
                                                onClick={() => clickHandler(idx)}
                                                current={idx === activeTab}
                                            >{name}</TabItem>
                                })
                            }
                        </TabContainer>
                        {
                                activeTab == 0 && (
                                    <VideoContainer>
                                        {
                                            result.videos.results && result.videos.results.length > 0 ?
                                            result.videos.results.map((result) => (
                                                <VideoItem key={result.id}>
                                                    <Video src={`https://www.youtube.com/embed/${result.key}`}/>
                                                    <VideoName>{result.name}</VideoName>
                                                </VideoItem>
                                            ) 
                                          ) : 'YouTube Video가 없습니다.'
                                        }
                                        
                                    </VideoContainer>
                                )
                        }
                        {
                          activeTab == 1 && 
                            (
                                <CompoanyContainer>
                                    {
                                        result.production_companies.map((company) =>
                                            (
                                                <Compoany key={company.id}>
                                                    <CompoanyLogo bgImage={
                                                        company.logo_path ? `https://image.tmdb.org/t/p/original/${company.logo_path}`:
                                                        '/noPosterSmall.png'
                                                    }></CompoanyLogo>
                                                    <CompoanyName>{company.origin_country}</CompoanyName>
                                                    <CompoanyContry>{company.name}</CompoanyContry>
                                                </Compoany>
                                            )
                                        )
                                    }
                                </CompoanyContainer>
                            )
                        }
                        {
                          activeTab == 2 && (
                              <ItemContainer>
                                  {
                                      result.production_countries.map((countries) => (
                                          <>
                                            <Item>{countries.iso_3166_1}</Item>
                                            <Item>{countries.name}</Item>
                                          </>
                                      ))
                                  }
                              </ItemContainer>
                          )
                        }
                    </Data>
                </Content>
                    {collection && Object.keys(collection).length > 0 && (
                    <Collection
                        name={collection.name}
                        parts={collection.parts}
                    />
                )}
            </Container>
        )
);

DetailPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    activeTab:PropTypes.number.isRequired,
    arrTabName:PropTypes.array, 
    clickHandler:PropTypes.func,
}

export default DetailPresenter;