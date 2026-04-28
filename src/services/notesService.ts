import type { UserLogin } from "../models/User";
import type { CreateNoteRequest } from "../models/CreateNoteRequest";
import type { CreateNoteResponse } from "../models/CreateNoteResponse";
import type { NoteItem } from "../models/NoteItem";
import { apiDelete, apiGet, apiPost, apiPut } from "../lib/apiClient";

export type { ApiRequestError } from "../lib/apiClient";

export type NotesResponse = {
  notes: NoteItem[];
};

export async function login<T>(user: UserLogin): Promise<T> {
  return apiPost<T>("api/v1/auth/login", user);
}

export async function getNotes(): Promise<NotesResponse> {
  return apiGet<NotesResponse>("api/v1/notes", true);
}

export async function createNote(note: CreateNoteRequest): Promise<CreateNoteResponse> {
  return apiPost<CreateNoteResponse>("api/v1/notes", note, true);
}

export async function getNoteById(id: string): Promise<NoteItem> {
  return apiGet<NoteItem>(`api/v1/notes/${id}`, true);
}

export async function updateNote(id: string, note: CreateNoteRequest): Promise<CreateNoteResponse> {
  return apiPut<CreateNoteResponse>(`api/v1/notes/${id}`, note, true);
}

export async function removeNote(id: string): Promise<void> {
  return apiDelete(`api/v1/notes/${id}`, true);
}
