import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Select, Switch } from "neetoui/formik";
import { Button, Label, Toastr } from "neetoui";

const departmentOptions = [
  {
    label: "Engineering",
    value: "Engineering",
  },
  {
    label: "QA",
    value: "QA",
  },
  {
    label: "HR",
    value: "HR",
  },
];

export default function NewContactForm({ onClose, refetch }) {
  const handleSubmit = async values => {
    const data = {
      ...values,
      department: values.department.value,
    };
    Toastr.success("Contact added succssfully.");
    onClose();
    refetch(data);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        department: "",
        contactNumber: "",
        addToBasecamp: false,
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email().required("Email is required"),
        contactNumber: yup.string().required("Contact number is required"),
        department: yup.object().required("Department is required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input label="Name" name="name" className="mb-6" required />
          <Input label="Email" name="email" className="mb-6" required />
          <Input
            label="Contact Number"
            name="contactNumber"
            className="mb-6"
            required
          />
          <Select
            label="Department"
            placeholder="Select department"
            name="department"
            className="mb-6"
            options={departmentOptions}
            required
          />
          <div className="flex justify-between align-center">
            <Label>Add To Basecamp</Label>
            <Switch name="addToBasecamp" />
          </div>
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
