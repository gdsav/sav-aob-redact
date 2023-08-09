import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import "../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { IAzureToken } from "../../api/interfaces/IAzureToken";
import { IAzureCatalog } from "../../api/interfaces/IAzureCatalog";
import { IAzureCatalogEntry } from "../../api/interfaces/IAzureCatalogEntry";
import { IAzureAppCreationInputs } from "../../api/interfaces/IAzureAppCreationInputs";
import { Img } from "react-image";

import { Link } from "react-router-dom";

//export function AzureShowCatalog(token: IAzureToken) {
export function AzureShowCatalog() {
  const [appTemplates, setAppTemplates] = useState<IAzureCatalog>();
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  var azureEntry: IAzureCatalogEntry;
  var azureToken: IAzureToken;

  const toNextStep = (myToken: IAzureToken, myEntry: IAzureCatalogEntry) => {
    const payload = {
      azureToken: myToken,
      azureEntry: myEntry,
    } as IAzureAppCreationInputs;

    console.log("payload=" + JSON.stringify(payload));
    navigate("/azure/enterprise-app/step3", { state: payload });
  };

  useEffect(() => {
    console.log("retrieving");
    const token = location.state;
    if (token != undefined) {
      //const api = async (accessToken: string) => {
      const api = async (accessToken: string) => {
        console.log("token " + token);
        const data = await fetch(
          "http://localhost:8080/az/listApplicationTemplates",
          {
            method: "GET",
            headers: new Headers({
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json",
            }),
          }
        );
        const jsonData = await data.json();
        const appList = {} as IAzureCatalog;
        appList.odataContext = jsonData["@odata.context"];
        appList.value = jsonData["value"];

        setAppTemplates(appList);
        console.log("appTemplates " + appList);
      };
      api(token.access_token);
    }
  }, []);

  return (
    <div>
      <div className="page-breadcrumb" />
      <div className="d-flex flex-column page-container"></div>
      <div className="porlet box blue col" />
      <div className="row">
        <div className="col-md-12">
          <div className="caption">MS Azure Enterprise Application Catalog</div>
          <div className="page-breadcrumb" />
          <div className="header-row">
            <div className="header-column">
              <div className="caption">MS Azure Enterprise Apps</div>
            </div>
          </div>
          <br />
          <table style={{ paddingLeft: 15 }}>
            <tbody style={{ margin: 15 }}>
              {appTemplates?.value.map(function (value) {
                return (
                  <tr key={value.id}>
                    <td style={{ paddingLeft: 50, width: "50px" }}>
                      <b>{value.displayName}</b>
                      <br />
                      <Button
                        className="saviynt-button"
                        onClick={() => {
                          console.log(
                            "passing token " + JSON.stringify(location.state)
                          );
                          toNextStep(location.state, value);
                        }}
                      >
                        <div>
                          <Img src={value.logoUrl} width={50} height={50} />
                        </div>
                      </Button>
                      <p style={{ fontSize: "8pt" }}>{value.description}</p>
                      <br />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{paddingTop:50,paddingLeft:50}}>
                <Button className="saviynt-button" style={{fontWeight: "10px"}} onClick={() => setShow(!show)}>Debug</Button>
          </div>
          {show === true ? (
            <div>
              <div style={{ paddingLeft: 50, fontSize: "10px" }}>
                <div>&nbsp;</div>
                <div style={{ width: "100px", fontWeight: 500 }}>
                  Access Token
                </div>
                <div style={{ wordBreak: "break-word", width: "500px" }}>
                  {location.state.access_token}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
