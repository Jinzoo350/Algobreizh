import React from "react";
import axios from "axios";
import { Article } from "./Article";
import { fetcher } from "./reducer/fetcher";

import loader from "../img/loader.png";

export const ArticleList = () => {
  const [state, dispatch] = React.useReducer(fetcher, {
    loading: false,
    error: null,
    data: {},
  });

  const [filterInput, setFilterInput] = React.useState("");

  React.useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "LOADING" });
      try {
        axios
          .get(process.env.REACT_APP_API_URL + "product/read.php")
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
      <div className="products-settings">
        <input
          className="right"
          placeholder="Rechercher par nom.."
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
      </div>

      <div className="card-container">
        {error !== null && (
          <pre>
            <code>{JSON.stringify(error, null, 2)}</code>
          </pre>
        )}
        {loading && <img className="rolling" src={loader} alt="Chargement.." />}
        {data?.records
          ? data.records
              .filter((item) =>
                item.name.toLowerCase().includes(filterInput.toLowerCase())
              )
              .map((item) => <Article key={item.id} data={item} />)
          : null}
      </div>
    </>
  );
};
