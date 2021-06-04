import React from "react";
import { Checkbox, Badge, Avatar, Button, Tooltip } from "neetoui";
import moment from "moment";

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
}) {
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedNoteIds.length === notes.map(note => note.id).length
                }
                onClick={() => {
                  const noteIds = notes.map(note => note.id);
                  if (selectedNoteIds.length === noteIds.length) {
                    setSelectedNoteIds([]);
                  } else {
                    setSelectedNoteIds(noteIds);
                  }
                }}
              />
            </th>
            <th className="text-left text-gray-400">Title</th>
            <th className="text-left text-gray-400">Description</th>
            <th className="text-center text-gray-400">Tags</th>
            <th className="text-center text-gray-400">Created Date</th>
            <th className="text-center text-gray-400">Due Date</th>
            <th className="text-center text-gray-400">Contact</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr
              key={note.id}
              className={"group cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedNoteIds.includes(note.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedNoteIds.indexOf(note.id);

                    if (index > -1) {
                      setSelectedNoteIds([
                        ...selectedNoteIds.slice(0, index),
                        ...selectedNoteIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedNoteIds([...selectedNoteIds, note.id]);
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex flex-row items-center justify-start text-gray-900">
                  <a>{note.title}</a>
                </div>
              </td>
              <td className="max-w-0 truncate">{note.description}</td>
              <td className="text-center">
                <Badge color={note.tag.color} size="small">
                  {note.tag.tagTitle}
                </Badge>
              </td>
              <td className="text-center">
                {moment(note.created_at).format("MMM DD,YYYY")}
              </td>
              <td className="text-center">
                {note.dueDate
                  ? moment(note.dueDate).format("MMM DD,YYYY")
                  : "--"}
              </td>
              <td className="text-center">
                <div className="flex flex-row items-center justify-center">
                  <Avatar size={36} contact={{ name: note.contact }} />
                </div>
              </td>
              <td>
                <div className="group-hover:opacity-100 opacity-0 flex flex-row space-x-4 items-center">
                  <Tooltip content="Edit" position="bottom">
                    <Button style="icon" icon="ri-pencil-line" />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button style="icon" icon="ri-delete-bin-line" />
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
