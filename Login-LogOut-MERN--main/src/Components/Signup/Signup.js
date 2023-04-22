import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const createUser = (e) => {
    const { fullName, email, password, confirmPassword } = user;
    if (fullName && email && password && password === confirmPassword) {
      const url = `http://localhost:8080/api/v5/user/signup`;
      axios({
        method: "post",

        url: url,

        data: {
          name: fullName,

          email: email,

          password: password,

          confirmPassword: password,
        },
      }).then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        navigate("/main");
      });
      //   const create = await axios.post(url, user);
      //   console.log(create, "userrrrr");
    } else {
      console.log("not posted");
    }
    e.preventDefault();
  };

  return (
    <>
      {/* {console.log(user)} */}
      <div className={styles.Signup_container}>
        <div className={styles.Signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <Link to="/">
              <button type="button" className={styles.white_btn}>
                Sign In
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form
              className={styles.form_container}
              onSubmit={(e) => createUser(e)}
            >
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                onChange={handleChange}
                value={user.fullName}
                required
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={user.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={user.password}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                value={user.confirmPassword}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
