import { useEffect, useState } from "react";
import type { NoteItem } from "../models/NoteItem";
import Note from "./Note";
import { getNotes } from "../services/notesService";
import NoteForm from "./NoteForm";
import { useNavigate } from "react-router-dom";
import { getNoteById } from "../services/notesService";
import { useUser } from "../contexts/UserAuthenticationContextType";

function Home(){

  const [notes, setNotes] = useState<NoteItem[]>([]);


  const {userLogged, setUserLogged} = useUser();

  useEffect(() =>{

    loadNotes();
  }, []);


  const navigate = useNavigate();

  let goToAddNote = () => {
    navigate("/addNote");
  }

  let goToLogin = () => {
    navigate("/");
  }

  function logOut (){
    if (userLogged){
      setUserLogged(null);
      console.log("user disconnected");

      localStorage.removeItem("access_token");
      goToLogin();
    }
  }
  

  async function loadNotes(){
    let data = await getNotes();
    setNotes(data.notes);
    console.log(data.notes);
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
              <label htmlFor="add-note-toggle" className="add-note-btn"
              >
                <span
                style={{
          border: "2px solid salmon",
          height: "30px",
          borderRadius: "5px",
        }}
        onClick={() => goToAddNote()}>
          ➕ </span>
          Adaugă Notiță Nouă
              </label>
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

