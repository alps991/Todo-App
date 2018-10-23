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
