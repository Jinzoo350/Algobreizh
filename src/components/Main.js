import React from "react";

import { Nav } from "./Nav";
import { ArticleList } from "./ArticleList";
import background from "../img/background.jpg";
import logo from "../img/AlgoBreizh_Logo.png";
import { Route, Switch } from "react-router-dom";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";

export const Main = () => {
  return (
    <>
      <Nav />
      <div className="containerMain">
        <div className="backgroundhomeBanner">
          <img src={background} alt="" />
          <div className="content-homeBanner">
            <img src={logo} alt="" />
            <div className="title-homeBanner">
              <h1>AlgoBreizh</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ position: "relative" }}>
        <h1>Nos produits</h1>
        <hr />
        <ArticleList />
      </div>
      <Switch>
        <Route path="/accueil/login" component={Login} />
        <Route path="/accueil/register" component={Register} />
      </Switch>
    </>
  );
};
