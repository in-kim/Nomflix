import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from 'react-helmet';
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from 'Components/Message';
import Poster from 'Components/Poster';

const Container = styled.div `
    padding:20px;
`;

const HomePresenter = ({nowPlaying, upcoming, popular, error, loading}) => 
    <>
        <Helmet>
            <title>Movies | Nomflix</title>
        </Helmet>
        {loading ? <Loader /> : ( 
            <Container>
                {/* nowPlaying */}
                {nowPlaying && nowPlaying.length > 0 && (
                    <Section title="Now Playing">
                        {/* array filter */}
                        {nowPlaying.map(movie => 
                            <Poster key={movie.id} 
                                id={movie.id} 
                                imageUrl={movie.poster_path} 
                                title={movie.original_title} 
                                rating={movie.vote_average}
                                isMovie={true}
                                year={movie.release_date && movie.release_date.substring(0,4
                                )}
                            />
                        )}
                    </Section>
                )}

                {/* upcoming */}
                {upcoming && upcoming.length > 0 && (
                    <Section title="upcoming Movies">
                        {/* array filter */}
                        {upcoming.map(movie => 
                            <Poster key={movie.id} 
                                id={movie.id} 
                                imageUrl={movie.poster_path} 
                                title={movie.original_title} 
                                rating={movie.vote_average}
                                isMovie={true}
                                year={movie.release_date && movie.release_date.substring(0,4)}
                            />
                        )}
                    </Section>
                )}

                {/* popular */}
                {popular && popular.length > 0 && (
                    <Section title="popular Movies">
                        {/* array filter */}
                        {popular.map(movie => 
                            <Poster key={movie.id} 
                                id={movie.id} 
                                imageUrl={movie.poster_path} 
                                title={movie.original_title} 
                                rating={movie.vote_average}
                                isMovie={true}
                                year={movie.release_date && movie.release_date.substring(0,4)}
                            />
                        )}
                    </Section>
                )}

                {error && <Message color="#e74c3c" text={error}/>}
            </Container>
        )}
    </>

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default HomePresenter;