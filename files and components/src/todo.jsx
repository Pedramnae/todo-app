import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { GoTrash } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";


let count = 0
let count2 = 0
function Todo() {
    const list = useRef()
    const completedtab = useRef()
    const [todos, setTodos] = useState([])
    const [completedtodos, setCompletedtodos] = useState([])
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
    })
    function inputvalueset(e) {
        let inputname = e.target.getAttribute('name')
        switch (inputname) {
            case 'Title': setInputs({
                ...inputs,
                title: e.target.value
            }); break;
            case 'Description': setInputs({
                ...inputs,
                description: e.target.value
            }); break;
        }
    }
    const addtask = () => {
        if (inputs.title != '' && inputs.description != '') {
            let newtodo = {
                title: inputs.title,
                description: inputs.description,
            }
            if (completedtodos != '') {
                completedtodos.map((val) => {
                    if (val.title == newtodo.title && val.description == newtodo.description) {
                        count2++
                    }
                })
                if (todos != '') {
                    todos.map((val) => {
                        if (val.title == newtodo.title && val.description == newtodo.description) {
                            console.log('hi');
                            count++
                        }
                    })

                }
            }
            else if (todos != '') {
                todos.map((val) => {
                    if (val.title == newtodo.title && val.description == newtodo.description) {
                        console.log('hi');
                        count++
                    }
                })
                if (completedtodos != '') {
                    completedtodos.map((val) => {
                        if (val.title == newtodo.title && val.description == newtodo.description) {
                            count2++
                        }
                    })
                }

            } else {
                let updatedtodo = [...todos]
                updatedtodo.push(newtodo)
                setTodos(updatedtodo)
                localStorage.setItem('todos', JSON.stringify(updatedtodo))
            }
            checkAndAdd(newtodo)
        } else {
            alert('please fill all forms')
        }
    }
    const checkAndAdd = (newtodo) => {
        console.log(count)
        if (count == 0 && count2 == 0) {
            let updatedtodo = [...todos]
            updatedtodo.push(newtodo)
            setTodos(updatedtodo)
            localStorage.setItem('todos', JSON.stringify(updatedtodo))
        } else if (count != 0) {
            alert('item exist')
            count2 = 0
            count = 0
        } else if (count2 != 0) {
            let confrim = confirm('task has already done! do you want to add this task again?')
            console.log(confrim);
            if (confrim) {
                let updatedtodo = [...todos]
                updatedtodo.push(newtodo)
                setTodos(updatedtodo)
                localStorage.setItem('todos', JSON.stringify(updatedtodo))
            }
            count = 0
            count2 = 0
        }
    }
    const handledelete = (e) => {
        let index = e.currentTarget.parentElement.parentElement.getAttribute('data-index')
        let parent = e.currentTarget.parentElement.parentElement
        let reducetodo = [...todos]
        reducetodo.splice(index, 1)
        localStorage.setItem('todos', JSON.stringify(reducetodo))
        console.log(parent);
        setTodos(reducetodo)
    }
    const handlecomplete = (e) => {
        let index = e.currentTarget.parentElement.parentElement.getAttribute('data-index')
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn =
            dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

        let completedtask = {
            ...todos[index],
            completedOn: completedOn,
        };
        let reducetodo = [...todos]
        let addcompletedtodos = [...completedtodos]
        reducetodo.splice(index, 1)
        addcompletedtodos.push(completedtask)
        localStorage.setItem('completedtodos', JSON.stringify(addcompletedtodos))
        localStorage.setItem('todos', JSON.stringify(reducetodo))
        console.log(addcompletedtodos);
        console.log(reducetodo);
        setCompletedtodos(addcompletedtodos)
        setTodos(reducetodo)
    }
    const changetab = (e) => {
        let tabname = e.target.getAttribute('data-tabname')
        if (tabname == 'list') {
            e.currentTarget.classList.add('bg-[#00e878]')
            e.currentTarget.classList.remove('bg-[#5e5b5d]')
            e.currentTarget.nextElementSibling.classList.add('bg-[#5e5b5d]')
            e.currentTarget.nextElementSibling.classList.remove('bg-[#00e878]')
            list.current.classList.add('flex')
            list.current.classList.remove('hidden')
            completedtab.current.classList.remove('flex')
            completedtab.current.classList.add('hidden')
        } else {
            e.currentTarget.classList.add('bg-[#00e878]')
            e.currentTarget.classList.remove('bg-[#5e5b5d]')
            e.currentTarget.previousElementSibling.classList.add('bg-[#5e5b5d]')
            e.currentTarget.previousElementSibling.classList.remove('bg-[#00e878]')
            list.current.classList.remove('flex')
            list.current.classList.add('hidden')
            completedtab.current.classList.add('flex')
            completedtab.current.classList.remove('hidden')
        }
    }
    const handlecompleteddelete = (e) => {
        let index = e.currentTarget.parentElement.parentElement.getAttribute('data-index')
        let reducecompletedtodo = [...completedtodos]
        reducecompletedtodo.splice(index, 1)
        localStorage.setItem('completedtodos', JSON.stringify(reducecompletedtodo))
        setCompletedtodos(reducecompletedtodo)
    }
    useEffect(() => {
        let storedtodos = JSON.parse(localStorage.getItem('todos'))
        let storedcompletedtodos = JSON.parse(localStorage.getItem('completedtodos'))
        if (storedtodos) {
            setTodos(storedtodos)
        }
        if (storedcompletedtodos) {
            setCompletedtodos(storedcompletedtodos)
        }

    }, [])
    return (
        <>
            <section className='w-full min-h-[100vh] py-[40px] flex flex-wrap content-center justify-center bg-[#1e1e1e]'>
                <h1 className='w-full h-fit py-[40px] capitalize flex justify-center font-montseratb text-[#00e878] text-[30px] md:text-[50px]'>your todo list</h1>
                <div className='w-[80%] sm:w-[520px] md:w-[720px] lg:w-[1000px] h-fit bg-[#343434] '>
                    <div className='w-full h-[140px]  flex flex-wrap'>

                        <div className='w-full h-1/2 flex flex-wrap px-[10px] md:px-[20px] '>
                            <h2 className='w-[40%] h-full flex items-center px-[20px] text-[18px] md:text-[22px] text-[#00e878] font-montseratb'>Title:</h2>
                            <h2 className='w-[40%] h-full flex items-center px-[20px] text-[18px] md:text-[22px] text-[#00e878] font-montseratb'>Description:</h2>
                        </div>


                        <div className='w-full h-1/2 flex flex-wrap px-[10px] md:px-[20px]'>
                            <div className='w-[40%] h-full flex items-center justify-center px-[20px]'>
                                <input placeholder='Enter your title' className='w-full h-[50%] md:h-[65%] outline-[#00e878] text-[10px] md:text-[16px] px-[10px] md:ps-[15px] font-montseratl' type="text" value={inputs.title} name='Title' onChange={(event) => inputvalueset(event)} />
                            </div>
                            <div className='w-[40%] h-full flex items-center justify-center px-[20px]'>
                                <input placeholder='Enter your description' className='w-full h-[50%] md:h-[65%] outline-[#00e878] text-[10px] md:text-[16px] px-[10px] md:ps-[15px] font-montseratl' type="text" value={inputs.description} name='Description' onChange={(event) => inputvalueset(event)} />
                            </div>
                            <div className='w-[20%] h-full flex items-center justify-center'>
                                <button onClick={addtask} className='w-fit h-fit px-[20px] md:px-[25px] text-[12px] md:text-[16px] py-[7px] md:py-[10px] bg-[#00e878] font-montseratl text-white'>Add</button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-fit flex flex-wrap px-[20px] md:px-[40px]'>
                        <div className='w-full h-[30px] flex items-center justify-center'>
                            <span className='w-full h-[2px] bg-gray-400'></span>
                        </div>
                        <div className='w-full h-fit  flex flex-wrap'>
                            <button data-tabname='list' onClick={changetab} className='w-fit h-fit font-montseratm text-[17px] md:text-[20px] text-white bg-[#00e878] px-[20px] py-[10px] md:py-[15px]'>Not done</button>
                            <button data-tabname='completed' onClick={changetab} className='w-fit h-fit font-montseratm text-[17px] md:text-[20px] text-white bg-[#5e5b5d] px-[20px] py-[10px] md:py-[15px]'>Completed</button>
                        </div>
                        <div ref={list} className='w-full h-fit py-[10px] flex flex-wrap'>
                            {todos && todos.map((val, i) => {
                                return (
                                    <div key={i} data-index={i} className='w-full   flex flex-wrap animate-myAnim bg-[#404040] [box-shadow:-5px_5px_10px_0px_black] px-[25px] my-[10px]'>
                                        <div className='w-[70%] h-fit flex flex-wrap '>
                                            <h3 className='w-full h-fit break-all flex text-[#00e878] font-montseratb text-[30px] md:text-[35px] py-[8px] md:py-[8px] capitalize '>{val.title}</h3>
                                            <p className='w-full h-fit break-all flex font-montseratl text-[14px] md:text-[17px] text-gray-400 py-[8px] md:py-[8px] '>{val.description}</p>
                                        </div>
                                        <div className='w-[30%] h-full flex items-center justify-end  '>
                                            <span onClick={handledelete} className='w-fit h-fit text-white hover:text-red-500  cursor-pointer px-[10px]  md:px-[20px] py-[10px] text-[17px] md:text-[28px]'><GoTrash /></span>
                                            <span onClick={handlecomplete} className='w-fit h-fit text-[#00e878] hover:text-[#218f5a]  cursor-pointer px-[10px]  md:px-[20px] py-[10px] text-[17px] md:text-[28px]'><FaCheck /></span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div ref={completedtab} className='w-full h-fit py-[10px] hidden flex-wrap'>
                            {completedtodos && completedtodos.map((val, i) => {
                                return (
                                    <div key={i} data-index={i} className='w-full  flex flex-wrap animate-myAnim bg-[#404040] [box-shadow:-5px_5px_10px_0px_black] px-[25px] my-[10px]'>
                                        <div className='w-[80%] h-fit flex flex-wrap '>
                                            <h3 className='w-full h-fit break-all flex text-[#00e878] font-montseratb text-[30px] md:text-[35px] py-[4px] md:py-[8px] capitalize '>{val.title}</h3>
                                            <p className='w-full h-fit break-all flex font-montseratl text-[14px] md:text-[17px] text-gray-400 py-[4px] md:py-[8px] '>{val.description}</p>
                                            <div className='w-full h-fit break-all flex font-montseratm text-[10px] md:text-[14px] text-gray-400 text-14px py-[4px] md:py-[8px] '>
                                                completed date: {val.completedOn}
                                            </div>
                                        </div>
                                        <div className='w-[20%] h-full flex items-center justify-end '>
                                            <span onClick={handlecompleteddelete} className='w-fit h-fit text-white hover:text-red-500  cursor-pointer px-[10px]  md:px-[20px] py-[10px] text-[17px] md:text-[28px]'><GoTrash /></span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}



export default Todo