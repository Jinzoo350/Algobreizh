import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { fetcher } from "../reducer/fetcher";
import useLocalStorage from "../store/use-localstorage";

export const Register = ({ history }) => {
  let location = useLocation();
  location.pathname.indexOf(1);
  location.pathname.toLowerCase();
  const locationSplited = location.pathname.split("/")[1];

  const [registered, setRegister] = React.useState(false);
  const [, setEmailRegistered] = useLocalStorage("email");

  const [email, setEmail] = React.useState("");
  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setComfirmPassword] = React.useState("");

  const [state, dispatch] = React.useReducer(fetcher, {
    loading: false,
    error: null,
    data: {},
  });

  const register = async (nom, prenom, email, password) => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "user/create_user.php",
        {
          email,
          nom,
          prenom,
          password,
        }
      );
      dispatch({ type: "SUCCESS", payload: data });
      setRegister(true);
      setEmailRegistered(email);
      setTimeout(() => {
        history.push(`/${locationSplited}/login`);
      }, 2000);
    } catch (e) {
      dispatch({ type: "ERROR", payload: e });
    }
  };

  const { error, loading } = state;
  return (
    <>
      <Link to={`/${locationSplited}`} className="background-modal" />
      <div className="modal">
        <h2>Inscription</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register(nom, prenom, email, password);
          }}
        >
          <input
            placeholder="E-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Nom"
            type="text"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
          <input
            placeholder="Prénom"
            type="text"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />
          <input
            placeholder="Mot de passe"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            placeholder="Confirmation du mot de passe"
            type="password"
            onChange={(e) => setComfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <button
            type="submit"
            className={
              email && nom && prenom && password && confirmPassword === password
                ? "btn auth"
                : "btn auth disabled"
            }
          >
            S'inscrire
          </button>
        </form>
        {loading && (
          <p style={{ textAlign: "center" }}>Inscription en cours..</p>
        )}
        {error && !loading && (
          <p style={{ color: "red", textAlign: "center" }}>
            Erreur lors de l'Inscription !
          </p>
        )}
        <Link
          style={{ position: "absolute", bottom: 10, left: 0, width: "100%" }}
          to={`/${locationSplited}/login`}
        >
          Vous avez un compte ? Se connecter
        </Link>
        {registered && (
          <div className="modal">
            <p>
              Bienvenue {prenom} {nom}, vous êtes inscrit !
            </p>
          </div>
        )}
      </div>
    </>
  );
};
