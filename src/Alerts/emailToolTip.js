import React from "react";
import { Tooltip } from "react-bootstrap";

export const emailToolTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Email should be of form: <strong> john@domainname.com </strong>
    </Tooltip>
  );

  export const passwordToolTip = (props) =>(
    <Tooltip id="button-tooltip" {...props}>
    Password must be one upper case and lower case:, One digit and one unicode string:
    ex: <strong> alphaBeta123@ </strong>
  </Tooltip>
  )