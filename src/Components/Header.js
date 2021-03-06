import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
    color: #fff;
    position:fixed;
    top:0;
    left:0;
    z-index:2;
    width:100%;
    height:50px;
    display:flex;
    align-items:center;
    padding:0 10px;
    background-color:rgba(20,20,20,0.8);
    box-shadow:0px 1px 5px 2px rgba(0,0,0,0.8);
`;

const Logo = styled.h1`
    width:100px;
    height:30px;
    margin-right:30px;
    background:url(${props => props.bgImage});
    background-size:cover;
    background-position:center center;
`;

const List = styled.ul`
    display:flex;
`;

const Item = styled.li`
    width:50px;
    height:50px;
    text-align:center;
    border-bottom:5px solid 
        ${props => props.current ? "#3498db" : "transparent"};
    transition:border-bottom .5s ease-in-out;
`;

const SLink = styled(Link)`
    display:flex;
    align-items:center;
    justify-content:center;
    height:50px;
`;



export default withRouter(({location:{pathname}}) => (
    <Header>
        <Logo bgImage={require("../assets/logo.png").default}/>
        <List>
            <Item current={pathname === "/"}>
                <SLink to="/">Home</SLink>
            </Item>
            <Item current={pathname === "/tv"}>
                <SLink to="/tv">tv</SLink>
            </Item>
            <Item current={pathname === "/search"}>
                <SLink to="/search">search</SLink>
            </Item>
        </List>
    </Header>
))