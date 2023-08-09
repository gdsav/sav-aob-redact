import { useState, useEffect } from "react";
import "../../index.css";

import { IAzureToken } from "../../api/interfaces/IAzureToken";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function AzureShowRegisteredAppToken() {
  const [token, setToken] = useState<IAzureToken>();
  const [show, setShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("retrieving state " + JSON.stringify(location.state));
    const api = async () => {
      const data = await fetch("http://localhost:8080/az/getToken", {
        method: "GET",
      });
      const jsonData = await data.json();
      setToken(jsonData);
    };
    api();
  }, []);

  
  const toNextStep = () => {
    navigate("/azure/registered-app/step2", { state: token });
  };

  return (
    <div>
      <div className="page-breadcrumb" />
      <div className="d-flex flex-column page-container"></div>
      <div className="porlet box blue col" />
      <div className="row">
        <div className="col-md-12">
          <div className="caption">MS Azure Registered App</div>
          <div className="page-breadcrumb" />
          <div className="header-row">
            <div className="header-column">
              <br/>
              <table>
                <tbody>
                <tr>
                  <td>
                  <span className="caption">
                     Registered Application Instantiation
                  </span>
                  </td>
                  <td>
                  <Button className="saviynt-button" onClick={toNextStep}>Next</Button>
                  </td>
                </tr>
                </tbody>
              </table>
              <div style={{padding:50,fontSize:"12px", fontWeight:200,color:"black"}}>
                Welcome to the Registered Application Instantiaion workflow.  You are about to 
                instantiate an application from the Microsoft Azure Registered Application 
                catalog.  

                <p style={{paddingTop:15}}>
                  The next few screens will prompt you for the Registerd Application 
                  that you will use, instantiate the application, and redirect you to Saviynt to 
                  connect to the workflow.
                </p>

                Please click the <span style={{color:"#0060FF"}}>Next</span> button to continue.
              </div>
              <br />
            </div>
          </div>
          <br />
          <div style={{ paddingLeft: 50, fontSize: "12px" }}>
            <br />
            <div style={{ paddingTop: 50 }}>
              <Button
                className="saviynt-button"
                style={{ fontWeight: "10px" }}
                onClick={() => setShow(!show)}
              >
                Azure Token
              </Button>
            </div>

            {show === true ? (
              <div>
                <div style={{fontWeight:500,paddingTop:10,fontSize:"10px"}}>Azure Access Token</div>
                <div>
                  <pre>
                  {JSON.stringify(token,null,4)}
                  </pre>
                </div>
              </div>
           ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
