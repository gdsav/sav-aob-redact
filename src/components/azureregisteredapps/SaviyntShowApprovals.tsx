import { useState, useEffect } from "react";
import React from "react";
import "../../index.css";
import "./table.css";

import { IAzureToken } from "../../api/interfaces/IAzureToken";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ISaviyntToken } from "../login/types/ISaviyntToken";
import { ISaviyntRequests } from "../../api/interfaces/ISaviyntRequests";
import { ISaviyntRequest } from "../../api/interfaces/ISaviyntRequest";

type Props = {
    savToken: ISaviyntToken;
  };

export const SaviyntShowApprovals : React.FC<Props> = ({ savToken }) => {

  const [token, setToken] = useState<IAzureToken>();
  const [show, setShow] = useState(false);
  const [newDate, setNewDate] = useState<Date>();
  const [data, setData] = useState<Array<ISaviyntRequest>>();

  const location = useLocation();
  const navigate = useNavigate();

  const getAnotherDate = () => {
    var d = newDate;
    if (newDate != undefined) {
      d?.setDate(newDate.getDate() - 2);
      return d?.toLocaleString();
    }

    return undefined;
  };

  /*
  function process(inData: ISaviyntRequests) : [ISaviyntRequest]{
    const requests : [ISaviyntRequest] = inData.requests;

    const newReqs = requests.filter((item:ISaviyntRequest) => { 
        return item.endpointname === 'Azure AD Army';
    })
    
    return newReqs;
  }*/

  useEffect(() => {
    const now: Date = new Date();
    setNewDate(now);
    console.log("retrieving");
    const myToken = location.state;
    setToken(myToken);

    const api = async () => {
      const data  = await fetch("http://localhost:8080/saviynt/getRequests", {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + savToken.access_token,
          "Content-Type": "application/json",
          username: savToken.username,
        }),
      });
      const jsonData : ISaviyntRequests = await data.json();
      console.log("retreived : " + jsonData);
      //const newJsonData = process(jsonData);\
      const newReqs : Array<ISaviyntRequest> = jsonData.requests.filter((item:ISaviyntRequest) => { 
        return item.endpointname === 'Azure AD Army';
    })
      setData(newReqs);
      console.log("now have " + newReqs);
    };
    api();
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
              <br />
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span className="caption">Saviynt Approvals ...</span>
                    </td>
                    <td>
                      <Button className="saviynt-button" onClick={toNextStep}>
                        Next
                      </Button>
                    </td>
                  </tr>
                  <td>&nbsp;</td>
                  <tr>
                    <td>
                      <div className="div-table" style={{ width: "1000px" }}>
                        <div className="div-table-row">
                          <div
                            className="div-table-col"
                            style={{
                              paddingLeft: 60,
                              width: "150px",
                              fontWeight: 400,
                            }}
                          >
                            Request ID
                          </div>
                          <div
                            className="div-table-col"
                            style={{
                              paddingLeft: 10,
                              width: "150px",
                              fontWeight: 400,
                            }}
                          >
                            Application Name
                          </div>
                          <div
                            className="div-table-col"
                            style={{
                              paddingLeft: 10,
                              width: "150px",
                              fontWeight: 400,
                            }}
                          >
                            Endpoint
                          </div>
                          <div
                            className="div-table-col"
                            style={{
                              paddingLeft: 10,
                              width: "150px",
                              fontWeight: 400,
                            }}
                          >
                            Submitted
                          </div>
                          <div
                            className="div-table-col"
                            style={{
                              paddingLeft: 10,
                              width: "150px",
                              fontWeight: 400,
                            }}
                          >
                            Submitter
                          </div>
                          <div
                            className="div-table-col"
                            style={{
                              paddingLeft: 10,
                              width: "150px",
                              fontWeight: 400,
                            }}
                          >
                            Status
                          </div>
                        </div>
                        <div className="div-table-row">&nbsp;</div>
                        {
                          data?.map((item : ISaviyntRequest) => 
                          <div className="div-table-row">
                          <div
                            className="div-table-col"
                            style={{ paddingLeft: 60, width: "150px", fontSize:"14px" }}
                          >
                            {
                                (item.requestandtaskstatus.includes("pending" )) ? 
                                   (<input type="radio" name="requestKey" value={item.reqkey} disabled={true} checked={false}/>)
                                :
                                   (<input type="radio" name="requestKey" value={item.reqkey} />)
                            }
                            &nbsp; { item.requestid }
                          </div>
                          <div
                            className="div-table-col"
                            style={{ paddingLeft: 10, width: "150px", fontSize:"14px" }}
                          >
                            { item.displayname }
                          </div>
                          <div
                            className="div-table-col"
                            style={{ paddingLeft: 10, width: "150px", fontSize:"14px" }}
                          >
                            { item.endpointname }
                          </div>
                          <div
                            className="div-table-col"
                            style={{ paddingLeft: 10, width: "150px", fontSize:"14px" }}
                          >
                            { item.requestsubmittedon }
                          </div>
                          <div
                            className="div-table-col"
                            style={{ paddingLeft: 10, width: "150px", fontSize:"14px" }}
                          >
                            { item.requestor }
                          </div>

                          {
                                (item.requestandtaskstatus.includes("pending" )) ? 
                                   (
                                    <div
                                    className="div-table-col"
                                    style={{ paddingLeft: 10, color:"red", width: "150px", fontSize:"14px" }}
                                    >
                                    { item.requestandtaskstatus }
                                    </div>
                                   )
                                :
                                    (
                                        <div
                                        className="div-table-col"
                                        style={{ paddingLeft: 10, width: "150px", fontSize:"14px" }}
                                        >
                                        { item.requestandtaskstatus }
                                        </div>
                                   )
                            }

                        </div>)
                        }               
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                style={{
                  padding: 50,
                  fontSize: "12px",
                  fontWeight: 200,
                  color: "black",
                }}
              >
                Please make a selection and click the{" "}
                <span style={{ color: "#0060FF" }}>Next</span> button to
                continue.
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
                Debug
              </Button>
            </div>

            {show === true ? (
              <div>
                <div
                  style={{ fontWeight: 500, paddingTop: 10, fontSize: "10px" }}
                >
                  Saviynt Requests
                </div>
                <div>
                  <pre>{JSON.stringify(data, null, 4)}</pre>
                </div>
              </div>
            ) : null}
          </div>
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
                <div
                  style={{ fontWeight: 500, paddingTop: 10, fontSize: "10px" }}
                >
                  Azure Access Token
                </div>
                <div>
                  <pre>{JSON.stringify(token, null, 4)}</pre>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
