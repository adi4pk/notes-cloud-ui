import { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NoteForm from './components/NoteForm'
import EditNote from './components/EditNote'
import { UserContextProvider } from './contexts/UserAuthenticationContextType'

function App() {
  return (
    <>
      <UserContextProvider>
        
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Login />}></Route> //MUST name this path '/' -- this is the default path found by REACT Router
            <Route path="/main" element={<Home />}></Route>
            <Route path="/addNote" element={<NoteForm />}></Route>
            <Route path="/editNote/:id" element={<EditNote />}></Route>
          </Routes>

        </BrowserRouter>

      </UserContextProvider>
    </>
  );
}

export default App
