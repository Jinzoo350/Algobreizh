import React from "react";
import { Link, useLocation } from "react-router-dom";
import useLocalStorage from "../store/use-localstorage";
import axios from "axios";
import { fetcher } from "../reducer/fetcher";
import lock from "../../img/visibility.png";
import delock from "../../img/invisible.png";
import { Error } from "../Error";
import { Success } from "../Success";

export const Login = ({ history }) => {
  let location = useLocation();
  location.pathname.indexOf(1);
  location.pathname.toLowerCase();
  const locationSplited = location.pathname.split("/")[1];

  const [logged, setLog] = React.useState(false);
  const [email, setEmail] = useLocalStorage("email");
  const [password, setPassword] = React.useState("");
  const [lockPassword, setLockPassword] = React.useState(false);
  const [verify, setVerify] = React.useState(false);

  const [state, dispatch] = React.useReducer(fetcher, {
    loading: false,
    error: null,
    data: {},
  });

  const [stateTentative, dispatchTentative] = React.useReducer(fetcher, {
    loading: false,
    error: null,
    data: {},
  });

  const authenticate = async (email, password) => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "user/login.php",
        {
          email,
          password,
        }
      );
      dispatch({ type: "SUCCESS", payload: data });
      setLog(true);
      localStorage.setItem("role", data.role);
      localStorage.setItem("id_user", data.id_user);
      localStorage.setItem("jwt", data.jwt);
      setTimeout(() => {
        history.push(`/${locationSplited}`);
      }, 2000);
    } catch (e) {
      dispatch({ type: "ERROR", payload: e });
      setVerify(true);
    }
  };

  React.useEffect(() => {
    const tentative = async () => {
      dispatchTentative({ type: "LOADING" });
      try {
        axios
          .post(process.env.REACT_APP_API_URL + "user/readTentative.php", {
            email,
          })
          .then(({ data }) => {
            dispatchTentative({ type: "SUCCESS", payload: data });
            setVerify(false);
          });
      } catch (e) {
        dispatchTentative({ type: "ERROR", payload: e });
        setVerify(false);
      }
    };
    tentative();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verify]);

  const { error, loading } = state;

  const { data } = stateTentative;

  const recordsTentative = data && data?.records;

  return (
    <>
      <Link to={`/${locationSplited}`} className="background-modal" />
      <div className="modal">
        <h2>Connexion</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            authenticate(email, password);
          }}
        >
          <input
            placeholder="E-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          {recordsTentative?.length >= 3 ? (
            <>
              <input
                placeholder="Mot de passe"
                type="password"
                value=""
                disabled
              />
              <button className="btn auth disabled">Se connecter</button>
            </>
          ) : (
            <>
              <input
                placeholder="Mot de passe"
                type={lockPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <img
                className="lock-icon"
                src={lockPassword ? delock : lock}
                alt=""
                onClick={() => setLockPassword((on) => !on)}
              />
              <button type="submit" className="btn auth">
                Se connecter
              </button>
            </>
          )}
        </form>
        {loading && <p style={{ textAlign: "center" }}>Connexion en cours..</p>}
        {error && !loading && <Error text="Identifiants incorrects !" />}
        {logged && <Success text="Connecté !" />}
        {recordsTentative?.length >= 3 && (
          <Error text="Compte bloqué pendant 24h" />
        )}
        <Link
          style={{ position: "absolute", bottom: 10, left: 0, width: "100%" }}
          to={`/${locationSplited}/register`}
        >
          Vous n'avez pas de compte ? S'incrire
        </Link>
      </div>
    </>
  );
};
