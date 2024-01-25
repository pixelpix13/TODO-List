import { createPortal } from "react-dom"
import {forwardRef, useImperativeHandle, useRef} from 'react'

const Modal = forwardRef(function Modal({children, buttoncaption}, ref){
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return{
            open(){
                dialog.current.showModal();
            }
        }
    })
    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 rounded-md shadow-md p-4">
            {children}
            <form method="dialog" className="mt-4 text-right">
                <button className="bg-stone-900 rounded-md text-stone-50 p-1 mt-8 hover:bg-stone-800 hover:text-stone-500">{buttoncaption}</button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    )
})

export default Modal 