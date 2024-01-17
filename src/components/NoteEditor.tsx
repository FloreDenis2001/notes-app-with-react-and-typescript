import React, { useContext, useEffect, useState } from "react";
import Note from "../models/Note";
import LoginContextType from "../models/LoginContextType";
import { LoginContext } from "../context/LoginProvider";
import ServiceNotes from "../services/ServiceNotes";
import UpdateNoteRequest from "../dtos/UpdateNoteRequest";
import TrashRequest from "../dtos/TrashRequest";

interface NoteProps {
  note: Note;
  onUpdate: () => void;
  onDelete: () => void;
}

const NoteEditor: React.FC<NoteProps> = ({ note, onUpdate, onDelete }) => {
  const { user } = useContext(LoginContext) as LoginContextType;
  const serviceNotes = new ServiceNotes();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const handlerOwner = async (): Promise<void> => {
    try {
      let response = await serviceNotes.getVerifyNote(note.id);
      console.log(response);
      if (response.id === user.id) {
        setIsOwner(true);
      }else {
        setIsOwner(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [noteUpdated, setNoteUpdated] = useState<UpdateNoteRequest>({
    title: note.title || "",
    materie: note.materie || "",
    tag: note.tag || "",
    notite: note.notite || "",
    isTrash: note.isTrash || false,
    userId: user.id || 0,
    noteId: note.id || 0,
  });

  useEffect(() => {
    handlerOwner();
    setNoteUpdated({
      title: note.title || "",
      materie: note.materie || "",
      tag: note.tag || "",
      notite: note.notite || "",
      isTrash: note.isTrash || false,
      userId: user.id || 0,
      noteId: note.id || 0,
    });
  }, [note, user.id]);

  const handlerUpdateNote = async (): Promise<void> => {
    try {
      const noteData = await serviceNotes.updateNote(noteUpdated);
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handlerDeleteNote = async (): Promise<void> => {
    try {
      await serviceNotes.moveNoteToTrash({
        userId: user.id,
        noteId: note.id,
      } as TrashRequest);
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formNodes">
      <h1>EDIT NOTE</h1>
      <form className="formNodes__container__form">
        <input
          className="formNodes__container__form__input"
          type="text"
          id="title"
          placeholder="Title"
          value={noteUpdated.title}
          onChange={(e) =>
            setNoteUpdated({ ...noteUpdated, title: e.target.value })
          }
        />
        <input
          className="formNodes__container__form__input"
          type="text"
          id="materie"
          placeholder="Materie"
          value={noteUpdated.materie}
          onChange={(e) =>
            setNoteUpdated({ ...noteUpdated, materie: e.target.value })
          }
        />
        <input
          className="formNodes__container__form__input"
          type="text"
          id="tag"
          placeholder="Tag"
          value={noteUpdated.tag}
          onChange={(e) =>
            setNoteUpdated({ ...noteUpdated, tag: e.target.value })
          }
        />
        <textarea
          className="formNodes__container__form__input"
          id="notite"
          placeholder="Notite"
          value={noteUpdated.notite}
          onChange={(e) =>
            setNoteUpdated({ ...noteUpdated, notite: e.target.value })
          }
        />
        <div className="formNodes__buttonsContainer">
          <button
            className="button__second"
            onClick={() => handlerUpdateNote()}
          >
            UPDATE
          </button>

          {isOwner && (
            <button
              className="button__delete"
              type="button"
              onClick={() => handlerDeleteNote()}
            >
              DELETE
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
