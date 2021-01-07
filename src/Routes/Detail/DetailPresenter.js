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
    margin-bottom:50px;
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

const CollectionContainer = styled.div`
    padding:50px;
`;

// 탭 index

const DetailPresenter = ({result,collection, error, loading, activeTab,arrTabName, clickHandler}) => (
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
                                activeTab == 0 && 'video'
                        }
                        {
                          activeTab == 1 && 
                            (
                                <ItemContainer>
                                    {
                                        result.production_companies.map((company) =>
                                            <Item key={company.id}>
                                                {company.name}
                                                {company.origin_country}
                                                {company.logo_path}
                                            </Item>
                                        )
                                    }
                                </ItemContainer>
                            )
                        }
                        {
                          activeTab == 2 && 'third'
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