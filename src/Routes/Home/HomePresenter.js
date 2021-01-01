import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from 'Components/Message';

const Container = styled.div `
    padding:0px 20px;
`;

const HomePresenter = ({nowPlaying, upcoming, popular, error, loading}) => 
    loading ? <Loader /> : ( 
        <Container>
            {/* nowPlaying */}
            {nowPlaying && nowPlaying.length > 0 && (
                <Section title="Now Playing">
                    {/* array filter */}
                    {nowPlaying.map(movie => <span key={movie.id}>{movie.title}</span>)}
                </Section>
            )}

            {/* upcoming */}
            {upcoming && upcoming.length > 0 && (
                <Section title="upcoming Movies">
                    {/* array filter */}
                    {upcoming.map(movie => <span key={movie.id}>{movie.title}</span>)}
                </Section>
            )}

            {/* popular */}
            {popular && popular.length > 0 && (
                <Section title="popular Movies">
                    {/* array filter */}
                    {popular.map(movie => <span key={movie.id}>{movie.title}</span>)}
                </Section>
            )}

            {error && <Message color="#e74c3c" text={error}/>}
        </Container>
    );

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default HomePresenter;