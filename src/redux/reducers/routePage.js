const routePage = (state="login",action) =>{
    if (action.type === 'ROUTE'){
            return action.payload;
    }else{
            return state;
    }
}

export default routePage;