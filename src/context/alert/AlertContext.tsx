import { createContext, ReactNode, useReducer } from "react";
import AlertReducer from "./AlertReducer";

interface AlertContextType {
  alert: { msg: string; type: string };
  setAlert: (msg: string, type: string) => void;
}
interface AlertProviderProps {
  children: ReactNode;
}

export const INITIAL_STATE: AlertContextType = {
  alert: { msg: "", type: "" },
  setAlert: () => {},
};

const AlertContext = createContext<AlertContextType>(INITIAL_STATE);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [state, dispatch] = useReducer(AlertReducer, {
    msg: "",
    type: "",
  });

  const setAlert = (msg: string, type: string) => {
    dispatch({ type: "SET_ALERT", payload: { msg: msg, type: type } });

    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000);
  };
  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
