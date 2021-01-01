import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loading from 'Components/Loader';
import Section from 'Components/Section';
import Message from 'Components/Message'

const Container = styled.div`
    padding: 0px 10px;
`;

const TVPresenter = ({topRated, popular, airingToday, error, loading}) => 
    loading ? (
        <Loading/>
    ) : (
        <Container>
            {topRated && topRated.length > 0 &&(
                <Section title="Top Rated Shows">
                    {topRated.map(show => <span key={show.id}>{show.name}</span>)}
                </Section>
            )}
            {popular && popular.length > 0 &&(
                <Section title="popular Shows">
                        {popular.map(show => <span key={ show.id }>{ show.name }</span>)}
                </Section>
            )}
            {airingToday && airingToday.length > 0 &&(
                <Section title="Airing Today Shows">
                        {airingToday.map(show => <span key={ show.id }>{ show.name }</span>)}
                </Section>
            )}

            {error && <Message color="#e74c3c" text={error} />}
        </Container>
    )

TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    airingToday: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
}

export default TVPresenter;