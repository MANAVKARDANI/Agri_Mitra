import { useState } from "react";
import { Link } from "react-router-dom";
import registerImage from "./assets/register.png";

const styles={
  page:{
    fontFamily:"Inter, sans-serif",
    background:"#e5e7eb",
    minHeight:"100vh",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  card:{
    background:"#fff",
    borderRadius:"16px",
    boxShadow:"0 25px 50px -12px rgba(0,0,0,0.25)",
    display:"flex",
    width:"100%",
    maxWidth:"1200px",
    overflow:"hidden"
  },
  left:{
    width:"50%",
    background:"#166534",
    color:"#fff",
    padding:"40px"
  },
  center:{
    width:"50%",
    padding:"50px"
  },
  input:{
    width:"100%",
    padding:"12px",
    marginBottom:"15px",
    border:"1px solid #ccc",
    borderRadius:"8px",
    background:"#f3f4f6"
  },
  button:{
    width:"100%",
    padding:"12px",
    background:"#166534",
    color:"#fff",
    border:"none",
    borderRadius:"8px",
    cursor:"pointer"
  },
  image:{
    width:"100%",
    height:"100%",
    objectFit:"cover"
  }
};

export default function Register(){

  const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    businessName:"",
    password:""
  });

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Register:",formData);
  };

  return(

    <div style={styles.page}>

      <div style={styles.card}>

        <div style={styles.left}>
          <h2>AGRI-MITRA</h2>
          <h1 style={{marginTop:"40px"}}>10k+ Farmers</h1>
          <p>Using real-time fertilizer stock alerts</p>
        </div>

        <div style={styles.center}>

          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name="businessName"
              placeholder="Farm / Business Name"
              value={formData.businessName}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />

            <button style={styles.button}>
              Create Account
            </button>

          </form>

          <p style={{marginTop:"20px"}}>
            Already a member?{" "}
            <Link to="/">Login</Link>
          </p>

        </div>

      </div>

    </div>

  );
}