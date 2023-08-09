import { Button } from "react-bootstrap";
import { IAzureAppCreationInputs } from "../../api/interfaces/IAzureAppCreationInputs";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Img } from "react-image";

export function AzureRegisteredAppCreation() {
  const [results, setResults] = useState<any>();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  var inputs: IAzureAppCreationInputs = location.state;

  var statusCode = -1;
  let visited = false;
  let myResult: string = "<empty>";

  function instantiateApp(
    accessToken: String,
    myDisplayName: string,
    retries: number
  ) {
    console.log("*** instantiateApp ***");

    const myBody = { displayName: myDisplayName };
    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/az/createApplication");
    req.setRequestHeader("Authorization", "Bearer " + accessToken);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(myBody));
    let newResult;
    req.onreadystatechange = function () {
      console.log("request status = " + req.status);
      const newResult: any = JSON.parse(req.responseText);

      var retVal = {
        status: req.status,
        statusText: req.statusText,
        value: newResult,
      };

      console.log("app creation response : " + JSON.stringify(retVal, null, 2));
      setResults(JSON.parse(JSON.stringify(retVal)));

      return JSON.parse(JSON.stringify(retVal));
    };
    req.onloadend = function (event: Event) {
      console.log("load endded, req=" + JSON.stringify(req));
    };

    return undefined;

    /*
    const data : Promise<Response> = fetch(
      "http://localhost:8080/az/createApplication",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(myBody),
      }
    );
    console.log("return data is: " + data);
    
    return data;
    */
  }

  useEffect(() => {
    if (!visited) {
      visited = true;

      console.log("retrieving " + JSON.stringify(inputs));
      var displayName: string = inputs.azureEntry.displayName;
      console.log("display name is " + displayName);
      let token = inputs.azureToken.access_token;
      if (token != undefined) {
        const data = instantiateApp(token, displayName, 0);
        //console.log("app creation response  2: " + JSON.stringify(data, null, 2) );
        //setResults(data);
      }

      /*

      let token = inputs.azureToken.access_token;
      if (token != undefined) {
        const api = async (
          accessToken: string,
          myDisplayName: string,
          retries: number
        ) => {
          let myBody = { displayName: myDisplayName };
          const data : any = await fetch(
            "http://localhost:8080/az/createApplication",
            {
              method: "POST",
              headers: new Headers({
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
              }),
              body: JSON.stringify(myBody),
            }
          );
          console.log("retrun data is: " + data);
          return data;
        };

        let myDisplayName = inputs.azureEntry.displayName;
        let res1 : any = api(inputs.azureToken.access_token, myDisplayName, 0);
       

        setResults(res1);
         */
    }
  }, []);

  return (
    <div>
      <div className="page-breadcrumb" />
      <div className="porlet box blue col" />
      <div className="row">
        <div className="col-md-12">
          <div className="caption">Application Created </div>
          <div className="page-breadcrumb" />
          <div className="header-row">
            <div className="header-column">
              <div className="caption">MS Azure Registered Apps</div>
              <div style={{ paddingLeft: 50 }}>
                <div style={{ padding: 15, width: "500px" }}>
                  <div style={{ color: "green" }}>
                    Instantiated Succesfully!
                  </div>
                  <div style={{ paddingTop: 25, fontWeight: 500 }}>
                    {inputs.azureEntry.displayName}
                  </div>
                  <br />
                  <br />
                  <Img src={inputs.azureEntry.logoUrl} width={50} height={50} />
                  <br />
                  <br />
                  <div style={{ fontSize: "8pt" }}>
                    {inputs.azureEntry.description}
                  </div>
                  <div style={{paddingTop: 50, fontSize: "14px"}}>
                    {results === undefined ? (
                      <table>
                        <tr>
                          <td>Loading...</td>
                          <td>&nbsp;</td>
                        </tr>
                      </table>
                    ) : (
                      <table style={{padding:50, paddingTop:50}}>
                        <tr>
                          <td>id</td>
                          <td> : {results?.value?.application?.id} </td>
                        </tr>
                        <tr>
                          <td>appId</td>
                          <td> : {results?.value?.application?.appId} </td>
                        </tr>
                      </table>
                    )}
                  </div>
                </div>
                <div style={{ paddingTop: 25, fontSize: "12px" }}>
                At this point, it is time to connect Saviynt to the 
                <span style={{ fontWeight: "bold"}}>&nbsp;{results?.value?.application?.displayName}</span>
                </div> 
              </div>
              <div style={{ paddingLeft: 50, paddingTop: 25 }}>
                <Button
                  className="saviynt-button"
                  href="https://eic-poc-usarmyapp.saviyntcloud.com/ECMv6/design/catalogManagement"
                  target="_blank"
                >
                  Build Connection
                </Button>
                <br/>
                <div style={{paddingTop:50}}>
                <Button className="saviynt-button" style={{fontWeight: "10px"}} onClick={() => setShow(!show)}>Debug</Button>
                </div>
              </div>

               <p>&nbsp;</p>
              { 
                show === true ? (
                <div>
                <pre style={{ fontSize: "8px" }}>
                  {
                    /* JSON.stringify(location.state) */
                    JSON.stringify(results, null, 2)
                  }
                </pre>
                </div>
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
