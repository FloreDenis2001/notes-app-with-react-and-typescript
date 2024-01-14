import React, { useContext, useEffect, useState } from "react";
import Note from "../models/Note";
import LoginContextType from "../models/LoginContextType";
import { LoginContext } from "../context/LoginProvider";
import NoteRequest from "../dtos/NoteRequest";
import ServiceNotes from "../services/ServiceNotes";

interface NoteProps {
  note: Note;
  onUpdate: () => void;
  onDelete: () => void;
}

const TrashEditor: React.FC<NoteProps> = ({ note, onUpdate, onDelete }) => {
  const { user } = useContext(LoginContext) as LoginContextType;
  const serviceNotes = new ServiceNotes();

  const [noteUpdated, setNoteUpdated] = useState<NoteRequest>({
    title: note.title || "",
    materie: note.materie || "",
    tag: note.tag || "",
    notite: note.notite || "",
    isTrash: note.isTrash || false,
    userId: user.id || 0,
  });

  useEffect(() => {
    setNoteUpdated({
      title: note.title || "",
      materie: note.materie || "",
      tag: note.tag || "",
      notite: note.notite || "",
      isTrash: note.isTrash || false,
      userId: user.id || 0,
    });
  }, [note, user.id]);

  const handlerUpdateNote = async (): Promise<void> => {
    try {
      const noteData = await serviceNotes.restoreNote(note.id);
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handlerDeleteNote = async (): Promise<void> => {
    try {
      await serviceNotes.deleteNoteById(note.id);
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
            RESTORE
          </button>
          <button
            className="button__delete"
            type="button"
            onClick={() => handlerDeleteNote()}
          >
            REMOVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrashEditor;
