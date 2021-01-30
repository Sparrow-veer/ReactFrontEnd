import React,{useState} from "react";
//import {randomBytes} from ("crypto");
import './App.css';
import axios from "axios";

function App() {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [outcome,setoutcome]=useState("");
  var login=async ()=>{
    const res =await axios.post("http://localhost:4000/login",{email,password});
    console.log(res.data);
    setoutcome(res.data);
  }
  return (
    <div>
    <div>
    <h1>Login</h1><br></br>
    <input placeholder="Email" onChange={(event)=>{setemail(event.target.value)}}></input><br></br>
    <input type="password" placeholder="password"  onChange={(event)=>{setpassword(event.target.value)}}></input><br></br>
    <br></br><button onClick={login}>Submit</button>
    </div>

   

    {outcome ? (outcome.title==="Employee")? <div><h3>Profile</h3><p>Name:{outcome.details[0].name}</p><p>Email:{outcome.details[0].email}</p>
    <p>Role:{outcome.details[0].role}</p></div>:null :null}
    {outcome ? (outcome.title==="Admin")? <div><h3>User Details</h3><table class="center" border="1px solid black"><tbody><tr><th>Name</th><th>Email</th><th>Role</th></tr>
    {outcome.details.map((detail)=>{
      return <tr key={detail.id}><th>{detail.name}</th><th>{detail.email}</th><th>{detail.role}</th></tr>
    })}
    </tbody></table></div>:null:null}
    {outcome ? (outcome.title==="BadUser")?<div><p>401 Unauthorized</p><br></br><h5>{outcome.message}</h5></div>:null:null}
    </div>

  );
}

export default App;
