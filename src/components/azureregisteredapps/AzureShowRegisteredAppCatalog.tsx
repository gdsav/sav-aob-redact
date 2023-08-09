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

import "./table.css";
import { IAzureRegisteredApplication } from "../../api/interfaces/IAzureRegisteredApplication";
import { IAzureRegisteredApplications } from "../../api/interfaces/IAzureRegisteredApplications";

//export function AzureShowCatalog(token: IAzureToken) {
export function AzureShowRegisteredAppCatalog() {
  const [appTemplates, setAppTemplates] =
    useState<IAzureRegisteredApplications>();
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  var azureEntry: IAzureRegisteredApplication;
  var azureToken: IAzureToken;

  const toNextStep = (
    myToken: IAzureToken,
    myEntry: IAzureRegisteredApplication
  ) => {
    const payload = {
      azureToken: myToken,
      azureEntry: myEntry,
    } as IAzureAppCreationInputs;

    console.log("payload=" + JSON.stringify(payload));
    //navigate("/azure/enterprise-app/step3", { state: payload });
    navigate("/azure/registered-app/step4", { state: payload });
  };

  useEffect(() => {
    console.log("retrieving");
    const token = location.state;
    if (token != undefined) {
      //const api = async (accessToken: string) => {
      const api = async (accessToken: string) => {
        console.log("token " + token);
        const data = await fetch("http://localhost:8080/az/getRegApps", {
          method: "GET",
          headers: new Headers({
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          }),
        });
        const jsonData = await data.json();
        const appList = {} as IAzureRegisteredApplications;
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
          <div className="caption">MS Azure Registered Application Catalog</div>
          <div className="page-breadcrumb" />
          <div className="header-row">
            <div className="header-column">
              <div className="caption">MS Azure Registered Applications</div>
            </div>
          </div>
          <br />
          <table style={{ paddingLeft: 15 }}>
            <tbody style={{ margin: 15 }}>
              {appTemplates?.value.map(function (value) {
                return (
                  <tr key={value.id}>
                    <td
                      style={{
                        paddingTop: 25,
                        paddingLeft: 50,
                        width: "500px",
                      }}
                    >
                      <b>{value.displayName}</b>
                      <br />
                      <div className="div-table">
                        <div className="div-table-row">
                          <div className="div-table-col">Created:</div>
                          <div className="div-table-col">
                            {value.createdDateTime}
                          </div>
                        </div>
                        <div className="div-table-row">
                          <div className="div-table-col">
                            Description
                          </div>
                          <div className="div-table-col">
                            {value.description ? value.description : "-"}
                          </div>
                        </div>
                        <div className="div-table-row">
                          <div className="div-table-col">
                            Logo
                          </div>
                          <div className="div-table-col">
                            {value.logoUrl ? value.logoUrl : "-"}
                          </div>
                        </div>
                      </div>
                      <div>&nbsp;</div>
                      <Button
                        className="saviynt-button"
                        onClick={() => {
                          console.log(
                            "passing token " + JSON.stringify(location.state)
                          );
                          toNextStep(location.state, value);
                        }}
                      >
                        Select
                      </Button>
                      <br />
                      <br />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ paddingTop: 50, paddingLeft: 50 }}>
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
              <div style={{ paddingLeft: 50, fontSize: "10px" }}>
                <div>&nbsp;</div>
                <div style={{ width: "100px", fontWeight: 500 }}>
                  Azure Access Token
                </div>
                <div style={{}}>{location.state.access_token}</div>
                <div
                  style={{ width: "200px", fontWeight: 500, paddingTop: 10 }}
                >
                  Registered Applications
                </div>
                <div style={{ width: "500px" }}>
                  <pre>{JSON.stringify(appTemplates, null, 4)}</pre>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
