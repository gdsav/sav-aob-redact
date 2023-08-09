import { FC } from "react";
import { Parameter, Action } from "./parameterReducer";
import  ParameterItem from "./ParameterItem";

interface ParameterListProps {
  parameters: Parameter[];
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}
const ParameterList: FC<ParameterListProps> = ({ 
  parameters,
    handleEdit,
    dispatch
}) => {
  return (
    <div className="contacts-list">
      <h3 className="contacts-list-title">List of Contacts</h3>
      <div className="contacts-list-table-container">
        <table className="contacts-list-table">
          <thead className="contacts-list-header">
            <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((parameter) => (
                <ParameterItem 
                    key={parameter.id} 
                    {...parameter} 
                    handleEdit={handleEdit}
                    dispatch={dispatch}
                    />))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ParameterList;
