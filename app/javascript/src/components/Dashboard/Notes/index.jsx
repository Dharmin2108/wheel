import React, { useState, useEffect } from "react";
import notesApi from "apis/notes";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";

import NoteTable from "./NoteTable";
import NewNotePane from "./NewNotePane";
import DeleteAlert from "./DeleteAlert";

const sortOptions = [
  {
    value: "title",
    label: "Name",
  },
  {
    value: "created_at",
    label: "Date created",
  },
  {
    value: "dueDate",
    label: "Due date",
  },
];

const tags = [
  {
    tagTitle: "Internal",
    color: "blue",
  },
  {
    tagTitle: "Agile Workflow",
    color: "green",
  },
  {
    tagTitle: "Bug",
    color: "red",
  },
];

const contacts = ["Dharmin Patel", "Amit Patel", "Narendra Modi"];

const getRandomElement = array => {
  return array[Math.floor(Math.random() * array.length)];
};

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const [showNewNotePane, setShowNewNotePane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesApi.fetch();
      const notes = response.data.map((note, index) => {
        note.tag = getRandomElement(tags);
        note.contact = getRandomElement(contacts);
        if (index === 1) note.dueDate = "2021-08-08T09:04:02.849Z";

        return note;
      });
      setNotes(notes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Notes"
        actionBlock={
          <Button
            onClick={() => setShowNewNotePane(true)}
            label="Add New Note"
            icon="ri-add-line"
          />
        }
      />
      {notes.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedNoteIds.length,
            }}
            sortProps={{
              options: sortOptions,
              onClick: () => {},
            }}
            paginationProps={{
              count: notes.length,
              pageNo: 1,
              pageSize: 10,
              navigate: () => {},
            }}
            toggleFilter={() => {}}
          />
          <NoteTable
            selectedNoteIds={selectedNoteIds}
            setSelectedNoteIds={setSelectedNoteIds}
            notes={notes}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any notes!"
          subtitle="Add your notes to send customized emails to them."
          primaryAction={() => setShowNewNotePane(true)}
          primaryActionLabel="Add New Note"
        />
      )}
      <NewNotePane
        showPane={showNewNotePane}
        setShowPane={setShowNewNotePane}
        fetchNotes={fetchNotes}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedNoteIds={selectedNoteIds}
          onClose={() => setShowDeleteAlert(false)}
          refetch={fetchNotes}
        />
      )}
    </>
  );
};

export default Notes;
