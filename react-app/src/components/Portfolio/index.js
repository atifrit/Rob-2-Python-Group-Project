import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPortfolio } from "../../store/portfolios";
import { getUserWatchlist } from "../../store/watchlists";
import { Link } from "react-router-dom";

const PortfolioDetails = () => {
  const dispatch = useDispatch();
  const { currentUserPortfolio } = useSelector((state) => state.portfolios);
  const { currentUserWatchlist } = useSelector((state) => state.watchlists);

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
    </div>
  );
};

export default PortfolioDetails;
