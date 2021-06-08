import React, { useState, useEffect, useCallback } from "react";
import { Button, PageLoader, Alert, Toastr } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";

import ContactsTable from "./ContactsTable";
import NewContactPane from "./NewContactPane";
import { contactsData, sortOptions } from "common/mock-data";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [deleteContactId, setDeleteContactId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [showNewContactPane, setShowNewContactPane] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    window.setTimeout(() => {
      setDeleting(false);
      Toastr.success("Contact deleted succssfully.");
      setShowDeleteAlert(false);
    }, 1000);
  };

  const onCLickDelete = useCallback(contactId => {
    setShowDeleteAlert(true);
    setDeleteContactId(contactId);
  }, []);

  useEffect(() => {
    window.setTimeout(() => {
      setLoading(false);
      setContacts(contactsData);
    }, 1000);
  });

  const fetchContacts = useCallback(newContact => {
    setLoading(true);
    newContact.id = contactsData.length + 1;
    contactsData.push(newContact);
    window.setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!showDeleteAlert && deleteContactId) setDeleteContactId(null);
  }, [showDeleteAlert]);

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Contacts"
        actionBlock={
          <Button
            onClick={() => setShowNewContactPane(true)}
            label="Add New Contact"
            icon="ri-add-line"
          />
        }
      />
      {contacts.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedContactIds.length,
            }}
            sortProps={{
              options: sortOptions,
              onClick: () => {},
            }}
            paginationProps={{
              count: contacts.length,
              pageNo: 1,
              pageSize: 10,
              navigate: () => {},
            }}
            toggleFilter={() => {}}
          />
          <ContactsTable
            selectedContactIds={selectedContactIds}
            setSelectedContactIds={setSelectedContactIds}
            contacts={contacts}
            onCLickDelete={onCLickDelete}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any contacts!"
          subtitle="Add your contacts to send customized emails to them."
          primaryAction={() => setShowNewContactPane(true)}
          primaryActionLabel="Add New Contact"
        />
      )}
      <NewContactPane
        showPane={showNewContactPane}
        setShowPane={setShowNewContactPane}
        fetchContacts={fetchContacts}
      />
      <Alert
        isOpen={showDeleteAlert}
        title={
          deleteContactId
            ? "Delete contact?"
            : `Delete ${selectedContactIds.length} contacts?`
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

export default Contacts;
