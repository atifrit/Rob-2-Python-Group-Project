const GET_USER_WATCHLIST = "watchlists/GET_USER_WATCHLIST";
const CREATE_WATCHLIST = "watchlists/CREATE_WATCHLIST";
const DELETE_WATCHLIST = "watchlists/DELETE_WATCHLIST";
const ADD_STOCK_TO_WATCHLIST = "watchlists/ADD_STOCK_TO_WATCHLIST";
const REMOVE_STOCK_FROM_WATCHLIST = "watchlists/REMOVE_STOCK_FROM_WATCHLIST";

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

const addStockToWatchlist = (watchlistId, stock) => ({
  type: ADD_STOCK_TO_WATCHLIST,
  payload: { watchlistId, stock },
});

const removeStockFromWatchlist = (watchlistId, companyId) => ({
  type: REMOVE_STOCK_FROM_WATCHLIST,
  payload: { watchlistId, companyId },
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

export const addStockToWatchlistById =
  (watchlistId, companyId) => async (dispatch) => {
    try {
      const response = await fetch(
        `/api/watchlists/${watchlistId}/add-company/${companyId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) throw response;
      const data = await response.json();

      dispatch(addStockToWatchlist(watchlistId, data));
    } catch (error) {
      console.error("Error adding stock to watchlist:", error);
    }
  };

export const removeStockFromWatchlistById =
  (watchlistId, companyId) => async (dispatch) => {
    try {
      const response = await fetch(
        `/api/watchlists/${watchlistId}/remove-company/${companyId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw response;

      dispatch(removeStockFromWatchlist(watchlistId, companyId));
    } catch (error) {
      console.error("Error removing stock from watchlist:", error);
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
    case ADD_STOCK_TO_WATCHLIST:
      const { watchlistId, stock } = action.payload;
      const updatedWatchlist = { ...state.byId[watchlistId] };
      updatedWatchlist.watchlist_stocks.push(stock);

      return {
        ...state,
        byId: {
          ...state.byId,
          [watchlistId]: updatedWatchlist,
        },
      };
    case REMOVE_STOCK_FROM_WATCHLIST:
      const { watchlistId: removeWatchlistId, companyId: removeCompanyId } =
        action.payload;
      const updatedWatchlistToRemove = { ...state.byId[removeWatchlistId] };
      updatedWatchlistToRemove.watchlist_stocks =
        updatedWatchlistToRemove.watchlist_stocks.filter(
          (stock) => stock.company_id !== removeCompanyId
        );

      return {
        ...state,
        byId: {
          ...state.byId,
          [removeWatchlistId]: updatedWatchlistToRemove,
        },
      };
    default:
      return state;
  }
};

export default watchlistReducer;
