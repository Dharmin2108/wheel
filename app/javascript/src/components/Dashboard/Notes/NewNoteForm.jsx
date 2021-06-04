import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { Input, Textarea, Select } from "neetoui/formik";
import { Button, Label, Switch, DateInput } from "neetoui";
import notesApi from "apis/notes";

const tagOptions = [
  {
    label: "Internal",
    value: "internal",
  },
  {
    label: "Agile Workflow",
    value: "agileWorkflow",
  },
  {
    label: "Bug",
    value: "bug",
  },
];

const contactOptions = [
  {
    label: "Dharmin Patel",
    value: "Dharmin Patel",
  },
  {
    label: "Dhaval Patel",
    value: "Dhaval Patel",
  },
  {
    label: "Amit Patel",
    value: "Amit Patel",
  },
];

export default function NewNoteForm({ onClose, refetch }) {
  const [addDueDate, setAddDueDate] = useState(false);
  const handleSubmit = async values => {
    try {
      await notesApi.create(values);
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        tag: "",
        contact: "",
        dueDate: null,
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        tag: yup.object().required("Tag is required"),
        contact: yup.object().required("Contact is required"),
      })}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <Input label="Note Title" name="title" className="mb-6" required />
          <Select
            label="Tag"
            placeholder="Select tag"
            name="tag"
            className="mb-6"
            options={tagOptions}
            required
          />
          <Textarea
            className="mb-6"
            label="Note Description"
            name="description"
            rows={4}
            required
          />
          <Select
            label="Assigned Contact"
            placeholder="Select contact"
            name="contact"
            className="mb-6"
            options={contactOptions}
            required
          />
          <div className="flex justify-between mb-6">
            <Label>Add Due Date to Note</Label>
            <Switch
              name="duedate-switch"
              checked={addDueDate}
              onChange={event => {
                setAddDueDate(event.target.checked);
                if (!event.target.checked) {
                  setFieldValue("dueDate", null);
                } else {
                  setFieldValue("dueDate", new Date());
                }
              }}
            />
          </div>
          {addDueDate && (
            <div>
              <Label>Due Date</Label>
              <Field name="dueDate">
                {() => (
                  <DateInput
                    format="DD-MM-YYYY"
                    defaultValue={new Date()}
                    onChange={value => setFieldValue("dueDate", value)}
                    placeholder="Select due date"
                    canClearSelection={false}
                  />
                )}
              </Field>
            </div>
          )}
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />

            <Button
              type="submit"
              label="Submit"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
