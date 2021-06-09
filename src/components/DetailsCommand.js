import React from "react";
import { Link } from "react-router-dom";

export const DetailsCommand = ({
  location: {
    state: { cart },
  },
}) => {
  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\\[\]\\/\\])/g, "\\$1");
  }

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
  }

  const replaceQuotes = replaceAll(cart, "&quot;", () => {
    return `"`;
  });

  const panier = JSON.parse(replaceQuotes);

  return (
    <>
      <Link to="/commandes" className="background-modal" />
      <div
        className="modal"
        style={{ width: "60%", height: "70%", overflowY: "auto" }}
      >
        <h3>Produits de la commande</h3>
        {panier.length >= 1 &&
          panier.map((item) => (
            <div key={item.id} className="card-cart">
              <div className="card-img-cart">
                <img src={"/" + item.img} alt="img" />
              </div>
              <div
                style={{
                  top: 12,
                  position: "relative",
                  width: "75%",
                  marginLeft: "23%",
                }}
              >
                {item.name}
                <p style={{ fontSize: 16 }}>{item.price} €</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
