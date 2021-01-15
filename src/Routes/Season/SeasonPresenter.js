import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import Message from 'Components/Message';

const Container = styled.div`
  padding: 20px;
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
const Title = styled.h3`
  position:relative;
  font-size:35px;
  margin-bottom:30px;
  z-index:1;
`;
const ItemContainer = styled.div`
  position:relative;
  display:flex;
  width:100%;
  flex-wrap:wrap;
  overflow:auto;
  padding-bottom:20px;
  z-index:1;
`;
const ListContainer = styled.div`
  flex:0 0 15%;
  max-width:15%;
  text-align:center;
  margin-right:1%;
  margin-bottom:20px;
`;
const List = styled.span``;
const ListImg = styled.span`
  display:block;
  width:100%;
  height:300px;
  background-image:url(${props => props.bgImage});
  background-position:center center;
  background-size:cover;
  margin-bottom:10px;
`;
const ListItem = styled.span``;


const SeasonPresenter = ({result, error, loading}) => (
  <Container>
    {
      loading ? 
        <>
          <Helmet>
            <title>Loding | Nomflix</title>
          </Helmet>
          <Loader />
        </> : 
      error ? <Message color="#e74c3c" text="Not found"/> :
      <>
        <Helmet>
            <title>{result.name} | Nomflix</title>
        </Helmet>
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result.poster_path}`}/>
        <Title>{result.name}</Title>
        <ItemContainer>
        {
          result.episodes && (
            result.episodes.map(episode => (
                <ListContainer>
                  <List>
                    <ListImg bgImage={episode.still_path ? `https://image.tmdb.org/t/p/original/${episode.still_path}` : 
                      '/noPosterSmall.png'}
                    />
                    <ListItem>{episode.name}</ListItem>
                    <ListItem>{episode.overview}</ListItem>
                  </List>
                </ListContainer>
            ))
            )
          }
        </ItemContainer>
      </>
    }
  </Container>
);

export default SeasonPresenter;

SeasonPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
}