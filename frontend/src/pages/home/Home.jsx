import React, { useEffect, useState } from 'react';
import CustomNavbar from '../../components/navbar/CustomNavbar';
import { FaPlus } from 'react-icons/fa';
import NoteModel from '../../components/NoteModel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notecard from '../../components/notecard/Notecard';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [isModelOpen, setModelOpen] = useState(false);
  const[filteredNotes, setFilteredNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
  

    fetchNotes();  // Call the fetchNotes function
  }, []);  // Empty dependency array to run on component mount

  useEffect(() => {
    setFilteredNotes(
      notes.filter((note) =>note.title.toLowerCase().includes(query.toLowerCase())||
      note.description.toLowerCase().includes(query.toLowerCase())
    )
    )
  }, [query, notes]);

  //fetch all notes

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:8800/api/note/all',{

        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
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

  //add note

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


 //edit function
  
 const editNote = async (id ,title, description) => {
    try {
      const response = await axios.put(`http://localhost:8800/api/note/update/${id}`, {
     
        title,
        description
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log(response);
      alert('Note updated successfully');
      closeModel(); // Close the model after submission
      fetchNotes();
      
    } catch (error) {

      console.log(error);
      
    }
 }


 //delete note

 const deleteNote = async(id)=>{
    try {
      
      const response = await axios.delete(
        `http://localhost:8800/api/note/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }

        }
      );

      if(response.data.success){

        toast.success("note deleted successfully");
        fetchNotes();
      }
    } catch (error) {
      
    }
 }


  return (
    <div>
      <CustomNavbar setQuery={setQuery} />
      <div className="container mt-4">
      <div className="row">
  {filteredNotes && filteredNotes.length > 0 ? (
    filteredNotes.map((note) => (
      <Notecard
        key={note._id}
        note={note}
        onEdit={onEdit}
        deleteNote={deleteNote}
      />
    ))
  ) : (
    <p>No notes available.</p>
  )}
</div>

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
          <NoteModel closeModel={closeModel} addNote={addNote}
          currentNote={currentNote}
          editNote ={editNote}
          deleteNote = {deleteNote} />
        </div>
      )}
    </div>
  );
}

export default Home;
