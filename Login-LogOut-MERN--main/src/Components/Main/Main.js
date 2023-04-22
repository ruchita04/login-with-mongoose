import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function Main() {
  const [userInfo, setUserInfo] = useState({
    file: [],
  });

  const navigate = useNavigate();

  const handelLogout = (e) => {
    localStorage.removeItem("token");
    // window.location.reload();
    navigate("/");
  };

  const handleChange = (e) => {
    setUserInfo({
      file: e.target.file,
    });
  };

  const submit = (e) => {
    const data = new data();
    data.append("avatar", data.file);

    axios
      .post(`http://localhost:8080/api/v5/user/signup`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <div className={styles.main_contaioner}>
        <nav className={styles.navbar}>
          <h1>Slipkart</h1>
          <button
            type="submit"
            className={styles.white_btn}
            onClick={handelLogout}
          >
            Logout
          </button>
        </nav>
      </div>

      <form>
        <div className={styles.form_group}>
          <label className={styles.lable}>Upload Your File: </label>
          <input
            type="file"
            className={styles.form_control_file}
            name="uploaded_file"
            onChange={handleChange}
          />
          <button type="submit" className={styles.green_btn}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Main;
