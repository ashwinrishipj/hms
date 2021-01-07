const routePage = (state="login",action) =>{
    if (action.type === 'ROUTE'){
            if (action.payload === "logout"){
                localStorage.clear();
                return "login"; 
            } 
            return action.payload;
    }else{
            return state;
    }
}

export default routePage;