import React from "react";
import { Switch, Route } from "react-router-dom";
import { Delete } from "./Delete";
import { Update } from "./Update";

export const Client = (props) => {
  const [updateModal, setUpdateModal] = React.useState(false);
  const { id } = props.data;
  return (
    <>
      <div className="item-client">
        <h4>
          {props.data.nom} {props.data.prenom}
        </h4>
        <p style={{ marginTop: "-15px", marginBottom: 20 }}>
          Email : {props.data.email} - Rôle : {props.data.role}
        </p>
        <Delete data={id} />
        <button onClick={() => setUpdateModal(true)}>Modifier</button>
        {updateModal && <Update data={props.data} />}
      </div>
      <Switch>
        <Route path="/espace/update" component={Update} />
      </Switch>
    </>
  );
};
