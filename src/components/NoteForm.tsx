import type { NoteItem } from "../models/NoteItem";
import { useState } from "react";
import { createNote } from "../services/notesService";
import { useNavigate } from "react-router-dom";
import type { CreateNoteRequest } from "../models/CreateNoteRequest";

function NoteForm(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isEmptyTitle, setIsEmptyTitle] = useState<Boolean>(false);
    const [isEmptyContent, setIsEmptyContent] = useState<Boolean>(false);

    let navigate = useNavigate();

    let goToHome = () => {
      navigate('/main');
    }

    const handleAddNote = async () =>{

        let noteObj: CreateNoteRequest = {
            title: title,
            content: content,
            categoryId: "cccccccc-cccc-cccc-cccc-cccccccccccc",
            isFavorite: false,
            // date: Date.now().toString()
            date: "2026-04-07T19:12:10.774Z"
        }

        if(title === ""){
          setIsEmptyTitle(true);
          setIsEmptyContent(false);
          return;
        } else if(content === ""){
          setIsEmptyContent(true);
          setIsEmptyTitle(false);
          return;
        }

        let data = await createNote(noteObj);
        console.log("test");
        setIsEmptyTitle(false);
        setIsEmptyContent(false);
        goToHome();
        console.log(data);
    }

    return(
        <>
        <div className="add-note-form">
                <h2
                  style={{
                    marginBottom: 25,
                    color: "#2c3e50",
                    fontSize: "1.8em",
                  }}
                >
                  Creează Notiță Nouă
                </h2>
                <form className="form-container">
                  <div className="form-group">
                    <label htmlFor="note-title"
                    style={{textAlign:"start",}}>Titlu</label>
                    <div className="title-error-div">
                    <input
                      type="text"
                      id="note-title"
                      placeholder="Introdu titlul notei..."
                      // defaultValue={title}
                      value={title}
                      onChange={event => setTitle(event.target.value)}
                    />
                    <p className={isEmptyTitle?'error':'hide'}>Title cannot be empty</p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="note-content"
                    style={{textAlign:"start",
                    }}>
                      Conținut</label>
                    <div className="content-error-div">
                    <textarea
                      id="note-content"
                      placeholder="Scrie notița aici..."
                      // defaultValue="Aceasta este o notiță nouă. Poți edita acest text."
                      value={content}
                      onChange={event => setContent(event.target.value)}
                    />
                    <p className={isEmptyContent? 'error': 'hide'}>Content cannot be empty</p>
                    </div>
                  </div>
                  <div className="form-buttons">
                    <label
                      htmlFor="add-note-toggle"
                      className="btn btn-primary"
                      onClick={() => {
                        handleAddNote();
                        
                      }}
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
              </div>
            </>
    );
     
}

export default NoteForm;