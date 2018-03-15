const reducer = (state = 1,action={}) => {
    switch (action.type) {
        case 'ADD':
            return state + action.count;
        default:
            return state;
    }
};
export default reducer;
