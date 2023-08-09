import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Action, Parameter } from "./parameterReducer";

interface ParameterFormProps {
  dispatch: React.Dispatch<Action>;
  dataToEdit: Parameter | undefined;
  toggleModal: () => void;
}

const ParameterForm: FC<ParameterFormProps> = ({
  dispatch,
  dataToEdit,
  toggleModal,
}) => {
    
  const [parameter, setParameter] = useState({
    p_name: dataToEdit?.p_name ? dataToEdit.p_name : "",
    p_value: dataToEdit?.p_value ? dataToEdit.p_value : "",
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setParameter((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { p_name, p_value } = parameter;
    if (
      p_name.trim() === '' ||
      p_value.trim() === ''
    ) {
      setErrorMsg('All the fields are required.');
      return;
    };
    
    if (!dataToEdit) {
      dispatch({
        type: "ADD_PARAMETER",
        payload: {
          id: Date.now(), // returns current timestamp
          ...parameter,
        },
      });
      setParameter({
        p_name: '',
        p_value: ''
      });
      setErrorMsg('');
    } else {
      dispatch({
        type: 'UPDATE_PARAMETER',
        payload: {
          id: dataToEdit.id,
          updates: {
            id: Date.now(),
            ...parameter
          }
        }
      });
      
      // dispatch edit contact action
      toggleModal();
    }
  };
  return (
    <Form onSubmit={handleOnSubmit} className="contact-form">
      {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
      <Form.Group controlId="p_name" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          className="p_name"
          name="p_name"
          value={parameter.p_name}
          type="text"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="p_value" className="mb-3">
        <Form.Label>Value</Form.Label>
        <Form.Control
          className="p_value"
          name="p_value"
          value={parameter.p_value}
          type="text"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="submit">
        <Button variant="primary" type="submit" className="submit-btn">
          {dataToEdit ? "Update Parameter" : "Add Parameter"}
        </Button>
      </Form.Group>
    </Form>
  );
};
export default ParameterForm;
