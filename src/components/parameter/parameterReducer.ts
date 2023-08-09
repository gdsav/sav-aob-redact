export interface Parameter {
  id: number;
  p_name: string;
  p_value: string;
}
export interface Action {
  type: "ADD_PARAMETER" | "UPDATE_PARAMETER" | "DELETE_PARAMETER";
  payload: Parameter | Update;
}
export interface State {
  parameters: Parameter[];
}
export interface Update {
  id: number;
  updates?: Parameter;
}
export const parameterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_PARAMETER":
      return {
        ...state,
        parameters: [...state.parameters, action.payload as Parameter],
      };
    case "UPDATE_PARAMETER":
      const { id, updates } = action.payload as Update;
      return {
        ...state,
        parameters: state.parameters.map((parameter) => {
          if (parameter.id === id) {
            return {
              ...parameter,
              ...updates,
            };
          }
          return parameter;
        }),
      };
    case "DELETE_PARAMETER": {
      const { id } = action.payload;
      return {
        ...state,
        parameters: state.parameters.filter((parameter) => parameter.id !== id),
      };
    }
    default:
      return state;
  }
};
