import React from "react";

export default function PositiveAlert(props) {
  setTimeout(() => {
    props.changeAlert();
  }, 4000);

  return (
    <div
      className="alert  alert-danger alert-dismissible fade show ml-4 mr-4"
      role="alert"
    >
      <strong>{props.content} </strong>
    </div>
  );
}
