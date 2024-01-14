import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginProvider";
import LoginContextType from "../models/LoginContextType";
import ServiceNotes from "../services/ServiceNotes";
import Note from "../models/Note";
import NoteRequest from "../dtos/NoteRequest";

const NoteAdd = () => {
  let { user, setUserCookie } = useContext(LoginContext) as LoginContextType;
  let [title, setTitle] = useState<string>("");
  let [materie, setMaterie] = useState<string>("");
  let [tag, setTag] = useState<string>("");
  let [notite, setNotite] = useState<string>("");
  let [note, setNote] = useState<NoteRequest>({
    title: "",
    materie: "",
    tag: "",
    notite: "",
    isTrash: false,
    userId: 0,
  } as NoteRequest);

  useEffect(() => {
    setNote({
      title: title,
      materie: materie,
      tag: tag,
      notite: notite,
      isTrash: false,
      userId: user.id,
    } as NoteRequest);
  }, [title, materie, tag, notite]);

  let serviceNotes = new ServiceNotes();

  const handlerCreateNote = async (): Promise<void> => {
    try {
      const notesData = await serviceNotes.createNote(note);
      console.log(notesData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="formNodes">
      <h1>ADD NOTE</h1>
      <form className="formNodes__container__form">
        <input
          className="formNodes__container__form__input"
          type="text"
          id="email"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="formNodes__container__form__input"
          type="text"
          placeholder="Materie"
          onChange={(e) => setMaterie(e.target.value)}
        />

        <input
          className="formNodes__container__form__input"
          type="text"
          id="password"
          placeholder="Tag"
          onChange={(e) => setTag(e.target.value)}
        />

        <textarea
          className="formNodes__container__form__input"
          id="notite"
          placeholder="Notite"
          onChange={(e) => setNotite(e.target.value)}
        ></textarea>
        <button
          className="button__second"
          type="submit"
          onClick={() => handlerCreateNote()}
        >
          CREATE
        </button>
      </form>
    </div>
  );
};

export default NoteAdd;
