import React from "react";
import axios from "axios";
import { fetcher } from "./reducer/fetcher";
import { Error } from "./Error";
import { Loader } from "./Loader";

export const ChangeState = (props) => {
  const [state, dispatch] = React.useReducer(fetcher, {
    loading: false,
    error: null,
    data: {},
  });

  const { id, setModalState } = props;

  const updateState = async (id, etat) => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "commande/updateState.php",
        {
          id,
          state: etat,
        }
      );
      dispatch({ type: "SUCCESS", payload: data });
      window.location.replace("/espace/list-commande");
    } catch (e) {
      dispatch({ type: "ERROR", payload: e });
    }
  };

  const { loading, error } = state;

  return (
    <>
      <div className="background-modal" onClick={() => setModalState(false)} />
      <div className="modal-state">
        <button
          className="btn btn-validate"
          onClick={() => updateState(id, "1")}
        >
          Valider
        </button>
        <button
          className="btn btn-refuse"
          onClick={() => updateState(id, "2")}
        >
          Refuser
        </button>
      </div>
      {loading && <Loader />}
      {error && <Error text="Une erreur est survenue !" />}
    </>
  );
};
