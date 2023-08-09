import { Outlet } from "react-router"
import { IAzureAppCreationInputs } from "../api/interfaces/IAzureAppCreationInputs";

export function AzureEnterpriseApp(inputs : IAzureAppCreationInputs) { 
    return ( 
        <div>

             <div className="porlet box blue col"/>
              <div className="caption">MS Azure Enterprise App</div>
            <h2>MS Azure Enterprise App</h2>
            <p>Now it is time to start provisioning an enterprise application.</p>
            <p>Review Azure Parameters</p>
            {
                JSON.stringify(inputs)
            }
            
        </div>
        
    );
}

