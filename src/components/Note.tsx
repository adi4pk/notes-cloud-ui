import { useState } from "react";
import type { NoteItem } from "../models/NoteItem";
import { Link, useNavigate } from "react-router-dom";
import { removeNote } from "../services/notesService";

type NoteProps={
    note: NoteItem;
    // onEdit: (note:NoteItem) => void;
    reload: () => void;   //must specify :() -- type: function
}


function Note({note, reload}:NoteProps){

  let navigate = useNavigate();

  let goToEditNote = () => {
    navigate("/editNote")
  }

  async function deleteNote(id: string){
    let data = await removeNote(id);
    reload();
  }
  
    return(
        <>
          
            <tr key={note.id} className="note-wrapper">
        
        {/* <input type="checkbox" id="favorite-1" className="favorite-toggle" /> */}
        
          <td className="note-header">
            <h3 className="note-title">{note.title}</h3>
            <label htmlFor="favorite-1" className="favorite-star">
              ⭐
            </label>
          </td>
          <td className="note-date">📅 {note.date}</td>

          <td>{note.content}</td>
          <td className="note-tag tag-work">{note.categoryId}</td>
          <td><Link to={`/editNote/${note.id}`}>✏️</Link></td>
            <td
              // htmlFor="delete-note-1"
              className="action-btn delete-btn"
            //   onClick={() => removeNote(index)}
            onClick={() => deleteNote(note.id)}
            >
              🗑️ Șterge
            </td>
          


          
        
      </tr>
        
        </>
    )

}

export default Note;