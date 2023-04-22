import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const getUser = (e) => {
    const { email, password } = user;
    // console.log(user, "dddddddd");
    if (email && password) {
      const url = `http://localhost:8080/api/v5/user/signin`;
      axios({
        method: "post",

        url: url,

        data: {
          email: email,

          password: password,
        },
      }).then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        navigate("/main");
      });
      //   const create = await axios.post(url, user);
      //   console.log(create, "userrrrr");
    } else {
      console.log("User Id or password is wrong");
    }
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.Login_container}>
        <div className={styles.Login_form_container}>
          <div className={styles.left}>
            <form
              className={styles.form_container}
              onSubmit={(e) => getUser(e)}
            >
              <h1>Login to Your Account</h1>
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
              <button type="submit" className={styles.green_btn}>
                Sign In
              </button>
            </form>
          </div>
          <div className={styles.right}>
            <h1>New User ?</h1>
            <Link to="/signup">
              <button type="button" className={styles.white_btn}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
