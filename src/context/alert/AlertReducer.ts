interface Alert {
  msg: string;
  type: string;
}

type ACTION_TYPES =
  | { type: "SET_ALERT"; payload: Alert }
  | {
      type: "REMOVE_ALERT";
    };

const AlertReducer = (state: Alert, action: ACTION_TYPES) => {
  switch (action.type) {
    case "SET_ALERT":
      return action.payload;
    case "REMOVE_ALERT":
      return {
        msg: "",
        type: "",
      };
  }
};

export default AlertReducer;
