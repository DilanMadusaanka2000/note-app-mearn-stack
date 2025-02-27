import React, { useState } from 'react';
import './notemodel.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function NoteModel({ onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate =  useNavigate();


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:8800/api/note/add', {
        title,
        description,
        
         });

         console.log(response);
         alert('User registered successfully');

         navigate('/login');

      
    } catch (error) {

      console.log(error);
      
    }

}


  return (
    <div className="form-popup">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Note</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="noteTitle" className="form-label">Note Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="noteTitle"
                  placeholder="Enter note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="noteDescription" className="form-label">Note Description</label>
                <textarea
                  className="form-control"
                  id="noteDescription"
                  rows="3"
                  placeholder="Enter note description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">Add Note</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteModel;
