import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetcher } from "../reducer/fetcher";

export const Create = ({ history }) => {
  const [registered, setRegister] = React.useState(false);

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
      setTimeout(() => {
        window.location.replace("/espace");
      }, 2000);
    } catch (e) {
      dispatch({ type: "ERROR", payload: e });
    }
  };

  const { error, loading } = state;
  return (
    <>
      <Link to="/espace" className="background-modal" />
      <div className="modal">
        <h3>Ajouter un client</h3>
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
            Ajouter
          </button>
        </form>
        {loading && <p style={{ textAlign: "center" }}>Ajout en cours..</p>}
        {error && !loading && (
          <p style={{ color: "red", textAlign: "center" }}>
            Erreur lors de l'ajout !
          </p>
        )}
        {registered && (
          <div className="modal">
            <p>
              Le client : {prenom} {nom} est ajouté !
            </p>
          </div>
        )}
      </div>
    </>
  );
};
