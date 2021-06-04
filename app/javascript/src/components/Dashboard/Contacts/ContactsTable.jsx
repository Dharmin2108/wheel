import React from "react";
import { Checkbox, Avatar, Button, Tooltip } from "neetoui";

function ContactsTable({
  selectedContactIds,
  setSelectedContactIds,
  contacts = [],
  onCLickDelete,
}) {
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedContactIds.length ===
                  contacts.map(contact => contact.id).length
                }
                onClick={() => {
                  const contactIds = contacts.map(contact => contact.id);
                  if (selectedContactIds.length === contactIds.length) {
                    setSelectedContactIds([]);
                  } else {
                    setSelectedContactIds(contactIds);
                  }
                }}
              />
            </th>
            <th className="text-left text-gray-400">Name</th>
            <th className="text-left text-gray-400">Email</th>
            <th className="text-center text-gray-400">Department</th>
            <th className="text-center text-gray-400">Contact Number</th>
            <th className="text-center text-gray-400">Add To Basecamp</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr
              key={contact.id}
              className={"group cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedContactIds.includes(contact.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedContactIds.indexOf(contact.id);

                    if (index > -1) {
                      setSelectedContactIds([
                        ...selectedContactIds.slice(0, index),
                        ...selectedContactIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedContactIds([
                        ...selectedContactIds,
                        contact.id,
                      ]);
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex flex-row items-center justify-start text-gray-900">
                  <Avatar
                    className="mr-4"
                    size={36}
                    contact={{ name: contact.name }}
                  />
                  {contact.name}
                </div>
              </td>
              <td>{contact.email}</td>
              <td className="text-center">{contact.department}</td>
              <td className="text-center">{contact.contactNumber}</td>
              <td>
                <div className="flex flex-row items-center justify-center">
                  <input
                    name="add-to-basecamp"
                    type="checkbox"
                    className="nui-checkbox"
                    checked={contact.addToBasecamp}
                  />
                </div>
              </td>
              <td>
                <div className="group-hover:opacity-100 opacity-0 flex flex-row space-x-4 items-center">
                  <Tooltip content="Edit" position="bottom">
                    <Button style="icon" icon="ri-pencil-line" />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button
                      onClick={() => onCLickDelete(contact.id)}
                      style="icon"
                      icon="ri-delete-bin-line"
                    />
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(ContactsTable);
