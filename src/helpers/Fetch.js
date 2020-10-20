import { withRouter } from "react-router-dom";

export const FetchData = (body) => {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "appliction/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          res.status);
        return false;
      }
      return res.json();
    })
    .then((Response) => {
      if (Response.data) {
        return Response;
      } else {
        return Response.errors[0].message;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const LoginFetchData = (body) => {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "appliction/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((Response) => {
      if (Response.data) {
        return true;
      } else {
        return Response;
      }
    })
    .catch((error) => {
      if (!error.response) {
        return false;
      }
    });
};

export default withRouter;
