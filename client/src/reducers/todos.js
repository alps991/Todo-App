export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return action.todos
        case 'ADD_TODO':
            return [
                ...state,
                action.todo
            ];
        case 'UPDATE_TODO':
            return state.map((todo) => {
                if (todo._id == action.todo._id) {
                    return action.todo;
                }
                return todo;
            });
        case 'DELETE_TODO':
            return state.filter((todo) => todo._id != action.id);
        case 'CLEAR_TODOS':
            return {};
        default:
            return state;
    }
};
