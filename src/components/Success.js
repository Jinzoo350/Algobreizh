import React from "react";

export const Success = (props) => {
  return (
    <>
      <div className="modal--notif" style={{ backgroundColor: "#66AD47" }}>
        <div>
          <span className="check" />
          <p style={{ width: "70%", textAlign: "right" }}>{props.text}</p>
        </div>
      </div>
    </>
  );
};
