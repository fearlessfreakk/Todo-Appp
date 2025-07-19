import React , {useEffect, useRef, useState} from 'react'
import todo_icon from "../assets/todo_icon.png";
import TodoItems from './TodoItems'


const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if(inputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev)=> [...prev, newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        return setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }

    const toggle = (id)=>{
        setTodoList((prevTodos) =>{
            return prevTodos.map((todo) =>
                todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo
            );
        });
    };

    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[500px] rounded-xl'>

    {/* ------title------ */}
    <div className='flex item-center mt-7px gap-2'>
        <img className='w-8' src={todo_icon} alt="icon" />
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
    </div>

    {/* ------Input Box------ */}
    <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pl-2 placeholder:text-slate-600' type="text" placeholder='Add a new task'/>

        <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
    </div>

    {/* ------Todo List------ */}
    <div>
        {todoList.map((item,index) => {
            return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
        })}
    </div>

    </div>
  )
}

export default Todo
