import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from "Routes/Home"
import TV from "Routes/TV"
import Search from "Routes/Search"
import Header from "Components/Header"
import Detail from "Routes/Detail"
import Collection from "Routes/Collection"
import Season from 'Routes/Season'

export default () => (
  <Router>
    <>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail}/>
        <Route path="/show/:id" component={Detail}/>
        <Route path="/collection/:id" component={Collection}/>
        <Route path="/season/:id/:season" component={Season}/>
        <Redirect from="*" to="/"/>
      </Switch>
    </>
  </Router>
)