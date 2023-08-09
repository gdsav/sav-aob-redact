import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { Action, Parameter } from './parameterReducer';
import ParameterForm from './ParameterForm';

interface ParameterModalProps {
  showModal: boolean;
  dataToEdit: Parameter | undefined;
  toggleModal: () => void;
  dispatch: React.Dispatch<Action>;
}

const ParameterModal: FC<ParameterModalProps> = ({
  toggleModal,
  dataToEdit,
  showModal,
  dispatch
}) => {
  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Parameter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ParameterForm
          dispatch={dispatch}
          dataToEdit={dataToEdit}
          toggleModal={toggleModal}
        />
      </Modal.Body>
    </Modal>
  );
};
export default ParameterModal;