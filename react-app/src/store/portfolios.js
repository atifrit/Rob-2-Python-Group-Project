const GET_USER_PORTFOLIO = "portfolios/GET_USER_PORTFOLIO";
const ADD_BALANCE = "portfolios/ADD_BALANCE";
const REMOVE_BALANCE = "portfolios/REMOVE_BALANCE";

const setUserPortfolio = (portfolio) => ({
  type: GET_USER_PORTFOLIO,
  payload: portfolio,
});

const addBalance = (newBalance) => ({
  type: ADD_BALANCE,
  payload: newBalance,
});

const removeBalance = (newBalance) => ({
  type: REMOVE_BALANCE,
  payload: newBalance,
});

export const getUserPortfolio = () => async (dispatch) => {
  try {
    const response = await fetch("/api/portfolio/current");
    if (!response.ok) throw response;
    const data = await response.json();
    dispatch(setUserPortfolio(data));
  } catch (error) {
    console.error("Error fetching user portfolio:", error);
  }
};

export const addBalanceToPortfolio = (amount) => async (dispatch) => {
  try {
    const response = await fetch("/api/portfolio/add_balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) throw response;
    const data = await response.json();
    dispatch(addBalance(data.new_balance));
  } catch (error) {
    console.error("Error adding balance to portfolio:", error);
  }
};

export const removeBalanceFromPortfolio = (amount) => async (dispatch) => {
  try {
    const response = await fetch("/api/portfolio/remove_balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    const data = await response.json();
    dispatch(removeBalance(data.new_balance));
  } catch (error) {
    const errorMessage =
      error.error || "An error occurred while removing funds.";

    dispatch({ type: "REMOVE_BALANCE_ERROR", payload: errorMessage });

    throw error;
  }
};

const initialState = {
  byId: {},
  currentUserPortfolio: null,
};

const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PORTFOLIO:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.portfolio_id]: action.payload,
        },
        currentUserPortfolio: action.payload,
      };
    case ADD_BALANCE:
      return {
        ...state,
        currentUserPortfolio: {
          ...state.currentUserPortfolio,
          balance: action.payload.new_balance,
        },
      };
    case REMOVE_BALANCE:
      return {
        ...state,
        currentUserPortfolio: {
          ...state.currentUserPortfolio,
          balance: action.payload.new_balance,
        },
      };
    default:
      return state;
  }
};

export default portfolioReducer;
