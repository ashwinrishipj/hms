const onScrollEvent = (state = "false", action) => {
    if (action.type === 'ONSCROLL') {
        return !state
    } else {
        return state;
    }
}

export default onScrollEvent;