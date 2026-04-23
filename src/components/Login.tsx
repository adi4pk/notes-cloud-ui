import { use, useEffect, useState } from "react";
import { login } from "../services/notesService";
import type { UserLogin } from "../models/User";
import type { ApiRequestError } from "../services/notesService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserAuthenticationContextType";
import { useToken } from "../contexts/UserAuthenticationContextType";

function Login() {
  useEffect(() => {
   
      // handleLogin();     -- use in useEffect for auto-Login
  }, []);

  const navigate = useNavigate();


  const { handleContextLogin, setAccesToken } = useToken();


  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [error, setError] = useState<string | null> (null);

  const handleLogin = async () => {
    // try {
    //   // const data = await login({email: "admin@notecloud.local", password: "Admin123!" });
    //   const data = await login({email: user, password: pass});

    //   console.log(data);

    // } catch (err) {
    //     let d= err as ApiRequestError;
    //     alert(d.message);
    // }

    let goToNotes = () =>{
    navigate("/main");
  }

    setError(null);
    
    try{
      await handleContextLogin(user, pass);    //login(user: userLogin)  |   destructure the User.ts interface
      
      goToNotes();
      
    } catch (err){
      console.log(err);
      // goToNotes();
      const e = err as ApiRequestError;     //need to tell TypeScript to treat e as an ERROR, so message and status properties become available.
      setError(e.message ?? "login failed");    //updates UI state with either backend message or fallback.
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
      onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
