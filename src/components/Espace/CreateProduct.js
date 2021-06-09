import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetcher } from "../reducer/fetcher";

export const CreateProduct = () => {
  const [addProducted, setaddProduct] = React.useState(false);

  const [name, setname] = React.useState("");
  const [price, setprice] = React.useState("");
  const [img, setimg] = React.useState("");

  const [state, dispatch] = React.useReducer(fetcher, {
    loading: false,
    error: null,
    data: {},
  });

  const imgReplaced = img.replace("C:\\fakepath\\", "img/product/");

  const addProduct = async () => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "product/create.php",
        {
          name,
          price,
          img: imgReplaced,
        }
      );
      dispatch({ type: "SUCCESS", payload: data });
      setaddProduct(true);
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
        <h3>Ajouter un produit</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addProduct(name, price, img);
          }}
        >
          <input
            placeholder="Nom"
            type="text"
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
          <input
            placeholder="Prix"
            type="number"
            onChange={(e) => setprice(e.target.value)}
            value={price}
          />
          <input
            placeholder="Photo"
            type="file"
            onChange={(e) => setimg(e.target.value)}
            value={img}
          />
          <button
            type="submit"
            className={name && price && img ? "btn auth" : "btn auth disabled"}
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
        {addProducted && (
          <div className="modal">
            <p>Le produit {name} est ajouté !</p>
          </div>
        )}
      </div>
    </>
  );
};
