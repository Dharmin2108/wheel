import React, { useState } from "react";
import { Modal, Toastr } from "neetoui";

export default function DeleteAlert({
  onClose,
  selectedContactIds,
  deleteContactId,
}) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    window.setTimeout(() => {
      setDeleting(false);
      Toastr.success("Contact deleted succssfully.");
      onClose();
    }, 1000);
  };
  return (
    <Modal
      isOpen
      size="small"
      autoHeight
      showFooter
      submitButtonProps={{
        style: "danger",
        label: "Continue anyway",
        loading: deleting,
        onClick: handleDelete,
      }}
      onClose={onClose}
    >
      <div className="flex">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-100 rounded-full">
          <i className="text-red-500 ri-alarm-warning-fill ri-lg"></i>
        </div>

        <div className="ml-4">
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            {deleteContactId
              ? `Delete Contact`
              : `Delete ${selectedContactIds.length} contacts?`}
          </h3>
          <div className="text-sm leading-5 text-gray-500">
            Are you sure you want to delete the Contact? All of your data will
            be permanently removed from our database forever. This action cannot
            be undone.
          </div>
        </div>
      </div>
    </Modal>
  );
}
