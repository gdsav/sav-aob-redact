//import { useReducer, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useState} from 'react';
import useToken from "./components/login/service/useToken";
import Login from "./components/login/Login";
import { Button, Container } from "react-bootstrap";
import "./App.css";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { AzureRegisteredApp } from "./pages/AzureRegisteredApp";
import { AzureLayout } from "./pages/AzureLayout";
import Parameters from "./pages/Parameters";
import StyledNavBar from "./components/navbar/SytledNavbar";
import { AzureShowToken } from "./components/azurecatalog/AzureShowToken";
import { AzureShowCatalog } from "./components/azurecatalog/AzureShowCatalog";
import { AzureAppCreation } from "./components/azurecatalog/AzureAppCreation";
import { MegaCleanupForm } from "./pages/MegaCleanupForm";
import { AzureShowRegisteredAppToken } from "./components/azureregisteredapps/AzureShowRegisteredAppToken";
import { AzureShowRegisteredAppCatalog } from "./components/azureregisteredapps/AzureShowRegisteredAppCatalog";
import { AzureShowSamlMetadataWireFrame } from "./components/azureregisteredapps/AzureShowSamlMetadataWireFrame";
import { SaviyntShowApprovals } from './components/azureregisteredapps/SaviyntShowApprovals';
import { AzureRegisteredAppCreation } from './components/azureregisteredapps/AzureRegisteredAppCreation';
import { IAzureToken } from "./api/interfaces/IAzureToken";

function App() {
  const { token, setToken } = useToken();
  const [show, setShow] = useState(false);


  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <StyledNavBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/azure">
          <Route path="cleanup" element={<MegaCleanupForm />} />
          <Route path="enterprise-app">
            <Route path="step1" element={<AzureShowToken />} />
            <Route path="step2" element={<AzureShowCatalog />} />
            <Route path="step3" element={<AzureAppCreation />} />
          </Route>
          <Route path="registered-app">
           <Route path="step1" element={<AzureShowRegisteredAppToken />} />
           <Route path="step2" element={<SaviyntShowApprovals savToken={token}/>}/>
           <Route path="step3" element={<AzureShowRegisteredAppCatalog />} />
           <Route path="step4" element={<AzureShowSamlMetadataWireFrame />} />
           <Route path="step5" element={<AzureRegisteredAppCreation/>}/>
          </Route>

        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/parameters" element={<Parameters />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div style={{ paddingTop: 10, paddingLeft: 50 }}>
        <Button
          className="saviynt-button"
          style={{ fontWeight: "10px" }}
          onClick={() => setShow(!show)}
        >
          Saviynt Token
        </Button>
      </div>

      {show === true ? (
            <div>
              <div style={{ paddingLeft: 50, fontSize: "10px" }}>
                <div>&nbsp;</div>
                <div style={{ fontWeight: 500 }}>
                  Saviynt Access Token
                </div>
                <div >
                  <pre>
                  {JSON.stringify(token,null,4)}
                  </pre>
                </div>
              </div>
            </div>
          ) : null}
      <footer>&nbsp;</footer>

    </div>
  );
}

export default App;
