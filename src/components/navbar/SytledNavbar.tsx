import{NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/saviynt-app-logo.png';
import './navbar.css';


function getHeader (pname:string) {
  
  if (pname == "/")
    return "Home";
  else if (pname == "/parameters")
    return "Parameters";
  else if (pname == "/azure/enterprise-app/step1")
    return "Azure Enterprise Applications";
  else if (pname == "/azure/cleanup")
    return "Cleanup Utility";
  else if (pname == "/azure/registered-app/step1")
    return "Azure Registered Applications";
  else if (pname == "/azure/registered-app/step2")
    return "Saviynt Approvals";
  else if (pname == "/azure/registered-app/step3")
    return "Azure Registered Applications";
  else if (pname == "/azure/registered-app/step4")
    return "Azure Registered Applications";
  else if (pname == "/azure/registered-app/step5")
    return "Azure Registered Applications";
  else if (pname == "/about")
    return "About";  
    
  return "Unknown Path";

}

function StyledNavBar() {

  let currPath = getHeader(window.location.pathname);

  return (
  
    <Navbar className="navbar">
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto saviynt-navbar">
            <Nav.Link href="/">
              <img src={logo} alt="Saviynt Logo" style={{width: "100px"}}/>
            </Nav.Link>
            <div className="divider"/>
            <div className="currentPage">{currPath}</div> 
            <div className="divider"/>
            <NavDropdown title="Azure Applications" id="basic-nav-dropdown">
              <NavDropdown.Item href="/azure/enterprise-app/step1">Azure Enterprise Applications</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="/azure/registered-app/step1">Azure Registered Applications</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="/azure/cleanup">CleanUp</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}
 export default StyledNavBar;