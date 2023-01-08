import React, { useState } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
/* eslint-disable react/no-unescaped-entities */
import styles from "../styles/Home.module.css";
import PriceCard from "./PriceCard";

const MyForm = () => {
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const [value, setValue] = useState(field.value);

    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>

        <input
          className="text-input"
          {...field}
          {...props}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            field.onChange(event);
            console.log(event.target.value);
          }}
        />

        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const MyDateInput = ({ label, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    // const [startDate, setStartDate] = useState(new Date("1990-01-01"));
    // const onChange = (date) => {
    //   setStartDate(date);
    // };

    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>

        <DatePicker
          {...field}
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const router = useRouter();

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
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          date: "",
          time: "",
          birthLocation: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()

            .max(25, "Must be 25 characters or less")

            .required("Required"),

          lastName: Yup.string()

            .max(30, "Must be 30 characters or less")

            .required("Required"),

          email: Yup.string()

            .email("Invalid email address")

            .required("Required"),

          date: Yup.date()
            .typeError("please enter a valid date")
            .required("Required"),

          time: Yup.string().required("Required"),
          birthLocation: Yup.string()

            .max(150, "Must be 150 characters or less")

            .required("Required"),
        })}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          console.log(values.firstName);
          const sendDataToCheckout = async () => {
            try {
              const response = await axios.post(
                "/api/create-checkout-session",
                {
                  name: `${values.firstName} ${values.lastName}`,
                  email: values.email,
                  date: values.date,
                  time: values.time,
                  birthLocation: values.birthLocation,
                }
              );
              console.log("hyyyyy" + response.data);
              router.push(response.data);
            } catch (error) {
              console.error(error);
            }
          };
          sendDataToCheckout();
        }}
      >
        <Form>
          {/* Buy product:
      <button onClick={handleBuy}>BUY!</button>
      <button onClick={handleCustomerPortal}>Customer Portal</button>
      <button onClick={handleGetUsers}>Get Users</button> */}
          {/* <h1>Subscribe!</h1> */}
          <div
            style={{
              marginBottom: "10rem",
              padding: "1rem",
              boxShadow: "0 0 20px gray",
            }}
            className="container text-center border"
          >
            <PriceCard />

            <div className="row">
              <div className="col">
                <MyTextInput
                  className={styles.borderRadius}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />{" "}
              </div>
              <div className="col">
                <MyTextInput
                  className={styles.borderRadius}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />{" "}
              </div>
            </div>
            {/* <div className="row"> */}
            <MyTextInput
              className={styles.borderRadius}
              name="email"
              type="email"
              placeholder="Email"
            />
            {/* </div> */}
            <div>
              <MyTextInput
                className={styles.borderRadius}
                name="birthLocation"
                type="text"
                placeholder="Birth Location"
                style={{ marginTop: "1rem" }}
              />{" "}
            </div>
            <div>
              <p style={{ marginBottom: "2px", marginTop: "1rem" }}>
                Birth Date
              </p>
              <MyDateInput
                className={styles.borderRadius}
                name="date"
                id="date"
                dateFormat="yyyy/MM/dd"
              />
            </div>
            <div>
              <p style={{ marginBottom: "2px", marginTop: "1rem" }}>
                Time of Birth
              </p>
              <MyTextInput
                className={styles.borderRadius}
                name="time"
                type="time"
                placeholder="jane@formik.com"
              />
            </div>

            <div className="">
              <button className={styles.myBtn} type="submit">
                Subscribe Now!
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MyForm;
