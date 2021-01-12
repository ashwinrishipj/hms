const FormRoute = (state = "login", action) => {
    if (action.type === "FORMROUTE") {
        return action.payload;
    } else {
        return state;
    }
}

export default FormRoute;
