import React, { useState } from 'react';
import CustomNavbar from '../../components/navbar/CustomNavbar';
import { FaPlus } from 'react-icons/fa';
import NoteModel from '../../components/NoteModel';

function Home() {
  const [isModelOpen, setModelOpen] = useState(false);

  return (
    <div>
      <CustomNavbar />

      <button
        onClick={() => setModelOpen(true)}
        className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle shadow"
        style={{ width: '60px', height: '60px' }}
      >
        <FaPlus size={24} />
      </button>

      {isModelOpen && (
        <div className="overlay">
          <NoteModel onClose={() => setModelOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default Home;
