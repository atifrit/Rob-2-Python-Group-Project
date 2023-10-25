import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPortfolio } from "../../store/portfolios";
import {
  getUserWatchlist,
  createNewWatchlist,
  deleteWatchlistById,
} from "../../store/watchlists";
import { Link } from "react-router-dom";

const PortfolioDetails = () => {
  const dispatch = useDispatch();
  const { currentUserPortfolio } = useSelector((state) => state.portfolios);
  const { currentUserWatchlist } = useSelector((state) => state.watchlists);
  const [newWatchlistName, setNewWatchlistName] = useState("");

  useEffect(() => {
    if (!currentUserPortfolio) {
      dispatch(getUserPortfolio());
    }
    if (!currentUserWatchlist) {
      dispatch(getUserWatchlist());
    }
  }, [dispatch, currentUserPortfolio, currentUserWatchlist]);

  if (!currentUserPortfolio || !currentUserWatchlist) {
    return <div>Loading...</div>;
  }

  const transactions = currentUserPortfolio.transactions || [];

  const handleCreateWatchlist = () => {
    dispatch(createNewWatchlist(newWatchlistName));

    setNewWatchlistName("");
  };

  const handleDeleteWatchlist = (watchlistId) => {
    if (window.confirm("Are you sure you want to delete this watchlist?")) {
      dispatch(deleteWatchlistById(watchlistId));
    }
  };

  return (
    <div>
      <h2>Your Portfolio</h2>
      <p>Funds: ${currentUserPortfolio.balance.toFixed(2)}</p>
      <h3>Stocks</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <Link to={`/companies/${transaction.company_id}`}>
              {transaction.ticker}
            </Link>
            <br />
            {transaction.shares_owned} shares
            <br />
          </li>
        ))}
      </ul>

      <h3>Watchlists</h3>
      {currentUserWatchlist.map((watchlist, watchlistIndex) => (
        <div key={watchlistIndex}>
          <h4>{watchlist.name}</h4>
          <button onClick={() => handleDeleteWatchlist(watchlist.id)}>
            Delete Watchlist
          </button>
          <ul>
            {watchlist.watchlist_stocks.map((item, index) => (
              <li key={index}>
                <Link to={`/companies/${item.company_id}`}>
                  Ticker: {item.ticker}
                </Link>
                <br />
                Price: ${item.price.toFixed(2)}
                <br />
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <input
          type="text"
          placeholder="New Watchlist Name"
          value={newWatchlistName}
          onChange={(e) => setNewWatchlistName(e.target.value)}
        />
        <button onClick={handleCreateWatchlist}>Create New Watchlist</button>
      </div>
    </div>
  );
};

export default PortfolioDetails;
