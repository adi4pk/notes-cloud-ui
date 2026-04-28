import type { ReactElement } from "react"
import Home from './components/Home'
import Login from './components/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NoteForm from './components/NoteForm'
import EditNote from './components/EditNote'
import { AuthProvider } from './contexts/AuthProvider'
import { useAuth } from './contexts/useAuth'

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { authSession } = useAuth()

  if (!authSession?.token) {
    return <Navigate to="/" replace />
  }

  return children
}

function PublicRoute({ children }: { children: ReactElement }) {
  const { authSession } = useAuth()

  if (authSession?.token) {
    return <Navigate to="/main" replace />
  }

  return children
}

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/main" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/addNote" element={<ProtectedRoute><NoteForm /></ProtectedRoute>} />
            <Route path="/editNote/:id" element={<ProtectedRoute><EditNote /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App
