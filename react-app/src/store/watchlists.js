const GET_USER_WATCHLIST = "watchlists/GET_USER_WATCHLIST";
const CREATE_WATCHLIST = "watchlists/CREATE_WATCHLIST";
const DELETE_WATCHLIST = "watchlists/DELETE_WATCHLIST";

const setUserWatchlist = (watchlist) => ({
  type: GET_USER_WATCHLIST,
  payload: watchlist,
});

const createWatchlist = (watchlist) => ({
  type: CREATE_WATCHLIST,
  payload: watchlist,
});

const deleteWatchlist = (watchlistId) => ({
  type: DELETE_WATCHLIST,
  payload: watchlistId,
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

export const createNewWatchlist = (name) => async (dispatch) => {
  try {
    const response = await fetch("/api/watchlists/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) throw response;
    const data = await response.json();

    dispatch(createWatchlist(data));
  } catch (error) {
    console.error("Error creating a new watchlist:", error);
  }
};

export const deleteWatchlistById = (watchlistId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/watchlists/${watchlistId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw response;

    dispatch(deleteWatchlist(watchlistId));
  } catch (error) {
    console.error("Error deleting watchlist:", error);
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
    case CREATE_WATCHLIST:
      const newWatchlist = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [newWatchlist.id]: newWatchlist,
        },
      };
    case DELETE_WATCHLIST:
      const watchlistIdToDelete = action.payload;
      const {
        [watchlistIdToDelete]: deletedWatchlist,
        ...remainingWatchlists
      } = state.byId;

      return {
        ...state,
        byId: remainingWatchlists,
      };
    default:
      return state;
  }
};

export default watchlistReducer;
