import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faNoteSticky,
  faPlus,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import NoteContainer from "./NoteContainer";
import ServiceNotes from "../services/ServiceNotes";
import Note from "../models/Note";
import LoginContextType from "../models/LoginContextType";
import { LoginContext } from "../context/LoginProvider";
import { useLocation } from "react-router-dom";
import NoteAdd from "./NoteAdd";
import NoteEditor from "./NoteEditor";
import ShareRequest from "../dtos/ShareRequest";
import NoteHome from "./NoteHome";

const SharedNotes = () => {
  const [sortBy, setSortBy] = useState("title");
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [isAddNote, setIsAddNote] = useState<boolean>(false);
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [originalNotes, setOriginalNotes] = useState<Note[]>([]);
  const [sharedEmail, setSharedEmail] = useState("");
  const [selectedNode, setSelectedNode] = useState<Note | undefined>();
  const [showShareForm, setShowShareForm] = useState(false);

  const uniqueMaterii = Array.from(
    new Set(originalNotes.map((note) => note.materie))
  );
  const uniqueTags = Array.from(new Set(originalNotes.map((note) => note.tag)));
  let serviceNotes = new ServiceNotes();
  let { user, setUserCookie } = useContext(LoginContext) as LoginContextType;

  const location = useLocation();
  console.log(location);

  const selectedNote = location.state?.selectedNote as Note;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.id) {
          const notesData = await serviceNotes.getAllNotesByUser(user.id);
          const sortedNotes = [...notesData].sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          );
          setNotes(sortedNotes);
          setOriginalNotes(sortedNotes);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const handleBeforeUnload = async () => {
      await fetchData();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user]);

  useEffect(() => {
    setSelectedNode(selectedNote);
  }, [selectedNote]);

  const handleSortTitle = () => {
    const sortedNotes = [...notes].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setNotes(sortedNotes);
    setSortDropdownOpen(false);
  };

  const handleSortDate = () => {
    const sortedNotes = [...notes].sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt)
    );
    setNotes(sortedNotes);
    setSortDropdownOpen(false);
  };

  const handleSortUpdate = () => {
    const sortedNotes = [...notes]
      .filter((note) => note.updatedAt !== null)
      .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
    setNotes(sortedNotes);
    setSortDropdownOpen(false);
  };

  const handleFilterChange = (option: string) => {
    setSortBy(option);
    setFilterDropdownOpen(false);
  };

  const handlerNoteClick = (note: Note) => {
    setSelectedNode(note);
    setShowShareForm(true);
  };

  const handleShareNote = async () => {
    try {
      if (!selectedNode) {
        console.log("No note selected for sharing.");
        return;
      }

      const shareRequest: ShareRequest = {
        noteId: selectedNode.id,
        email: sharedEmail,
      };

      await serviceNotes.shareNote(shareRequest);

    } catch (error) {
      console.log(error);
    }
  };

  const handlerFilterOption = (tag: string) => {
    const filteredNotes =
      tag === "Toate"
        ? originalNotes
        : originalNotes.filter((note) => note.tag === tag);
    setNotes(filteredNotes);
    setFilterDropdownOpen(false);
  };

  const handlerFilterOptionMaterie = (materie: string) => {
    const filteredNotes =
      materie === "Toate"
        ? originalNotes
        : originalNotes.filter((note) => note.materie === materie);
    setNotes(filteredNotes);
    setFilterDropdownOpen(false);
  };

  return (
    <div className="sharedNotes">
      <div className="notes__content">
        <div className="notes__content__header">
          <FontAwesomeIcon
            className="navigation__leftBar__options__item__icon"
            icon={faNoteSticky}
          />
          <h1>Share your notes</h1>
        </div>
        <div className="notes__content__filters">
          <p className="notes__total">{notes.length} note(s)</p>

          <div className="content__filters__container">
            <div className="dropdown">
              <div
                className="dropdown__header"
                onClick={() => {
                  setSortDropdownOpen(!isSortDropdownOpen);
                  setFilterDropdownOpen(false);
                }}
              >
                <FontAwesomeIcon
                  className="navigation__leftBar__options__item__icon"
                  icon={faSort}
                />
              </div>
              {isSortDropdownOpen && (
                <div className="dropdown__options">
                  <span>Sort by : </span>
                  <div onClick={() => handleSortTitle()}>Title</div>
                  <div onClick={() => handleSortDate()}>Created Date</div>
                  <div onClick={() => handleSortUpdate()}>Updated Date</div>
                </div>
              )}
            </div>
            <div className="dropdown">
              <div
                className="dropdown__header"
                onClick={() => {
                  setFilterDropdownOpen(!isFilterDropdownOpen);
                  setSortDropdownOpen(false);
                }}
              >
                <FontAwesomeIcon
                  className="navigation__leftBar__options__item__icon"
                  icon={faFilter}
                />
              </div>

              {isFilterDropdownOpen && (
                <div className="dropdown__options">
                  <span>Select by : </span>
                  <select
                    value={sortBy === "materie" ? sortBy : ""}
                    onChange={(e) => handlerFilterOptionMaterie(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Selectează materie
                    </option>
                    <option value="Toate">Toate</option>
                    {uniqueMaterii.map((materie) => (
                      <option key={materie} value={materie}>
                        {materie}
                      </option>
                    ))}
                  </select>
                  <select
                    value={sortBy === "tag" ? sortBy : ""}
                    onChange={(e) => handlerFilterOption(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Selectează tag
                    </option>
                    <option value="Toate">Toate</option>
                    {uniqueTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="notes__content__notes">
          {notes.map((note, index) => (
            <NoteContainer note={note} onClick={() => handlerNoteClick(note)} />
          ))}
        </div>
      </div>

      <div className="notes__edit">
        {selectedNode && showShareForm && (
          <div className="sharedNotes__form">
            <h1>Share Note</h1>

            <NoteHome note={selectedNode} />

            <div className="sharedNotes__boxInput">
              <input
                type="email"
                placeholder="Enter email"
                value={sharedEmail}
                onChange={(e) => setSharedEmail(e.target.value)}
              />

              <button
                className="button__first button__firstSmall"
                onClick={()=>handleShareNote()}
              >
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedNotes;
