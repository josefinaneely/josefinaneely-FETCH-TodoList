import React, { useEffect, useState } from 'react';
import { IoIosClose } from "react-icons/io";


const List = () => {

    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);



    useEffect(() => {
        const createUser = async () => {
            const respuesta = await fetch('https://playground.4geeks.com/todo/users/josefinaneely')
            const data = await respuesta.json()

            setTodos(data.todos)

            console.log(data)
        }
        createUser()

    }, []);


    const handleDeleteTodo = async () => {
        const todoID = todos[index].id;

        const respuesta = await fetch('https://playground.4geeks.com/todo/todos{todoID}', {
            method: 'DELETE'
        }
        )
        const data = await respuesta.json()
        if (respuesta.ok) {
            const updatedTodos = todos.filter((todo) => todo.id !== idToDelete);
            setTodos(updatedTodos);
        }
    }



    const addTodo = async () => {
        const newTodo = {
            label: inputValue,
            is_done: false,
        }
        const respuesta = await fetch('https://playground.4geeks.com/todo/todos/josefinaneely', {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (respuesta.ok) {

            setTodos([...todos, newTodo])
        }

    }


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
                        if (e.key === "Enter") addTodo();
                    }}
                    placeholder="What do I need to do" />
                </li>


                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo.label} <IoIosClose className="icono" onClick={() => handleDeleteTodo(index)} />

                    </li>))}


            </ul>
            <div> {todos.length}  tasks </div>

        </div>


    );
};


export default List;
