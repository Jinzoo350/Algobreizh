import React from "react";
import axios from "axios";
import { fetcher } from "./reducer/fetcher";
import { Loader } from "./Loader";
import { Link, Route, Switch } from "react-router-dom";
import { DetailsCommand } from "./DetailsCommand";
import { ChangeState } from "./ChangeState";

export const CommandsAdmin = () => {
  const [modalState, setModalState] = React.useState(false);
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
          .post(process.env.REACT_APP_API_URL + "commande/read.php")
          .then(({ data }) => {
            dispatch({ type: "SUCCESS", payload: data });
          });
      } catch (e) {
        dispatch({ type: "ERROR", payload: e });
      }
    };
    getProducts();
  }, []);

  const { data, loading, error } = state;

  return (
    <>
      <Link className="background-modal" to="/espace" />
      <div
        className="modal"
        style={{ width: "80%", height: "80%", overflowY: "auto" }}
      >
        <div className="container">
          <div
            style={{
              textAlign: "center",
              position: "relative",
              paddingBottom: 100,
            }}
          >
            <h3>Les commandes des clients</h3>
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
                            pathname:
                              "/espace/list-commande/commande/" + item.id,
                            state: {
                              cart: item.cart,
                            },
                          }}
                          className="btn btn-validate"
                          style={{ top: 12 }}
                        >
                          Voir le détail
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => setModalState(item.id)}
                          className="btn btn-validate"
                        >
                          Changer d'état
                        </button>
                        {modalState === item.id && (
                          <ChangeState
                            setModalState={setModalState}
                            id={item.id}
                            key={item.id}
                          />
                        )}
                      </td>
                    </tr>
                  </div>
                </>
              ))
            ) : (
              <h3>Aucune commande de client</h3>
            )}
            {error && <h3>Une erreur est survenue !</h3>}
          </div>
        </div>
      </div>
      {loading && <Loader />}
      <Switch>
        <Route
          path="/espace/list-commande/commande/:id"
          component={DetailsCommand}
        />
      </Switch>
    </>
  );
};
