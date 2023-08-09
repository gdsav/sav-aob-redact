import { useState, useEffect } from "react";
import React from "react";
import "../../index.css";
import "./table.css";

import { IAzureToken } from "../../api/interfaces/IAzureToken";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function SaviyntShowApprovals() {
  const [token, setToken] = useState<IAzureToken>();
  const [show, setShow] = useState(false);
  const [newDate, setNewDate] = useState<Date>();

  const location = useLocation();
  const navigate = useNavigate();

  const getAnotherDate = () => { 

    var d = newDate;
    if (newDate != undefined) { 
      d?.setDate(newDate.getDate()-2);
      return d?.toLocaleString();
    }
    
    return undefined;
  };

  useEffect(() => {
    const now :Date = new Date();
    setNewDate(now);
    console.log("retrieving");
    const myToken = location.state;
    setToken(myToken);
  }, []);

  const toNextStep = () => {
    navigate("/azure/registered-app/step3", { state: token });
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
                     Saviynt Approvals
                  </span>
                  </td>
                  <td>
                  <Button className="saviynt-button" onClick={toNextStep}>Next</Button>
                  </td>
                </tr>
                <td>
                  &nbsp;
                </td>
                <tr>
                  <td>
                    <div className="div-table" style={{width:"1000px"}}>
                       <div className="div-table-row" >
                        <div className="div-table-col" style={{paddingLeft:60, width:"300px",  fontWeight:500}} >
                          Request ID
                        </div>
                        <div className="div-table-col"style={{paddingLeft:10, width:"300px", fontWeight:500}} >
                            Approver
                        </div>
                      </div>
                      <div className="div-table-row">
                        &nbsp;
                      </div>
                      <div className="div-table-row" >
                        <div className="div-table-col" style={{paddingLeft:60, width:"300px"}} >
                          <input type="radio" name="requestKey" value="100"/>&nbsp;19004
                        </div>
                        <div className="div-table-col"style={{paddingLeft:10, width:"300px"}} >
                          Andrew Whelchel
                        </div>
                        <div className="div-table-col"style={{paddingLeft:10, width:"300px"}} >
                          Approved { newDate?.toLocaleString()}
                        </div>
                      </div>
                      <div className="div-table-row" >
                        <div className="div-table-col"style={{paddingLeft:60, width:"300px"}} >
                            <input type="radio" name="requestKey" value="200"/>&nbsp;21515 
                        </div>
                        <div className="div-table-col"style={{paddingLeft:10, width:"300px"}} >
                            Arun Singh
                        </div>
                        <div className="div-table-col"style={{paddingLeft:10, width:"300px"}} >
                          Approved {  getAnotherDate() }
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div style={{padding:50,fontSize:"12px", fontWeight:200,color:"black"}}>
                Please make a selection and click the <span style={{color:"#0060FF"}}>Next</span> button to continue.
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
