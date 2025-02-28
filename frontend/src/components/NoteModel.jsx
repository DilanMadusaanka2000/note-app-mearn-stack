import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NoteModel({ closeModel, addNote, currentNote, editNote }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentNote) {
      // Edit Note
      editNote(currentNote._id, title, description);
    } else {
      // Add Note
      addNote(title, description);
    }
    closeModel(); // Close the modal after submit
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="noteModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="noteModalLabel">
              {currentNote ? 'Edit Note' : 'Add New Note'}
            </h5>
            <button type="button" className="btn-close" onClick={closeModel} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="noteTitle" className="form-label">
                  Note Title
                </label>
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
                <label htmlFor="noteDescription" className="form-label">
                  Note Description
                </label>
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
                <button type="submit" className="btn btn-primary me-2">
                  {currentNote ? 'Save Changes' : 'Add Note'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={closeModel}>
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
