import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
/* eslint-disable react/no-unescaped-entities */
const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]

  // which we can spread on <input>. We can use field meta to show an error

  // message if the field is invalid and it has been touched (i.e. visited)

  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>

      <input className="text-input" {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.

  // Formik does this too! When you specify `type` to useField(), it will

  // return the correct bag of props for you -- a `checked` prop will be included

  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`

  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />

        {children}
      </label>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>

      <select {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyForm = () => {
  const [startDate, setStartDate] = useState(new Date("1990-01-01"));

  const MyDateInput = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const router = useRouter();

  const handleBuy = async () => {
    try {
      const response = await axios.post("/api/create-checkout-session");
      console.log("hyyyyy" + response.data);
      router.push(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function handleCustomerPortal() {
    try {
      const response = await axios.post("/api/customer-portal");
      console.log("hyyyyy" + response.data);
      router.push(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //get users
  async function handleGetUsers() {
    try {
      const response = await axios.get("/api/userController");
      console.log("hyyyyy" + response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      Buy product:
      <button onClick={handleBuy}>BUY!</button>
      <button onClick={handleCustomerPortal}>Customer Portal</button>
      <button onClick={handleGetUsers}>Get Users</button>
      <>
        <h1>Subscribe!</h1>

        <Formik
          initialValues={{
            firstName: "",

            lastName: "",

            email: "",

            acceptedTerms: false, // added for our checkbox

            jobType: "", // added for our select
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()

              .max(15, "Must be 15 characters or less")

              .required("Required"),

            lastName: Yup.string()

              .max(20, "Must be 20 characters or less")

              .required("Required"),

            email: Yup.string()

              .email("Invalid email address")

              .required("Required"),

            acceptedTerms: Yup.boolean()

              .required("Required")

              .oneOf([true], "You must accept the terms and conditions."),

            jobType: Yup.string()

              .oneOf(
                ["designer", "development", "product", "other"],

                "Invalid Job Type"
              )

              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));

              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <MyTextInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Jane"
            />

            <MyTextInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Doe"
            />

            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />

            <MySelect label="Job Type" name="jobType">
              <option value="">Select a job type</option>

              <option value="designer">Designer</option>

              <option value="development">Developer</option>

              <option value="product">Product Manager</option>

              <option value="other">Other</option>
            </MySelect>

            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>
            <MyDateInput
              label="Date"
              name="date"
              id="date"
              dateFormat="yyyy/MM/dd"
            />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </>
    </div>
  );
};

export default MyForm;
