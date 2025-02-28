import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Notecard({ note, onEdit, deleteNote }) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">{note.title}</h2>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-between">
            <button className="btn btn-warning" onClick={() => onEdit(note)}>
              <FaEdit /> Edit
            </button>
            <button className="btn btn-danger" onClick={() => deleteNote(note._id)}>
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notecard;
