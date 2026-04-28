import { useEffect, useState } from "react";
import type { NoteItem } from "../models/NoteItem";
import Note from "./Note";
import { getNotes } from "../services/notesService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

function Home(){
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const { signOut } = useAuth();

  const navigate = useNavigate();

  const goToAddNote = () => {
    navigate("/addNote");
  }

  const goToLogin = () => {
    navigate("/");
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data.notes);
    };

    void fetchNotes();
  }, []);

  async function loadNotes() {
    const data = await getNotes();
    setNotes(data.notes);
  }

  function logOut() {
    signOut();
    goToLogin();
  }

  // const [currentNote, setCurrentNote]=useState<NoteItem | null>(null);
  // function handleEditNoteBtn(note: NoteItem){
  //   console.log(note);
  //   setCurrentNote(note);
  //   console.log(`current note is ${note}`);
  // }  ---- ONLY for PROPS


return(
        <div className="container">
        <header className="header-section">
          <div className="title-wrapper">
            <h1>📝 Notițele Mele</h1>
            <p>Organizează-ți ideile cu stil</p>
          </div>
          
          <div className="side-buttons">
            <button className="logout-btn"
            onClick={() => logOut()}>Log out</button>
          </div>
        </header>
        
       <div className="all-notes-content tab-content"
        style={{display: "flex"}}>
            {/* Add Note Section */}
            <div className="add-note-wrapper">
              <button type="button" className="add-note-btn" onClick={goToAddNote}>
                <span
                style={{
          border: "2px solid salmon",
          height: "30px",
          borderRadius: "5px",
        }}
        >
          ➕ </span>
          Adaugă Notiță Nouă
              </button>
            </div>
            </div>
            

        <table className="notes-grid">
          <thead>
            <tr>
            <th scope="col">Titlu</th>
            <th scope="col">Data</th>
            <th scope="col">Continut</th>
            <th scope="col">Category ID</th>
            <th scope="col">Editeaza</th>
            </tr>
          </thead>
          <tbody className="table-container">
            {notes.map((note) => (
              <Note 
              key={note.id} 
              note={note}
              reload={loadNotes}
              // onEdit={handleEditNoteBtn}
              />
              
            ))}
          </tbody>
            
            
        </table>
        
        </div>
    )


    
  }

    


export default Home;
