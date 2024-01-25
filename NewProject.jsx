import { useRef } from "react"
import Input from "./Input"
import Modal from "./Modal";

function NewProject({onAdd, onCancel}) {

    const modal = useRef();

    //refs are used to get the input as well as to move it to other fuctional component such as Input in our case
    const title = useRef();
    const description = useRef();
    const duedate = useRef();

    //handle save will save save the data in different variable and will call onAdd function that will set the values of title, desc and due
    //duedate and will be sending it to the app.jsx so that it can save the data in the project array
    function handleSave(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredduedate = duedate.current.value;

        if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredduedate.trim() === ''){
            modal.current.open();
            return
        }
        //this onAdd is a callback function which is passed as a prop. This onAdd function will be matched with the handle
        onAdd({
            title:enteredTitle,
            description: enteredDescription,
            duedate: enteredduedate
        })
    }

    return (
    <>
        <Modal ref={modal} buttoncaption="Okay">
            <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
            <p className='text-stone-600 mb-4 '>Opps!! ...looks like you forgot to enter a value.</p>
            <p className='text-stone-600 mb-4 '>Please make sure you provide a valid value for every input field.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button onClick={onCancel} className="text-stone-800 hover:text-stone-950">
                        Cancel
                    </button>
                </li>
                <li>
                    <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={handleSave}>
                        Save
                    </button>
                </li>
            </menu>
            <div>
                <Input type="text" ref={title} label="Title" /> 
                <Input ref={description} label="Description" textarea />
                <Input type="date" ref={duedate} label="Due Date" />
            </div>
        </div>
    </>
    )
}
export default NewProject