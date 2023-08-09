import { FC } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Parameter, Action } from "./parameterReducer";

interface ExtraProps {
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}

const ParameterItem: FC<Parameter & ExtraProps> = ({
  id,
  p_name,
  p_value,
  handleEdit,
  dispatch,
}) => {
  return (
    <tr>
      <td>{p_name}</td>
      <td>{p_value}</td>
      <td>
        <AiFillEdit size={20} onClick={() => handleEdit(id)} className="icon" />
      </td>
      <td>
      <AiFillDelete
        size={20}
        onClick={() => {
          const confirmDelete = window.confirm(
            `Are you sure you want to delete parameter ${p_name} = ${p_value}?`
          );
          if (confirmDelete) {
            dispatch({
              type: 'DELETE_PARAMETER',
              payload: { id }
            });
          }
        }}
        className="icon"
      />
      </td>
    </tr>
  );
};

export default ParameterItem;
