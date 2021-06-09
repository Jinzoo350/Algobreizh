import React from "react";
import loader from "../img/loader.png";

export const Loader = () => {
  return (
    <>
      <div className="loader">
        <div className="background-modal" />
        <img className="rolling" src={loader} alt="Chargement.." />
      </div>
    </>
  );
};
