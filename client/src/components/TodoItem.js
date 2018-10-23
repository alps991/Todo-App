import React from 'react';
import { Link } from 'react-router-dom';

const TodoItem = (props) => (
    <Link className="list-item" to={"/edit/" + props.id}>
        <h3 className="list-item__title">{props.text}</h3>
        <p className="list-item__data">{props.completed ? 'Complete' : 'Incomplete'}</p>
    </Link>
);

export default TodoItem;