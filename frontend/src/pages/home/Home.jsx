import React, { useEffect, useState } from 'react';
import CustomNavbar from '../../components/navbar/CustomNavbar';
import { FaPlus } from 'react-icons/fa';
import NoteModel from '../../components/NoteModel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notecard from '../../components/notecard/Notecard';

function Home() {
  const [isModelOpen, setModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
  

    fetchNotes();  // Call the fetchNotes function
  }, []);  // Empty dependency array to run on component mount


  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:8800/api/note/all');
      setNotes(data);  // Set the notes state
      console.log(data);  // Log to the console for debugging
    } catch (error) {
      console.log(error);
    }
  };
  

  const closeModel = () => {
    setModelOpen(false);
  };




  const onEdit = (note) =>{
    setCurrentNote(note);
    setModelOpen(true);
  }

  const addNote = async (title, description) => {
    try {
      const response = await axios.post('http://localhost:8800/api/note/add', {
        title,
        description
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log(response);
      alert('Note added successfully');
      closeModel(); // Close the model after submission
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CustomNavbar />
      <div>
        {notes.length > 0 ? (
          notes.map(note => (
            <Notecard key={note._id} note={note}
            onEdit={onEdit} />  // Ensure each note has a unique key
          ))
        ) : (
          <p>No notes available.</p>  // Optional message if no notes exist
        )}
      </div>

      <button
        onClick={() => setModelOpen(true)}
        className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle shadow"
        style={{ width: '60px', height: '60px' }}
      >
        <FaPlus size={24} />
      </button>

      {isModelOpen && (
        <div className="overlay">
          <NoteModel closeModel={closeModel} addNote={addNote} />
        </div>
      )}
    </div>
  );
}

export default Home;
