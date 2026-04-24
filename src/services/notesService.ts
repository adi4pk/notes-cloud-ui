import type { Token } from "../models/Token";
import type { UserLogin } from "../models/User";
import type { CreateNoteRequest } from "../models/CreateNoteRequest";
import type { CreateNoteResponse } from "../models/CreateNoteResponse";
import type { NoteItem } from "../models/NoteItem";


type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const API_BASE_URL = "http://localhost:8080/";

export type ApiRequestError = {
  status: number;
  message: string;
};

//NO HOOKS IN SERVICE

//CONTEXT FUNCTIONS

// const [userToken, setUserToken] = useState<string | null> (null); faulty


function setAccesToken(token: string){
  localStorage.setItem("access_token", token);
  // setUserToken("access_token");
}

export async function login<T>(user: UserLogin): Promise<T> {
  const response = await fetch(`${API_BASE_URL}api/v1/auth/login`, {      //url + options{...}
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {   //.ok implies the status [metadata], not the body of the response
    let data = await response.text();
   
    let error:ApiRequestError={
        status:response.status,     //isn't status coming as 'string' from the endpoint??? NO - this is the metadata (protocol-level)
        message:data,             //this is the response body
    }
    throw error;
  }
  // return await response.json(); //

  let data = await response.json();
  setAccesToken(data.token);   
  // -- Best practice: SET TOKEN in CONTEXT, NOT Api service.ts file

  console.log(data.token);
  
  return data as T;    //=> this token data (string) will be grabbed by Context
}


export async function getNotes(){

let token = localStorage.getItem("access_token");
// let token = "";

  const response = await fetch(`${API_BASE_URL}api/v1/notes`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json; charset=utf-8",
      "X-Requested-With" : "XMLHttpRequest",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok){
    let data = await response.text();

    let error: ApiRequestError={
      status: response.status,
      message: data,
    }
    throw error;
  }
  

  return await response.json();
}

export async function createNote(note: CreateNoteRequest): Promise<CreateNoteResponse>{

  let token = localStorage.getItem("access_token");
  // console.log(token);
  const response = await fetch(`${API_BASE_URL}api/v1/notes`, {
  method: "POST",
  headers: {"Content-Type" : "application/json; charset=utf-8",
      "X-Requested-With" : "XMLHttpRequest",
      Authorization: `Bearer ${token}`
    },
  body: JSON.stringify(note)
  });


  if(!response.ok){
    let data = await response.text();

    let error: ApiRequestError={
      status: response.status,
      message: data,
    }
    throw error;
  }

  return await response.json() as Promise<CreateNoteResponse>;
}

export async function getNoteById(id: string): Promise<NoteItem>{
  let token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}api/v1/notes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json; charset=utf-8",
      "X-Requested-With" : "XMLHttpRequest",
      Authorization: `Bearer ${token}`,
    }})

    if(!response.ok){
      let data = await response.text();

      let error: ApiRequestError={
        status: response.status,
        message: data,
      } 
      throw error;
    }

    return await response.json();
}

export async function updateNote(id: string, note: CreateNoteRequest): Promise<CreateNoteResponse>{

  let token = localStorage.getItem("access_token");


  // console.log(token);

  const response = await fetch(`${API_BASE_URL}api/v1/notes/${id}`,{
    method: "PUT",
    headers: {
      "Content-Type" : "application/json; charset=utf-8",
      "X-Requested-With" : "XMLHttpRequest",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(note),   //need to add note:NoteItem as paramater => to send as BODY
    
  })

  if(!response.ok){
    let data = await response.text();

    let error: ApiRequestError={
      status: response.status,
      message: data,
    }
    throw error;
  }

  return await response.json();
} 

export async function removeNote(id:string) : Promise<void>{
  
  let token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}api/v1/notes/${id}`, {
    method: "DELETE",
    headers:{
      "Content-Type" : "application/json; charset=utf-8",
      "X-Requested-With" : "XMLHttpRequest",
      Authorization: `Bearer ${token}`,
    },
    body: null,
  })

  if(!response.ok){
    let data = await response.text();

    let error: ApiRequestError={
      status: response.status,
      message: data,
    }
    throw error;
  }

  return await response.json() as Promise<void>;
}