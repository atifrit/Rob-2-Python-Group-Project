const GET_USER_PORTFOLIO = "portfolios/GET_USER_PORTFOLIO";

const setUserPortfolio = (portfolio) => ({
  type: GET_USER_PORTFOLIO,
  payload: portfolio,
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
    default:
      return state;
  }
};

export default portfolioReducer;
