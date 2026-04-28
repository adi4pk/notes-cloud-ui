import type { NoteItem } from "../models/NoteItem";
import { use, useEffect, useState } from "react";
import { createNote } from "../services/notesService";
import { useNavigate, useParams } from "react-router-dom";
import type { CreateNoteRequest } from "../models/CreateNoteRequest";
import { getNoteById } from "../services/notesService";
import { updateNote } from "../services/notesService";

function EditNote(){

let navigate = useNavigate();
const {id} = useParams();
const [currentNote, setCurrentNote] = useState<NoteItem> ();
const [noteTitle, setNoteTitle] = useState("");
const [noteContent, setNoteContent] = useState("");
const [noteCategory, setNoteCategory] = useState("");
const [isFavorite, setIsFavorite] = useState(Boolean);
const [noteDate, setNoteDate] = useState("");

const [isEmptyTitle, setIsEmptyTitle] = useState<Boolean>(false);

useEffect(() => {
    // console.log(currentNote);
    fetchNote();
    
}, [])

let goToHome = () =>{
    navigate('/main');
}

async function fetchNote(){
    
    let thisNote = await getNoteById(id??"");
    setCurrentNote(thisNote);
    setNoteTitle(thisNote.title);
    setNoteContent(thisNote.content);
    setNoteCategory(thisNote.categoryId);
    setIsFavorite(thisNote.isFavorite);
    setNoteDate(thisNote.date);
}

async function editNote(){

  
    if(currentNote !==null){
        let noteObj={
        title: noteTitle,
        content: noteContent,
        categoryId: noteCategory,
        isFavorite: isFavorite,
        date: noteDate,
        // date: currentNote?.date,
    } 
    // console.log(noteObj);
      console.log(noteTitle)
    if(noteTitle === ""){
      console.log(noteTitle)
      // setIsEmptyTitle(true);
      // return;
    }

    // await updateNote(currentNote?.id+"", noteObj as CreateNoteRequest );
    // console.log(noteObj);
    // goToHome()
    }

   
    // goToHome();

    // setNoteTitle(noteObj.title);
    // setNoteContent(noteObj.content);
    // setNoteCategory(noteObj.categoryId);
    // setIsFavorite(noteObj.isFavorite);
    // setNoteDate(noteObj.date);

    
}

return(
    <>
    <div className="add-note-form">
                <h2 className="edit-note-title">
                  Editeaza Nota
                </h2>
                <form className="form-container">
                  <div className="form-group">
                    <label htmlFor="note-title"
                    style={{textAlign:"start",}}>Titlu</label>
                    <input
                      type="text"
                      id="note-title"
                      placeholder="Introdu titlul notei..."
                      defaultValue={currentNote?.title}
                    //   value={currentNote?.title}
                      onInput={(event) => setNoteTitle((event.target as HTMLInputElement).value)}
                    />
                    <p className={isEmptyTitle? 'error' : 'hide'}>Title cannot be empty.</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="note-content"
                    style={{textAlign:"start",
                    }}>
                      Conținut</label>
                    <textarea
                      id="note-content"
                      placeholder="Scrie notița aici..."
                      defaultValue={currentNote?.content}
                    //   value={currentNote?.content}
                      onChange={(event) => setNoteContent(event.target.value)}/>
                  </div>
                  <div className="form-buttons">
                    <label
                      htmlFor="add-note-toggle"
                      className="btn btn-primary"
                      onClick={() => editNote()}
                    >
                      💾 Salvează
                    </label>
                    <label
                      htmlFor="add-note-toggle"
                      className="btn btn-secondary"
                      onClick={() => goToHome()}
                    >
                      ❌ Anulează
                    </label>
                  </div>
                </form>
              </div></>
)

}

export default EditNote;