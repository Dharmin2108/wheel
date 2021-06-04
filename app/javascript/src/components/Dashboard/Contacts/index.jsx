import React, { useState, useEffect, useCallback } from "react";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";

import ContactsTable from "./ContactsTable";
import DeleteAlert from "./DeleteAlert";
import NewContactPane from "./NewContactPane";

const sortOptions = [
  {
    value: "title",
    label: "Name",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "department",
    label: "Department",
  },
];

const contactsData = [
  {
    id: 1,
    name: "Dharmin Patel",
    email: "dharmin@bigbinary.com",
    department: "Engineering",
    contactNumber: "9979655572",
    addToBasecamp: false,
  },
  {
    id: 2,
    name: "Hetali Patel",
    email: "hetali@gmail.com",
    department: "QA",
    contactNumber: "9979655572",
    addToBasecamp: true,
  },
];

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [deleteContactId, setDeleteContactId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [showNewContactPane, setShowNewContactPane] = useState(false);

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
      {showDeleteAlert && (
        <DeleteAlert
          selectedContactIds={selectedContactIds}
          onClose={() => setShowDeleteAlert(false)}
          deleteContactId={deleteContactId}
        />
      )}
    </>
  );
};

export default Contacts;
