import Note from '../models/Note.js';
import User from '../models/User.js';


export const addNote = async (req, res) => {

       try {
         
        const {title, description} = req.body;
        const newNote = new Note({
            title,
            description,
            userId: req.user.id
        });

        const savedNote = await newNote.save();

        return res.status(200).json(savedNote,);

       } catch (error) {
        return res.status(500).json({message: "Error Adding Note"});
       }
   
    
}

export const allNotes = async (req, res) => {
    try {
        //const notes = await Note.find({userId: req.user.id});
        const notes = await Note.find()
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({message: "Error Fetching Notes"});
    }
}
