import { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NoteForm from './components/NoteForm'
import EditNote from './components/EditNote'
import { UserContextProvider } from './contexts/UserAuthenticationContextType'
// import { PrivateRoute } from './privateRoutes/PrivateRoute'
import { useUser } from './contexts/UserAuthenticationContextType'
import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { userLogged } = useUser()

  if (!userLogged?.token) {
    return <Navigate to="/" replace />
  }

  return children
}

function PublicRoute({ children }: { children: ReactElement }) {
  const { userLogged } = useUser()

  if (userLogged?.token) {
    return <Navigate to="/main" replace />
  }

  return children
}

function App() {
  return (
    <>
      <UserContextProvider>
        
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<PublicRoute><Login /></PublicRoute>}></Route> //MUST name this path '/' -- this is the default path found by REACT Router
            <Route path="/main" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="/addNote" element={<ProtectedRoute><NoteForm /></ProtectedRoute>}></Route>
            <Route path="/editNote/:id" element={<ProtectedRoute><EditNote/></ProtectedRoute>}></Route>

            {/* <Route element={<PrivateRoute/>}>

            </Route> */}
          </Routes>

        </BrowserRouter>

      </UserContextProvider>
    </>
  );
}

export default App
