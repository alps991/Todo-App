export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return action.todos
        case 'ADD_TODO':
            return [
                ...state,
                action.todo
            ];
        default:
            return state;
    }
};
