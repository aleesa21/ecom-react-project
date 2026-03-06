import { Link, useNavigate } from "react-router";
import "./Signup.css";
import { useState } from "react";
export default function Signup() {
  const navigate=useNavigate()
  let [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  let [formerrors, setFormerrors] = useState({
    nameerror: "",
    emailerror: "",
    pwerror: "",
    cpwerror: "",
  });
  function handleChange(e) {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }
  function registerValidate(e) {
    e.preventDefault()
    let errors = {
    nameerror: "",
    emailerror: "",
    pwerror: "",
    cpwerror: "",
  };
    console.log(formdata)
    if (!formdata.name) {
      errors.nameerror= "Name field cannot be empty" 
    } 
    else if(formdata.name.length<3){
      errors.nameerror="Name must be atleast 3 characters long"
    }
    else if(!/^[a-zA-Z\s]+$/.test(formdata.name)){
      errors.nameerror="Name can only contain letters"
    }
   

    if (!formdata.email) {
      errors.emailerror= "Email field cannot be empty" 
    } 
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email)){
      errors.emailerror="Enter a valid email address"
    }
   

    if(!formdata.password){
      errors.pwerror="password cannot be empty"
    }
    else if(formdata.password.length < 8){ 
      errors.pwerror="password must be of 8 characters"
    }
    else if(!/[A-Z]/.test(formdata.password)){
      errors.pwerror="Password must contain at least one uppercase letter"
    }
    else if(!/[0-9]/.test(formdata.password)){
      errors.pwerror="Password must contain at least one number";
    }
    else if(!/[!@#$%^&*]/.test(formdata.password)) {
    errors.pwerror = "Password must contain at least one special character (!@#$%^&*)";
  }

    if(!formdata.confirmpassword){
      errors.cpwerror="confirm password field cannot be empty"
    }
    else if (formdata.confirmpassword !== formdata.password) {
    errors.cpwerror = "Passwords do not match";
  }
     setFormerrors(errors);
      let hasError=Object.values(errors).some(error=>error!=="")
      if(!hasError){
        let users=JSON.parse(localStorage.getItem("users")) || []
        let emailExists=users.find(user=>user.email===formdata.email)
        if(emailExists){
          setFormerrors((prev)=>({
            ...prev,
            emailerror:"Email already registered"
          }))
          return
        }
        users.push({
          name:formdata.name,
          email:formdata.email,
          password:formdata.password
        })
        localStorage.setItem("users",JSON.stringify(users))
        alert("Registration Successful! Please Login.")
        navigate("/login")
      }
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
              <div className="register-text">Register</div>
              <div className="joinus-text">JOIN TO US</div>
            </div>
            <form onSubmit={registerValidate}>
            <div>
              <div className="form-group">
                <label htmlFor="name">Your name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`input ${formerrors.nameerror ? "input-border-red":""}`}
                  placeholder="John Doe"
                  onChange={handleChange}
                ></input>
              </div>
              {formerrors.nameerror && (
                <p className="error">{formerrors.nameerror}</p>
              )}
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`input ${formerrors.emailerror? "input-border-red":""}`}
                  placeholder="Example@gmail.com"
                  onChange={handleChange}
                ></input>
              </div>
              {formerrors.emailerror && (
                <p className="error">{formerrors.emailerror}</p>
              )}
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`input ${formerrors.pwerror?"input-border-red" :""}`}
                  placeholder="Min 8 chars,uppercase,number,symbol"
                  onChange={handleChange}
                ></input>
              </div>
              {formerrors.pwerror && (
                <p className="error">{formerrors.pwerror}</p>
              )}
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmpassword"
                  name="confirmpassword"
                  className={`input ${formerrors.cpwerror?"input-border-red":""}`}
                  placeholder="Repeat your password"
                  onChange={handleChange}
                ></input>
              </div>
              {formerrors.cpwerror && (
                <p className="error">{formerrors.cpwerror}</p>
              )}
            </div>
            <div className="bottom-signup-form">
              <button type="submit" className="register-btn">
                Register
              </button>
              <p>
                ALREADY USER ?{" "}
                <Link to="/login">
                  <span> LOGIN</span>
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
