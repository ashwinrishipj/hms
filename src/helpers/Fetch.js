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
      return res.json();
    })
    .then((Response) => {
      if (Response.data) {
        localStorage.setItem("userToken", JSON.stringify(Response.data));
        return true;
      } else {
        return Response.errors[0].message;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default withRouter;
