import react from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';

const Title = styled.h3`
  font-size:32px;
  margin-bottom:30px;
`;

const Container = styled.div`
  width:100%;
  height:100%;
  padding:50px 0;
  box-sizing:content-box;
`;

const ItemContainer = styled.div`
  display:flex;
  width:100%;
  flex-wrap:nowrap;
  overflow:auto;
  padding-bottom:30px
`;

const Item = styled.span`
  flex:0 0 20%;
  min-width:120px;
  height:100%;
  margin-right:20px;
`;

const Thumnail = styled.span`
  display:block;
  width:100%;
  height:400px;
  background-image:url(${props => props.bgImage});
  background-size:cover;
  background-position:center center;
  border-radius:5px;
  margin-bottom:10px;
`;

const Name = styled.span`
  display:block;
  font-size:12px;
  margin-bottom:10px;
`;

const Overview = styled.span`
  display:block;
  height:200px;
  line-height:25px;
  font-size:10px;
  color:#fff;
  overflow:auto;
`;

const Collection = ({ name, parts }) => (
  <Container>
    <Title>{name}</Title>
    <ItemContainer>
      {
        parts &&
        parts.map(part =>
          <Item key={part.id}>
            <Name>
              {part.title}
            </Name>
            <Thumnail bgImage={part.backdrop_path ?
              `https://image.tmdb.org/t/p/original/${part.backdrop_path}` :
              '/noPosterSmall.png'}
            />
            <Overview>
              {part.overview}
            </Overview>
          </Item>
        )
      }
    </ItemContainer>
  </Container>
)

Collection.propTypes = {
  name: PropTypes.string.isRequired,
  parts: PropTypes.array.isRequired,
}

export default Collection;
