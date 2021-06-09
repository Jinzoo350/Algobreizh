import React from "react";
import ReactDOM from "react-dom";
import { Main } from "./components/Main";
import { Command } from "./components/Command";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import "./style/style.css";
import "./style/responsive.css";
import { Loader } from "./components/Loader";
import { Espace } from "./components/Espace/Espace";
import { MyCommands } from "./components/MyCommands";

const NoMatch = () => {
  let location = useLocation();
  return <h1>La page {location.pathname} est introuvable !</h1>;
};

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/accueil" />
      </Route>
      <Route path="/accueil" component={Main} />
      <Route path="/panier" component={Command} />
      <PrivateRoute path="/commandes" component={MyCommands} />
      <PrivateRoute path="/espace" component={Espace} />
      <Route path="*" component={NoMatch} />
    </Switch>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("jwt")) {
          return <Component {...props} />;
        }
        return <Redirect to="accueil/login" />;
      }}
    />
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.Suspense fallback={<Loader />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Suspense>,
  rootElement
);
