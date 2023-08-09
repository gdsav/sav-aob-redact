import { useReducer, useEffect, useState } from "react";

import ParameterForm from "../components/parameter/ParameterForm";
import ParameterList from "../components/parameter/ParameterList";
import ParameterModal from "../components/parameter/ParameterModal";

import {
  Parameter,
  parameterReducer,
  State,
} from "../components/parameter/parameterReducer";

import "bootstrap/dist/css/bootstrap.min.css";

const initialState: State = {
  parameters: [],
};

function Parameters() {
  const [state, dispatch] = useReducer(parameterReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<Parameter | undefined>(
    undefined
  );

  useEffect(() => {
    if (!showModal) {
      setDataToEdit(undefined);
    }
  }, [showModal]);

  const toggleModal = () => {
    setShowModal((show) => !show);
  };

  const handleEdit = (id: number) => {
    setDataToEdit(state.parameters.find((parameter) => parameter.id === id));
    toggleModal();
  };

  console.log(state);

  return (
    <>
      <div className="page-breadcrumb" />
      <div className="d-flex flex-column page-container">
        <div className="page-title">Parameters</div>
        <div className="page-breadcrumb" />
        <div className="row">
          <div className="col-md-12">
            <div className="porlet box blue col"/>
              <div className="caption">New Parameter</div>
            </div>
            <div className="bd-highlight">
              <ParameterForm
                dispatch={dispatch}
                dataToEdit={dataToEdit}
                toggleModal={toggleModal}
              />
            </div>
            <div className="rop-2 bd-highlightw">
              {state.parameters.length > 0 && (
                <ParameterList
                  parameters={state.parameters}
                  handleEdit={handleEdit}
                  dispatch={dispatch}
                />
              )}
            </div>
            <div className="p-2 bd-highlight">
              <ParameterModal
                showModal={showModal}
                dataToEdit={dataToEdit}
                toggleModal={toggleModal}
                dispatch={dispatch}
              />
            </div>
          </div>
        </div>
    </>
  );
}

export default Parameters;
