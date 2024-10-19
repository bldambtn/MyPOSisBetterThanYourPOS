import { createContext, useContext, useReducer } from "react";

// Define your initial state
const initialState = {
  someValue: 0,
  // add other initial state values here
};

// Define your reducer function
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_SOME_VALUE":
      return {
        ...state,
        someValue: action.payload,
      };
    // Add other actions here
    default:
      return state;
  }
}

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  // Initialize the state and dispatch using useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
