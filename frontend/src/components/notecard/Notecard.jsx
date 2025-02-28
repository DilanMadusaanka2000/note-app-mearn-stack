import React from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa';
function Notecard({ note, onEdit, deleteNote }) {
  return (
    <div>
         <h2>
            {note.title}
         </h2>

         <p>{note.description}</p>

         <button onClick={()=>onEdit(note)}><FaEdit /></button>
         <button onClick={()=>deleteNote(note._id)}>< FaTrash /></button>
    </div>

    
  )
}

export default Notecard