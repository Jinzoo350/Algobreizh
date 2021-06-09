import React from "react";
import { Route, Switch } from "react-router-dom";
import { Nav } from "./Nav";
import { useCart } from "./Article";
import background from "../img/background.jpg";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";
import axios from "axios";
import { fetcher } from "./reducer/fetcher";
import useLocalStorage from "./store/use-localstorage";
import { Success } from "./Success";
import { Error } from "./Error";
import { Loader } from "./Loader";

export const Command = ({ history }) => {
  const { cart, delCart } = useCart([]);
  const [id_user] = useLocalStorage("id_user");
  const kart = JSON.stringify(cart);
  console.log(kart);

  const [addCommands, setAddCommands] = React.useState(false);

  const [state, dispatch] = React.useReducer(fetcher, {
    loading: false,
    error: null,
    data: {},
  });

  const addCommand = async () => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "commande/create.php",
        {
          id_user,
          cart: kart,
        }
      );
      dispatch({ type: "SUCCESS", payload: data });
      setAddCommands(true);
      localStorage.removeItem("cart");
      setTimeout(() => {
        history.push("/commandes");
      }, 2000);
    } catch (e) {
      dispatch({ type: "ERROR", payload: e });
    }
  };

  const { error, loading } = state;

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
          {cart.length >= 1 && (
            <span onClick={delCart} className="icon-cart">
              <img
                alt="Vider le panier"
                style={{ width: 35, height: 35 }}
                src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZD0iTTQ1Ni4zMTMsODUuMzMzaC0yMC42NzdjLTMuMDk0LDAtNi4wMzEsMS4zNDQtOC4wNjMsMy42NzdjLTIuMDIxLDIuMzMzLTIuOTM4LDUuNDM4LTIuNSw4LjUgICAgIGMxLjA4Myw3LjU4MywxLjU5NCwxMy44ODUsMS41OTQsMTkuODIzQzQyNi42NjcsMTkzLjc5MiwzNjQuNDU4LDI1NiwyODgsMjU2cy0xMzguNjY3LTYyLjIwOC0xMzguNjY3LTEzOC42NjcgICAgIGMwLTUuOTM4LDAuNTEtMTIuMjQsMS41OTQtMTkuODIzYzAuNDM4LTMuMDYzLTAuNDc5LTYuMTY3LTIuNS04LjVjLTIuMDMxLTIuMzMzLTQuOTY5LTMuNjc3LTguMDYzLTMuNjc3aC0yNC43NThsLTguNjY1LTI3LjY5OCAgICAgYy0yLjc4Ni04LjkwNi0xMS4wMzYtMTQuOTY5LTIwLjM2OC0xNC45NjlIMzJjLTUuODkxLDAtMTAuNjY3LDQuNzc1LTEwLjY2NywxMC42Njd2MjEuMzMzYzAsNS44OTEsNC43NzYsMTAuNjY3LDEwLjY2NywxMC42NjcgICAgIGgzOC44OTZsNjcuNDMxLDIxNS41MDdsLTMxLjY2LDMxLjY2Yy0xMi4yNSwxMi4yNC0xNS44NzUsMzAuNDktOS4yNSw0Ni40OXMyMi4xMDQsMjYuMzQ0LDM5LjQxNywyNi4zNDRoMzAwLjUgICAgIGM1Ljg5MSwwLDEwLjY2Ny00Ljc3NiwxMC42NjctMTAuNjY3di0yMS4zMzNjMC01Ljg5Mi00Ljc3Ni0xMC42NjctMTAuNjY3LTEwLjY2N2gtMzAwLjVMMTc5LjUsMzIwaDE5NC44NTQgICAgIGMxNi40NDgsMCwzMS42MDQtOS42MTUsMzguNjE1LTI0LjVsNzQuNDM4LTE1OC4xNzdjMi4xMzUtNC41NTIsMy4yNi05LjYwNCwzLjI2LTE0LjYxNXYtMy4wMjEgICAgIEM0OTAuNjY3LDEwMC43NCw0NzUuMjYsODUuMzMzLDQ1Ni4zMTMsODUuMzMzeiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8Y2lyY2xlIGN4PSIxNDkuMzMzIiBjeT0iNDY5LjMzMyIgcj0iNDIuNjY3IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxjaXJjbGUgY3g9IjQwNS4zMzMiIGN5PSI0NjkuMzMzIiByPSI0Mi42NjciIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTI4OCwyMzQuNjY3YzY0LjY5OCwwLDExNy4zMzMtNTIuNjM1LDExNy4zMzMtMTE3LjMzM1MzNTIuNjk4LDAsMjg4LDBTMTcwLjY2Nyw1Mi42MzUsMTcwLjY2NywxMTcuMzMzICAgICBTMjIzLjMwMiwyMzQuNjY3LDI4OCwyMzQuNjY3eiBNMjQ4LjQ1OCw5Mi44NzVjLTQuMTY3LTQuMTY3LTQuMTY3LTEwLjkxNywwLTE1LjA4M2M0LjE2Ny00LjE2NywxMC45MTctNC4xNjcsMTUuMDgzLDAgICAgIEwyODgsMTAyLjI1bDI0LjQ1OC0yNC40NThjNC4xNjctNC4xNjcsMTAuOTE3LTQuMTY3LDE1LjA4MywwYzQuMTY3LDQuMTY3LDQuMTY3LDEwLjkxNywwLDE1LjA4M2wtMjQuNDU4LDI0LjQ1OGwyNC40NTgsMjQuNDU4ICAgICBjNC4xNjcsNC4xNjcsNC4xNjcsMTAuOTE3LDAsMTUuMDgzQzMyNS40NTgsMTU4Ljk1OCwzMjIuNzI5LDE2MCwzMjAsMTYwcy01LjQ1OC0xLjA0Mi03LjU0Mi0zLjEyNUwyODgsMTMyLjQxN2wtMjQuNDU4LDI0LjQ1OCAgICAgQzI2MS40NTgsMTU4Ljk1OCwyNTguNzI5LDE2MCwyNTYsMTYwcy01LjQ1OC0xLjA0Mi03LjU0Mi0zLjEyNWMtNC4xNjctNC4xNjctNC4xNjctMTAuOTE3LDAtMTUuMDgzbDI0LjQ1OC0yNC40NTggICAgIEwyNDguNDU4LDkyLjg3NXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
              />
              <div className="tooltip">
                <p style={{ fontSize: 14 }}>Vider le panier</p>
              </div>
            </span>
          )}

          <h3>Mon panier</h3>
          <hr />
          {cart.length >= 1 && (
            <tr className="table">
              <td></td>
              <td>
                <h3>Nom du produit</h3>
              </td>
              <td>
                <h3>Quantité</h3>
              </td>
              <td>
                <h3>Prix</h3>
              </td>
            </tr>
          )}
          {cart.length === 0 && <h4>Vide</h4>}

          {cart.length >= 1 &&
            cart.map((item) => (
              <div key={item.id} className="card-cart" style={{ width: "99%" }}>
                <tr className="table">
                  <td>
                    <div className="card-img-cart">
                      <img src={item.img} alt="img" />
                    </div>
                  </td>
                  <td>
                    <h3>{item.name}</h3>
                  </td>
                  <td>
                    <h3>1</h3>
                  </td>
                  <td>
                    <h3>{item.price} €</h3>
                  </td>
                </tr>
              </div>
            ))}

          {cart.length >= 1 && (
            <>
              <p style={{ margin: 30 }}>
                Prix total :{" "}
                {cart.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)} €
              </p>
              {localStorage.getItem("jwt") && (
                <button
                  onClick={addCommand}
                  className="btn btn-validate"
                  style={{ width: 280, padding: 20, marginBottom: 50 }}
                >
                  Ajouter la commande
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {addCommands && <Success text="Commande ajoutée !" />}
      {error && <Error text="Erreur lors de l'ajout !" />}
      {loading && <Loader />}
      <Switch>
        <Route path="/panier/login" component={Login} />
        <Route path="/panier/register" component={Register} />
      </Switch>
    </>
  );
};
