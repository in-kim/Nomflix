import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";

const Container = styled.div `
    padding:0px 10px;
`;

const HomePresenter = ({nowPlaying, upcoming, popular, error, loading}) => 
    loading ? null : ( 
        <Container>
            {/* nowPlaying */}
            {nowPlaying && nowPlaying.length > 0 && (
                <Section title="Now Playing">
                    {/* array filter */}
                    {nowPlaying.map(movie => movie.title)}
                </Section>
            )}

            {/* upcoming */}
            {upcoming && upcoming.length > 0 && (
                <Section title="upcoming Movies">
                    {/* array filter */}
                    {upcoming.map(movie => movie.title)}
                </Section>
            )}

            {/* popular */}
            {popular && popular.length > 0 && (
                <Section title="popular Movies">
                    {/* array filter */}
                    {popular.map(movie => movie.title)}
                </Section>
            )}
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