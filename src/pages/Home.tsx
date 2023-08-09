import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export function Home() {
  return (
    <div>
      <div style={{ backgroundColor: "white" }}>
        <div style={{ paddingTop: 75, paddingLeft: 50, fontWeight: 500 }}>
          MS Azure Application Onboarding
        </div>
        <div className="page-breadcrumb"></div>
        <div
          style={{
            paddingLeft: 50,
            paddingTop: 25,
            fontSize: "14px",
            height: "500px",
          }}
        >
          Welcome to MS Application Onboarding. This application will guide you
          through an approval process for deploying an application. Once
          approved, you may create the application.
          <br />
          <br />
          Select the MS repository that you would like to deploy from:
          <div style={{ paddingTop: "3rem", paddingLeft: "25px" }}>
            <div>
              <Link to="/azure/enterprise-app/step1">
                MS Enterprise Catalog
              </Link>
            </div>
            <br />
            <div>
              <Link to="/azure/registered-app/step1" style={{ paddingTop: 20 }}>
                MS Application Registrations
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12" />
    </div>
  );
}
