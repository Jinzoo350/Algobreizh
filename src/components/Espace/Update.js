import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetcher } from "../reducer/fetcher";

export const Update = (props) => {
  const [registered, setRegister] = React.useState(false);

  const [email, setEmail] = React.useState(props.data.email);
  const [nom, setNom] = React.useState(props.data.nom);
  const [prenom, setPrenom] = React.useState(props.data.prenom);

  const [state, dispatch] = React.useReducer(fetcher, {
    loading: false,
    error: null,
    data: {},
  });

  const id = props.data.id;

  const updateClient = async () => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "user/update.php",
        {
          id,
          email,
          nom,
          prenom,
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
        <h3>Modifier un client</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateClient(id, nom, prenom, email);
          }}
        >
          <label>Email</label>
          <input
            placeholder="E-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Nom</label>
          <input
            placeholder="Nom"
            type="text"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
          <label>Prénom</label>
          <input
            placeholder="Prénom"
            type="text"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />
          <button
            type="submit"
            className={
              email && nom && prenom ? "btn auth" : "btn auth disabled"
            }
          >
            Modifier
          </button>
        </form>
        {loading && (
          <p style={{ textAlign: "center" }}>Modification en cours..</p>
        )}
        {error && !loading && (
          <p style={{ color: "red", textAlign: "center" }}>
            Erreur lors de la modification !
          </p>
        )}
        {registered && (
          <div className="modal">
            <p>
              Le client : {prenom} {nom} est modifié !
            </p>
          </div>
        )}
      </div>
    </>
  );
};
