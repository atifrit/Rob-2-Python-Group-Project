const GET_USER_WATCHLIST = "watchlists/GET_USER_WATCHLIST";

const setUserWatchlist = (watchlist) => ({
  type: GET_USER_WATCHLIST,
  payload: watchlist,
});

export const getUserWatchlist = () => async (dispatch) => {
  try {
    const response = await fetch("/api/watchlists/");
    if (!response.ok) throw response;
    const data = await response.json();
    console.log("Watchlist data:", data);
    dispatch(setUserWatchlist(data));
  } catch (error) {
    console.error("Error fetching user watchlist:", error);
  }
};

const initialState = {
  byId: {},
  currentUserWatchlist: null,
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_WATCHLIST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.watchlist_id]: action.payload,
        },
        currentUserWatchlist: action.payload,
      };
    default:
      return state;
  }
};

export default watchlistReducer;
