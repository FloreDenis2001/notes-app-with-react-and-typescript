import React from "react";
import ApiServer from "../utils/ApiServer";
import LoginRequest from "../dtos/LoginRequest";
import UserLogin from "../models/UserLogin";
import Note from "../models/Note";
import NoteRequest from "../dtos/NoteRequest";
import TrashRequest from "../dtos/TrashRequest";
import NoteOwnerResponse from "../dtos/NoteOwnerResponse";
import ShareRequest from "../dtos/ShareRequest";

class ServiceNotes extends ApiServer {

  getVerifyNote = async (noteId:number): Promise<NoteOwnerResponse> => {
    const data = await this.api<null, NoteOwnerResponse>(`notes/shareOwner/${noteId}`, "GET", null, "");
    if (data.status === 200) {
      const note = await data.json();
      return note;
    } else {
      return Promise.reject([]);
    }
  };


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


  getTrashNotesByUser = async (userId:number): Promise<Note[]> => {
    const data = await this.api<null, Note[]>(`notes/userTrash/${userId}`, "GET", null, "");
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

    
    updateNote = async (note: NoteRequest): Promise<Note> => {
        const data = await this.api<NoteRequest, Note>(`notes/update/`, "PUT", note, "");
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

    moveNoteToTrash = async (note:TrashRequest): Promise<void> => {
        const data = await this.api<TrashRequest, null>(`notes/trash`, "PUT", note, "");
        if (data.status === 200) {
            const note = await data.json();
            return note;
        } else {
        return Promise.reject([]);
        }
    };


    restoreNote = async (noteId:number): Promise<void> => {
        const data = await this.api<null, null>(`notes/restore/${noteId}`, "PUT", null, "");
        if (data.status === 200) {
            const note = await data.json();
            return note;
        } else {
        return Promise.reject([]);
        }
    };


    shareNote = async (share:ShareRequest): Promise<void> => {
        const data = await this.api<ShareRequest, null>(`notes/shareNoteByEmail`, "POST", share, "");
        if (data.status === 200) {
            const note = await data.json();
            return note;
        } else {
        return Promise.reject([]);
        }
    }






}

export default ServiceNotes;
