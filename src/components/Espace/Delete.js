import React from "react";
import axios from "axios";
import { fetcher } from "../reducer/fetcher";

import loader from "../../img/loader.png";

export const Delete = (props) => {
  const [state, dispatch] = React.useReducer(fetcher, {
    loading: false,
    error: null,
    data: {},
  });

  const id = props.data;

  const deleteClient = async () => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "user/delete.php",
        {
          id,
        }
      );
      dispatch({ type: "SUCCESS", payload: data });
      window.location.replace("/espace");
    } catch (e) {
      dispatch({ type: "ERROR", payload: e });
    }
  };

  const { loading, error } = state;
  return (
    <>
      <button onClick={deleteClient}>Supprimer</button>
      {error !== null && (
        <pre>
          <code>{JSON.stringify(error, null, 2)}</code>
        </pre>
      )}
      {loading && <img className="rolling" src={loader} alt="Chargement.." />}
    </>
  );
};
