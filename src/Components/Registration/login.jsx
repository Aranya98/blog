import React, { useState } from "react";
import styles from "./login.module.css";
import { MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  useDispatch } from "react-redux";
import { Islogin } from "../../Store/reducer";
const apiKey = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initialState = {
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
        //  const auth = getAuth();
        //     await signInWithEmailAndPassword(auth,state.Email, state.Password);
        //  navigate("/")
        let obj = {
          email: state.Email,
          password: state.Password,
          returnSecureToken: true,
          displayName: true,
        };
        setLoading(true);
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
          obj
        );

        if (response.status === 200) {
          setLoading(false);
          sessionStorage.setItem("username", response.data.email);
          navigate("/");
          dispatch(Islogin(true))
        }
        // User created successfully
      } catch (error) {
        setLoading(false);
        console.error("Error signing In:", error.message);
        alert("Invalid Login Credentials");
      }
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.registration_main}>
        <div className={styles.centereddiv}>
          <span className={styles.icons}>
            <MdLock />
          </span>
        </div>
        <div className={styles.centereddiv}>
          <h3>Sign In</h3>
        </div>
        <div className="d-flex flex-column">
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
            Don't have account?
            <u
              onClick={() => navigate("/signup")}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Sign Up
            </u>{" "}
            .
          </span>
        </div>
        <div className={styles.centereddiv}>
          <button className={styles.submitbtn} disabled={loading} onClick={() => handleSubmit()}>
           {loading?"Loading":"Sign In"} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
