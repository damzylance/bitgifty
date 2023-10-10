const initialState = { notifications: 0, wallets: {}, giftCardPage: "create" };
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, notifications: state.notifications + 1 };
    case "DECREMENT":
      return { ...state, notifications: state.notifications - 1 };
    case "FETCHWALLET":
      return { ...state, wallets: {} };
    case "CARDPAGE":
      return { ...state, giftCardPage: "" };
    default:
      return state;
  }
};
