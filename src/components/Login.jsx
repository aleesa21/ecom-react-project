import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Login() {
  const { login } = useContext(AuthContext);
  let navigate=useNavigate()
  let [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  let [formerrors, setFormerrors] = useState({
    emailerror: "",
    pwerror: "",
  });
  function handlechange(e) {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }
  function loginValidate(e) {
    e.preventDefault();
    let errors = {
      emailerror: "",
      pwerror: "",
    };
    if (!formdata.email) {
      errors.emailerror = "Email cannot be empty";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email)) {
      errors.emailerror = "Email must be in valid format";
    }
    if (!formdata.password) {
      errors.pwerror = "Password cannot be empty";
    }

    setFormerrors(errors);
    let hasError = Object.values(errors).some((error) => error !== "");
    if (!hasError) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      let emailExists=users.find(user=>user.email===formdata.email)
      if(!emailExists){
        setFormerrors((prev)=>({...prev,emailerror:"No account found with this email"}))
        return
      }
      let matchedUser = users.find(
        (user) =>
          user.email === formdata.email && user.password === formdata.password,
      );
      if(!matchedUser){
        setFormerrors((prev)=>({
          ...prev,
          password:"Incorrect Password"
        }))
        return
      }
      localStorage.setItem("loggedInUser",JSON.stringify(matchedUser))
      login(matchedUser)
      alert("Login Successful! Welcome back.")
      navigate("/")
    }

    console.log(formdata);
  }
  return (
    <>
      <div className="signup-container">
        <div className="signup-form">
          <div className="signup-img">
            <img src="login.svg.png" />
          </div>
          <div className="signup-card">
            <div className="top-signup-form">
              <div className="register-text">Welcome Back</div>
              <div className="joinus-text">LOGIN TO CONINUE</div>
            </div>
            <form onSubmit={loginValidate}>
              <div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="text"
                    className={`input ${formerrors.emailerror ? "input-border-red" : ""}`}
                    placeholder="Example@gmail.com"
                    name="email"
                    onChange={handlechange}
                  ></input>
                </div>
                {formerrors.emailerror && (
                  <p className="error">{formerrors.emailerror}</p>
                )}
              </div>
              <div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className={`input ${formerrors.pwerror ? "input-border-red" : ""}`}
                    placeholder="Your password"
                    onChange={handlechange}
                    name="password"
                  ></input>
                </div>
                {formerrors.pwerror && (
                  <p className="error">{formerrors.pwerror}</p>
                )}
              </div>

              <div className="bottom-signup-form">
                <button type="submit" className="register-btn">
                  Login
                </button>
                <p>
                  NEW USER ?{" "}
                  <Link to="/signup">
                    <span> SIGN UP</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
