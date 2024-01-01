import React, { useState } from "react";
import styles from "./signup.module.css";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiKey = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY;
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialState = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  };
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setLoading(false);
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const hasEmptyValue = Object.values(state).some((value) => value === "");
    if (!hasEmptyValue) {
      try {
        let obj = {
          name: state.FirstName + " " + state.LastName,
          email: state.Email,
          password: state.Password,
          returnSecureToken: true,
        };
        setLoading(true);
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
          obj
        );

        if (response.status === 200) {
          navigate("/login");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error signing up:", error.message);
        alert("User is already Present");
      }
    } else {
      alert("Please fill all details.");
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.registration_main}>
        <div className={styles.centereddiv}>
          <span className={styles.icons}>
            <MdOutlinePersonAddAlt />
          </span>
        </div>
        <div className={styles.centereddiv}>
          <h3>Register</h3>
        </div>
        <div className="d-flex flex-column">
          <div className={styles.firstline}>
            <input
              className={styles.inputs1}
              name="FirstName"
              onChange={(e) => handleChange(e)}
              placeholder="First Name"
            />
            <input
              className={styles.inputs1}
              name="LastName"
              onChange={(e) => handleChange(e)}
              placeholder="Last Name"
            />
          </div>
          <input
            className={styles.inputs}
            name="Email"
            onChange={(e) => handleChange(e)}
            placeholder="Email Address"
          />
          <input
            className={styles.inputs}
            name="Password"
            onChange={(e) => handleChange(e)}
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="d-flex justify-content-end">
          <span>
            Already have account?
            <u onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
              {" "}
              Sign In
            </u>{" "}
            .
          </span>
        </div>
        <div className={styles.centereddiv}>
          <button className={styles.submitbtn} disabled={loading} onClick={() => handleSubmit()}>
         {loading?"Loading":"Sign Up"}   
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
