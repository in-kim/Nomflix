import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Message from 'Components/Message';

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

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 25px;
`;

const Item = styled.span`
`;

const Name = styled.span`
  position:absolute;
  width:100%;
  top:0;
  left:0;
  font-size:13px;
  font-weight:700;
  color:#fff;
  opacity:0;
  padding:10px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
`;

const Overview = styled.span`
  position:absolute;
  width:100%;
  top:40px;
  left:0;
  color:#fff;
  line-height:20px;
  opacity:0;
  padding:10px;
`;

const Image = styled.div`
  height:450px;
  background-image:url(${props => props.bgUrl});
  background-size:cover;
  border-radius:4px;
  background-position:center center;
  transition:opacity  .1s linear;
`;

const Rating = styled.span`
  position:absolute;
  bottom:5px;
  right:5px;
  opacity:0;
  transition:opacity  .1s linear;
`;

const ImageContainer = styled.div`
  margin-bottom:5px;
  position:relative;
  &:hover{
    ${Image}{
      opacity:0.5;
    };
    ${Name}{
      opacity:1
    }
    ${Overview}{
      opacity:1
    }
    ${Rating}{
      opacity:1
    }
  }
`;

const Collection = ({ result, error, loading }) => (
  loading ? (
    <>
      <Helmet>
        <title>Loding | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    error ? <Container>
      <Message color="#e74c3c" text="Collection Not found"/>
    </Container> : 
    <Container>
      <Helmet>
        <title>{result.name ? `${result.name} | Nomflix` :'Nomflix'} </title>
      </Helmet>
      <Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`} />
      <Content>
        <Data>
          <Title>{result.name}</Title>
          <ItemContainer>
            <Grid>
              {
                result.parts && result.parts.length > 0 && (
                  result.parts.map((part) => (
                    <Item>
                      <ImageContainer>
                        <Image 
                          bgUrl={part.poster_path ? 
                            `https://image.tmdb.org/t/p/w300/${part.poster_path}` : 
                            "/noPosterSmall.png"
                          } 
                        />
                        <Name>{part.original_title ? part.original_title : part.title}</Name>
                        <Overview>{part.overview}</Overview>
                        <Rating>⭐️ {part.vote_average} / 10</Rating>
                      </ImageContainer>
                    </Item>
                  ))
                )
              }
          </Grid>
        </ItemContainer>
        </Data>
      </Content>
    </Container>
  )
)

Collection.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
}

export default Collection;
