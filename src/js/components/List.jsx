import React, { useState } from 'react';
import { IoIosClose } from "react-icons/io";


const List = () => {

    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleAddTodo = (e) => {
        if (e.keyCode === 13 && inputValue.trim() !== "") {
            setTodos([...todos, inputValue]);
            setInputValue("");
        }
    };

    const handleDeleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (

        <div className="container">

            <h1>
                My To do List
            </h1>
            <ul>
                <li> <input type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") handleAddTodo(e);
                    }}
                    placeholder="What do I need to do" />
                </li>


                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo} <IoIosClose className="icono" onClick={() => handleDeleteTodo(index)} />

                    </li>))}


            </ul>
            <div> {todos.length}  tasks </div>

        </div>


    );
};


export default List;
