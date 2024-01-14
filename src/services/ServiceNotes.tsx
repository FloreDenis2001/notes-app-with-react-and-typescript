import React from "react";
import ApiServer from "../utils/ApiServer";
import LoginRequest from "../dtos/LoginRequest";
import UserLogin from "../models/UserLogin";
import Note from "../models/Note";
import NoteRequest from "../dtos/NoteRequest";

class ServiceNotes extends ApiServer {
  getAllNotes = async (): Promise<Note[]> => {
    const data = await this.api<null, Note[]>(`notes/all`, "GET", null, "");
    if (data.status === 200) {
      const notes = await data.json();
      return notes;
    } else {
      return Promise.reject([]);
    }
  };
  getAllNotesByUser = async (userId:number): Promise<Note[]> => {
    const data = await this.api<null, Note[]>(`notes/userNotes/${userId}`, "GET", null, "");
    if (data.status === 200) {
      const notes = await data.json();
      return notes;
    } else {
      return Promise.reject([]);
    }
  };


    createNote = async (note: NoteRequest): Promise<Note> => {
        const data = await this.api<NoteRequest, Note>(`notes/addNote`, "POST", note, "");
        if (data.status === 201) {
        const note = await data.json();
        return note;
        } else {
        return Promise.reject([]);
        }
    };

    
    updateNote = async (noteId:number,note: NoteRequest): Promise<Note> => {
        const data = await this.api<NoteRequest, Note>(`notes/update/${noteId}`, "PUT", note, "");
        if (data.status === 201) {
        const note = await data.json();
        return note;
        } else {
        return Promise.reject([]);
        }
    };

    deleteNoteById = async (noteId:number): Promise<void> => {
        const data = await this.api<null, null>(`notes/delete/${noteId}`, "DELETE", null, "");
        if (data.status === 200) {
        return;
        } else {
        return Promise.reject([]);
        }
    };

    moveNoteToTrash = async (noteId:number): Promise<void> => {
        const data = await this.api<null, null>(`notes/trash/${noteId}`, "PUT", null, "");
        if (data.status === 200) {
            const note = await data.json();
            return note;
        } else {
        return Promise.reject([]);
        }
    };

    getTrashNotes = async (userId:number): Promise<Note[]> => {
        const data = await this.api<null, Note[]>(`notes/userTrashNotes/${userId}`, "GET", null, "");
        if (data.status === 200) {
        const notes = await data.json();
        return notes;
        } else {
        return Promise.reject([]);
        }
    }

    restoreNote = async (noteId:number): Promise<void> => {
        const data = await this.api<null, null>(`notes/restore/${noteId}`, "PUT", null, "");
        if (data.status === 200) {
            const note = await data.json();
            return note;
        } else {
        return Promise.reject([]);
        }
    };






}

export default ServiceNotes;
