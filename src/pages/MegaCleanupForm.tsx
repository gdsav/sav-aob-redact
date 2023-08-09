import React, { useState, useEffect } from "react";
import { IAzureToken } from "../api/interfaces/IAzureToken";

interface IState {
  displayName: string;
}

interface ITableEntry {
  id: string;
  displayName: string;
  createdDateTime: string;
}

interface ITableState {
  "@odata.context": string;
  "@odata.nextLink": string;
  value: ITableEntry[];
}

export function MegaCleanupForm() {
  const [displayName, setDisplayName] = useState("Azure AD SAML Toolkit");
  const [azureToken, setAzureToken] = useState<IAzureToken>();
  const [myApps, setMyApps] = useState<ITableState>();

  let visited = false;

  const handleRemove = (
    id: string,
    displayName: string,
    newApps: ITableState
  ) => {
    let myValues = newApps?.value.filter((item) => item.id !== id);
    synchronizedDeleteApp(id,azureToken?.access_token);
    console.log(
      "removed " +
        id +
        " displayName=" +
        displayName +
        " length=" +
        myValues?.length +
        " prevLength=" +
        myApps?.value.length
    );

    const myNewApps = {} as ITableState;
    if (myValues != undefined) {
      myNewApps.value = myValues;
    }
    return myNewApps;
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("removing " + displayName);
    let myDisplayName = displayName;
    let newApps = { value: myApps?.value } as ITableState;
    myApps?.value.map((item) => {
      if (item.displayName.trim() === myDisplayName.trim()) {
        newApps = handleRemove(item.id, item.displayName, newApps);
        console.log("have " + newApps?.value.length + " entries");
      } else {
        console.log("ignored " + item.displayName);
      }
    });
    setMyApps(newApps);
  };

  function synchronousGetToken() {
    const response = synchronousGet("http://localhost:8080/az/getToken");
    if (response != undefined) {
      setAzureToken(JSON.parse(response));
      return JSON.parse(response);
    }
  }

  function synchronizedDeleteApp(
    id : string,
    azureToken? : string,
    ) { 
        const xhr = new XMLHttpRequest();
        var url : string = 'http://localhost:8080/az/applications/';
        if (id != undefined) { 
            url = url + id;
        }
        xhr.open("DELETE", url, false);
        if (azureToken != undefined) {
          xhr.setRequestHeader("Authorization", "Bearer " + azureToken);
        }
        xhr.send(null);
        if (xhr.status === 204) {
            return "success";
        }
    }

  function synchronousGetMyApplications(
    azureToken: string,
    displayName: string
  ) {
    const response = synchronousGet(
      "http://localhost:8080/az/applications",
      azureToken,
      displayName
    );
    if (response != undefined) {
      setMyApps(JSON.parse(response));
      return JSON.parse(response);
    }
  }

  function synchronousGet(url: string, token?: string, displayName?: string) {
    const xhr = new XMLHttpRequest();
    if (displayName != undefined) {
      url = url + "?displayName=" + encodeURIComponent(displayName);
      console.log("url is now " + url);
    }

    xhr.open("GET", url, false);
    if (token != undefined) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    }

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(null);
    if (xhr.status === 200) {
      return xhr.responseText;
    }
  }

  useEffect(() => {
    if (!visited) {
      const myAzureToken: IAzureToken = synchronousGetToken();
      console.log(JSON.stringify(azureToken));
      visited = true;

      if (myAzureToken != undefined) {
        setAzureToken(myAzureToken);
        const appJson = synchronousGetMyApplications(
            myAzureToken.access_token,
          displayName
        );
        console.log("my applications" + JSON.stringify(appJson));
      }
    }
  }, [visited]);

  return (
    <div className="container">
      <p>&nbsp;</p>
      <form onSubmit={submitForm}>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          placeholder="Enter a Display Name"
          className="input"
        />
        <br></br>
        <button type="submit" className="btn">
          Submit
        </button>
        <br></br>
        {myApps?.value.length}
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Display Name</td>
              <td>Creation Date/Time</td>
            </tr>
          </thead>
          <tbody>
            {myApps?.value?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.displayName}</td>
                  <td>{item.createdDateTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
}
