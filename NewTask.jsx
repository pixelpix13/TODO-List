import { useRef, useState } from "react"

function NewTask({onAdd}){

    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(e){
        setEnteredTask(e.target.value)
    }

    function handleClick(){
        onAdd(enteredTask);
        setEnteredTask('')
    }

    return (
        <div className="flex item-center gap-4">
            <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200 mb-4" 
            onChange={handleChange}
            value={enteredTask}/>
            <button className="text-stone-700 hover:text-stone-900" onClick={handleClick}>Add Task</button>
        </div>
    )
}

export default NewTask