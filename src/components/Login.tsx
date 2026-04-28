import { useState } from "react";
import type { ApiRequestError } from "../services/notesService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
    
  const goToNotes = () =>{
    navigate("/main");
  }

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [error, setError] = useState<string | null> (null);

  const handleLogin = async (email: string, password: string) => {
    try{ 

      setError(null)
      await signIn({email: email, password: password});
      
      goToNotes();

    } catch(err){
      const e = err as ApiRequestError;
      setError(e.message ?? "login failed");
    }
  };

  

  return (
    <div
      className="login-container"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>Username</p>
      <input
        type="text"
        placeholder="username"
        className="user-field"
        style={{
          border: "2px solid salmon",
          height: "30px",
          borderRadius: "5px",
        }}
        onChange={(event) => setUser(event.target.value)}
      ></input>

      <p>Password</p>
      <input
        type="password"
        placeholder="****"
        className="pass-field"
        style={{
          border: "2px solid salmon",
          height: "30px",
          borderRadius: "5px",
        }}
        onChange={(event) => setPass(event.target.value)}
      ></input>

      <button
      className="btn"
      type="button"
      style={{
        border: "2px solid salmon",
        height: "40px",
        borderRadius: "5px",
        marginTop: "20px",
      }}
      onClick={() => handleLogin(user, pass)}
      >Login</button>

      <p className="login-error-message">{error? error : ""}</p>
    </div>
  );
}

export default Login;
