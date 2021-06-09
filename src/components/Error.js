import React from "react";

export const Error = (props) => {
  return (
    <>
      <div className="modal--notif" style={{ backgroundColor: "#D82E2F" }}>
        <div>
          <span className="cross" />
          <p style={{ width: "70%", textAlign: "right" }}>{props.text}</p>
        </div>
      </div>
    </>
  );
};
