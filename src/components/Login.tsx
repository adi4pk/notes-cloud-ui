import { useEffect, useState } from "react";
import { login } from "../services/notesService";
import type { UserLogin } from "../models/User";
import type { ApiRequestError } from "../services/notesService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserAuthenticationContextType";
import { useUser } from "../contexts/UserAuthenticationContextType";
import type { LoggedUser } from "../models/LoggedUser";

function Login() {
  useEffect(() => {
   
      // handleLogin();     -- use in useEffect for auto-Login??
  }, []);

  const navigate = useNavigate();


  const { setUserLogged} = useUser();
    
  let goToNotes = () =>{
    navigate("/main");
  }

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [error, setError] = useState<string | null> (null);

  const handleLogin = async (email: string, password: string) => {
    try{ 

      setError(null)
      const data = await login<LoggedUser>({email: email, password: password})  //login(user: userLogin)  |   destructure the User.ts interface
      console.log(data);
      

      let userObj: LoggedUser={
        email: email,
        password: password,
        token: data.token,
        expiresAt: data.expiresAt,
        permissions: data.permissions,
      }

      setUserLogged(userObj);

      
      goToNotes();

    } catch(err){
      let e = err as ApiRequestError;   //need to tell TypeScript to treat e as an ERROR, so message and status properties become available.
      // e.message = "FAILED";
      setError(e.message ?? "login failed");    //updates UI state with either backend message or fallback.
      // alert(e.message);

      console.log(e.message);
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
