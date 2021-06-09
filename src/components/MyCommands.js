import React from "react";
import axios from "axios";
import { fetcher } from "./reducer/fetcher";
import { Nav } from "./Nav";
import background from "../img/background.jpg";
import useLocalStorage from "./store/use-localstorage";
import { Link, Route, Switch } from "react-router-dom";
import { DetailsCommand } from "./DetailsCommand";

export const MyCommands = () => {
  const [id_user] = useLocalStorage("id_user");
  const [state, dispatch] = React.useReducer(fetcher, {
    loading: false,
    error: null,
    data: {},
  });

  React.useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "LOADING" });
      try {
        axios
          .post(process.env.REACT_APP_API_URL + "commande/readForClient.php", {
            id_user,
          })
          .then(({ data }) => {
            dispatch({ type: "SUCCESS", payload: data });
          });
      } catch (e) {
        dispatch({ type: "ERROR", payload: e });
      }
    };
    getProducts();
  }, [id_user]);

  const { data, error } = state;

  return (
    <>
      <Nav />
      <img
        className="background--page"
        style={{ position: "relative" }}
        src={background}
        alt=""
      />
      <div className="container">
        <div
          style={{
            textAlign: "center",
            position: "relative",
            paddingBottom: 100,
          }}
        >
          <h3>Mes commandes</h3>
          <hr />
          {data?.records && (
            <tr className="table">
              <td>
                <h3>Numéro de commande</h3>
              </td>
              <td>
                <h3>État</h3>
              </td>
              <td></td>
            </tr>
          )}
          {data?.records ? (
            data.records.map((item) => (
              <>
                <div
                  key={item.id}
                  className="card-cart"
                  style={{ width: "99%" }}
                >
                  <tr className="table">
                    <td>
                      <h3>{item.id}</h3>
                    </td>
                    <td>
                      <h3
                        style={
                          item.state === "0"
                            ? { color: "#F4BE2C" }
                            : item.state === "1"
                            ? { color: "#66AD47" }
                            : item.state === "2"
                            ? { color: "#D82E2F" }
                            : null
                        }
                      >
                        {item.state === "0" && "En attente"}
                        {item.state === "1" && "Accepté"}
                        {item.state === "2" && "Refusé"}
                      </h3>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: "/commandes/" + item.id,
                          state: {
                            cart: item.cart,
                          },
                        }}
                        className="btn btn-validate"
                        style={{ marginTop: 8 }}
                      >
                        Voir le détail
                      </Link>
                    </td>
                  </tr>
                </div>
              </>
            ))
          ) : (
            <h3>Aucune commande</h3>
          )}
          {error && <h3>Une erreur est survenue !</h3>}
        </div>
      </div>
      <Switch>
        <Route path="/commandes/:id" component={DetailsCommand} />
      </Switch>
    </>
  );
};
