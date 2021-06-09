import React from "react";
import axios from "axios";
import { fetcher } from "../reducer/fetcher";
import { Nav } from "../Nav";
import background from "../../img/background.jpg";
import { Client } from "./Client";
import loader from "../../img/loader.png";
import { Link, Route, Switch } from "react-router-dom";
import { Create } from "./Create";
import { CreateProduct } from "./CreateProduct";
import { CommandsAdmin } from "../CommandsAdmin";

export const Espace = () => {
  const [state, dispatch] = React.useReducer(fetcher, {
    loading: false,
    error: null,
    data: {},
  });

  React.useEffect(() => {
    const getClients = async () => {
      dispatch({ type: "LOADING" });
      try {
        axios
          .get(process.env.REACT_APP_API_URL + "user/read.php")
          .then(({ data }) => {
            dispatch({ type: "SUCCESS", payload: data });
          });
      } catch (e) {
        dispatch({ type: "ERROR", payload: e });
      }
    };
    getClients();
  }, []);

  const { data, loading, error } = state;
  return (
    <>
      <Nav />
      <img
        className="background--page"
        style={{ position: "relative" }}
        src={background}
        alt=""
      />
      <div className="container" style={{ position: "relative" }}>
        {error !== null && (
          <pre>
            <code>{JSON.stringify(error, null, 2)}</code>
          </pre>
        )}
        {loading && <img className="rolling" src={loader} alt="Chargement.." />}
        <h1>Mon espace administrateur</h1>
        <hr />
        {localStorage.getItem("role") === "Administrateur" && (
          <>
            {/*             
            <div className="products-settings">
              <Link to="/espace/create-product" className="btn auth">
                Ajouter un produit
              </Link>
              <Link to="/espace/create" className="btn auth">
                Ajouter un client
              </Link>
            </div>
            <div className="card-client">
              <h1>Liste des clients</h1>
              {data?.records
                ? data.records.map((item) => (
                    <Client key={item.id} data={item} />
                  ))
                : null}
            </div>
            */}
            <Link className="btn btn-validate" to="/espace/list-commande">
              Voir les commandes
            </Link>
          </>
        )}
      </div>
      <Switch>
        <Route path="/espace/create" component={Create} />
        <Route path="/espace/create-product" component={CreateProduct} />
        <Route path="/espace/list-commande" component={CommandsAdmin} />
      </Switch>
    </>
  );
};
