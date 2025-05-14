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
        }
        createUser()

    }, []);


    const handleDeleteTodo = async (id) => {
        const respuesta = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'DELETE'
        }
        )

        if (respuesta.ok) {
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
        }
    }


    const deleteAllTodos = async () => {
        for (const todo of todos) {
            const respuesta = await fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
                method: 'DELETE'
            }
            )

            if (!respuesta.ok) throw new Error("Error al eliminar un to do")
        }
        setTodos([])
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
            const data = await respuesta.json()
            setTodos([...todos, data])
            setInputValue("")
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
                    <li key={index} className="todo">
                        {todo.label} <IoIosClose className="icono" onClick={() => {
                            handleDeleteTodo(todo.id)
                            console.log(todo)
                        }} />

                    </li>))}


            </ul>
            <div className='d-flex justify-content-between'>
                <div> {todos.length} tasks </div>
                <button className='btn btn-danger' onClick={deleteAllTodos}> Delete all tasks </button>
            </div>


        </div>


    );
};


export default List;
