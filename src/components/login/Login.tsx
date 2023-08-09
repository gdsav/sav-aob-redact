import React, { useState } from "react";

import "./Login.css";

import { ICredentials } from "./types/ICredentials";
import { ISaviyntToken } from "./types/ISaviyntToken";
import logo from '../../assets/saviynt-app-logo.png';

type Props = {
  setToken: any;
};

const Login: React.FC<Props> = ({ setToken }) => {

  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function loginUser(credentials: ICredentials) {
    return fetch("http://localhost:8080/saviynt/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const creds: ICredentials = {
      username: username,
      password: password,
    };

    const token: ISaviyntToken = await loginUser(creds);

    setToken(token);

    console.log("token=" + token);
    
  };

  return (
    <div style={{backgroundColor: "white"}}>
      <div style={{ backgroundColor: "white", paddingLeft:"50" }}>
        <img style={{width:"150px", paddingLeft: 50}} src={logo} alt="Saviynt Logo"/>
        <span style={{ paddingTop: 75,paddingLeft:"25px", fontSize:'8pt' }}>
          Please Log In
        </span>
        <div
          style={{
            paddingLeft: 50,
            paddingTop: 25,
            fontSize: "14px",
            height: "500px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <label style={{padding: 10}}>
              <p style={{fontWeight: 500}}>Username</p>
              <input
                style={{ border: "1px solid black", backgroundColor:"whitesmoke"}}
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserName(e.currentTarget.value)
                }
              />
            </label>
            <br/>
            <label style={{padding: 10}}>
              <p style={{fontWeight: 500}}>Password</p>
              <input
                style={{ border: "1px solid black", backgroundColor:"whitesmoke"}}
                type="password" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </label>
            <br/>
            <div style={{padding:10}}>
              <button className= "saviynt-button" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
