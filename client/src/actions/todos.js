import axios from 'axios';

export const startGetTodos = (token) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: 'https://todos-alps.herokuapp.com/todos/',
            headers: {
                'x-auth': token
            }
        }).then((res) => {
            dispatch(getTodos(res.data.doc));
            console.log('This is the res:')
            console.log(res);
        }).catch((err) => {
            console.log('This is the error:')
            console.log(err);
        });
    }
}

export const getTodos = (todos) => ({
    type: 'GET_TODOS',
    todos
});

export const startAddTodo = (text, token) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            url: 'https://todos-alps.herokuapp.com/todos/',
            data: {
                text
            },
            headers: {
                'x-auth': token
            }
        }).then((res) => {
            dispatch(addTodo(res.data));
            console.log('new todo was posted');
            console.log(res);
        }).catch((err) => {
            console.log('server contact failed');
            console.log(err);
        });
    }
}

export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    todo
});

export const startUpdateTodo = (text, completed, id, token) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: 'https://todos-alps.herokuapp.com/todos/' + id,
            data: {
                text,
                completed
            },
            headers: {
                'x-auth': token
            }
        }).then((res) => {
            dispatch(updateTodo(res.data));
            console.log('new todo was posted');
            console.log(res);
        }).catch((err) => {
            console.log('server contact failed');
            console.log(err);
        });
    }
}

export const updateTodo = (todo) => ({
    type: 'UPDATE_TODO',
    todo
});

export const startDeleteTodo = (id, token) => {
    return (dispatch) => {
        return axios({
            method: 'delete',
            url: 'https://todos-alps.herokuapp.com/todos/' + id,
            headers: {
                'x-auth': token
            }
        }).then((res) => {
            dispatch(deleteTodo(id));
            console.log('new todo was posted');
            console.log(res);
        }).catch((err) => {
            console.log('server contact failed');
            console.log(err);
        });
    }
}

export const deleteTodo = (id) => ({
    type: 'DELETE_TODO',
    id
});

export const clearTodos = () => ({
    type: 'CLEAR_TODOS'
});