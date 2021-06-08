import React, { useState, useEffect, useCallback } from "react";
import notesApi from "apis/notes";
import { Button, PageLoader, Alert } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";

import NoteTable from "./NoteTable";
import NewNotePane from "./NewNotePane";
import { noteSortOptions, tags, contacts } from "common/mock-data";

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
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await notesApi.destroy({
        ids: deleteNoteId ? deleteNoteId : selectedNoteIds,
      });
      setShowDeleteAlert(false);
      fetchNotes();
    } catch (error) {
      logger.error(error);
    } finally {
      setDeleting(false);
    }
  };

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

  const onCLickDelete = useCallback(noteId => {
    setShowDeleteAlert(true);
    setDeleteNoteId(noteId);
  }, []);

  useEffect(() => {
    if (!showDeleteAlert && deleteNoteId) setDeleteNoteId(null);
  }, [showDeleteAlert]);

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
              options: noteSortOptions,
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
            onCLickDelete={onCLickDelete}
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
      <Alert
        isOpen={showDeleteAlert}
        title={
          deleteNoteId
            ? "Delete note?"
            : `Delete ${selectedNoteIds.length} notes?`
        }
        message="All of your data will be permanently removed from our database forever. This action cannot be undone."
        onClose={() => setShowDeleteAlert(false)}
        submitButtonProps={{
          onClick: handleDelete,
          loading: deleting,
        }}
      />
    </>
  );
};

export default Notes;
