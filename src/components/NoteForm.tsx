import { useState, type FormEvent } from "react";
import { createNote } from "../services/notesService";
import { useNavigate } from "react-router-dom";
import type { CreateNoteRequest } from "../models/CreateNoteRequest";
import type { ApiRequestError } from "../services/notesService";

function NoteForm(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [isEmptyTitle, setIsEmptyTitle] = useState(false);
    const [isEmptyContent, setIsEmptyContent] = useState(false);
    const [isEmptyCategory, setIsEmptyCategory] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const goToHome = () => {
      navigate('/main');
    }

    const handleAddNote = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        const nextIsEmptyTitle = title.trim() === "";
        const nextIsEmptyContent = content.trim() === "";
        const nextIsEmptyCategory = categoryId.trim() === "";

        setIsEmptyTitle(nextIsEmptyTitle);
        setIsEmptyContent(nextIsEmptyContent);
        setIsEmptyCategory(nextIsEmptyCategory);
        setError(null);

        if (nextIsEmptyTitle || nextIsEmptyContent || nextIsEmptyCategory) {
          return;
        }

        const noteObj: CreateNoteRequest = {
            title: title.trim(),
            content: content.trim(),
            categoryId: categoryId.trim(),
            isFavorite: false,
            date: new Date().toISOString()
        }

        try {
          await createNote(noteObj);
          goToHome();
        } catch (err) {
          const apiError = err as ApiRequestError;
          setError(apiError.message ?? "Nu am putut crea notița.");
        }
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
                <form className="form-container" onSubmit={handleAddNote}>
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
                    <p className={isEmptyTitle?'add-note-error':'hide'}>Title cannot be empty</p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="note-category" style={{textAlign:"start"}}>Category ID</label>
                    <div className="content-error-div">
                    <input
                      type="text"
                      id="note-category"
                      placeholder="Introdu category ID..."
                      value={categoryId}
                      onChange={event => setCategoryId(event.target.value)}
                    />
                    <p className={isEmptyCategory ? 'add-note-error' : 'hide'}>Category ID cannot be empty</p>
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
                    <p className={isEmptyContent? 'add-note-error': 'hide'}>Content cannot be empty</p>
                    </div>
                  </div>
                  <p className={error ? 'login-error-message' : 'hide'}>{error ?? ""}</p>
                  <div className="form-buttons">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      💾 Salvează
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={goToHome}
                    >
                      ❌ Anulează
                    </button>
                  </div>
                </form>
              </div>
            </>
    );
     
}

export default NoteForm;
