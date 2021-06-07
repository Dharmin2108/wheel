import React from "react";
import { Checkbox, Badge, Avatar, Button, Tooltip } from "neetoui";
import dayjs from "dayjs";

function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
  onCLickDelete,
}) {
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox nui-table--hover nui-table--actions">
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
            <th>Title</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Created Date</th>
            <th>Due Date</th>
            <th>Contact</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note.id} className={""}>
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
                {dayjs(note.created_at).format("MMM DD,YYYY")}
              </td>
              <td className="text-center">
                {note.dueDate
                  ? dayjs(note.dueDate).format("MMM DD,YYYY")
                  : "--"}
              </td>
              <td className="text-center">
                <div className="flex flex-row items-center justify-center">
                  <Avatar size={36} contact={{ name: note.contact }} />
                </div>
              </td>
              <td>
                <div className="flex flex-row space-x-4 items-center">
                  <Tooltip content="Edit" position="bottom">
                    <Button style="icon" icon="ri-pencil-line" />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button
                      onClick={() => onCLickDelete(note.id)}
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

export default React.memo(NoteTable);
