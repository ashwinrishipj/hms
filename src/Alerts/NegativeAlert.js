import React from "react";

export default function NegativeAlert(props) {
  return (
    <div className="alert alert-success alert-dismissible" role="alert">
      <strong>{props.content}</strong>
    </div>
  );
}
