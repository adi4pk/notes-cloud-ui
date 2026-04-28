import type { NoteItem } from "../models/NoteItem";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CreateNoteRequest } from "../models/CreateNoteRequest";
import { getNoteById, updateNote, type ApiRequestError } from "../services/notesService";

function EditNote(){

const navigate = useNavigate();
const {id} = useParams();
const [currentNote, setCurrentNote] = useState<NoteItem | null>(null);
const [noteTitle, setNoteTitle] = useState("");
const [noteContent, setNoteContent] = useState("");
const [noteCategory, setNoteCategory] = useState("");
const [isFavorite, setIsFavorite] = useState(false);
const [noteDate, setNoteDate] = useState("");
const [isEmptyTitle, setIsEmptyTitle] = useState(false);
const [isEmptyContent, setIsEmptyContent] = useState(false);
const [isEmptyCategory, setIsEmptyCategory] = useState(false);
const [error, setError] = useState<string | null>(null);

const goToHome = () =>{
    navigate('/main');
}

useEffect(() => {
    const fetchNote = async () => {
      if (!id) {
        setError("Nota nu a putut fi identificată.");
        return;
      }

      try {
        const thisNote = await getNoteById(id);
        setCurrentNote(thisNote);
        setNoteTitle(thisNote.title);
        setNoteContent(thisNote.content);
        setNoteCategory(thisNote.categoryId);
        setIsFavorite(thisNote.isFavorite);
        setNoteDate(thisNote.date);
      } catch (err) {
        const apiError = err as ApiRequestError;
        setError(apiError.message ?? "Nu am putut încărca notița.");
      }
    };

    void fetchNote();
}, [id]);

async function editNote(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const nextIsEmptyTitle = noteTitle.trim() === "";
    const nextIsEmptyContent = noteContent.trim() === "";
    const nextIsEmptyCategory = noteCategory.trim() === "";

    setIsEmptyTitle(nextIsEmptyTitle);
    setIsEmptyContent(nextIsEmptyContent);
    setIsEmptyCategory(nextIsEmptyCategory);
    setError(null);

    if (nextIsEmptyTitle || nextIsEmptyContent || nextIsEmptyCategory || !currentNote) {
      return;
    }

    const noteObj: CreateNoteRequest = {
      title: noteTitle.trim(),
      content: noteContent.trim(),
      categoryId: noteCategory.trim(),
      isFavorite,
      date: noteDate || new Date().toISOString(),
    };

    try {
      await updateNote(currentNote.id, noteObj);
      goToHome();
    } catch (err) {
      const apiError = err as ApiRequestError;
      setError(apiError.message ?? "Nu am putut actualiza notița.");
    }
}

return(
    <>
    <div className="add-note-form">
                <h2 className="edit-note-title">
                  Editeaza Nota
                </h2>
                <form className="form-container" onSubmit={editNote}>
                  <div className="form-group">
                    <label htmlFor="note-title"
                    style={{textAlign:"start",}}>Titlu</label>
                    <input
                      type="text"
                      id="note-title"
                      placeholder="Introdu titlul notei..."
                      value={noteTitle}
                      onChange={(event) => setNoteTitle(event.target.value)}
                    />
                    <p className={isEmptyTitle ? 'add-note-error' : 'hide'}>Title cannot be empty.</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="note-category"
                    style={{textAlign:"start",}}>Category ID</label>
                    <input
                      type="text"
                      id="note-category"
                      placeholder="Introdu category ID..."
                      value={noteCategory}
                      onChange={(event) => setNoteCategory(event.target.value)}
                    />
                    <p className={isEmptyCategory ? 'add-note-error' : 'hide'}>Category ID cannot be empty.</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="note-content"
                    style={{textAlign:"start",
                    }}>
                      Conținut</label>
                    <textarea
                      id="note-content"
                      placeholder="Scrie notița aici..."
                      value={noteContent}
                      onChange={(event) => setNoteContent(event.target.value)}/>
                    <p className={isEmptyContent ? 'add-note-error' : 'hide'}>Content cannot be empty.</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="note-favorite" style={{textAlign:"start"}}>Favorite</label>
                    <input
                      type="checkbox"
                      id="note-favorite"
                      checked={isFavorite}
                      onChange={(event) => setIsFavorite(event.target.checked)}
                    />
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
              </div></>
)

}

export default EditNote;
