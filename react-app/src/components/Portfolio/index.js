import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPortfolio } from "../../store/portfolios";

const PortfolioDetails = () => {
  const dispatch = useDispatch();
  const { currentUserPortfolio } = useSelector((state) => state.portfolios);

  useEffect(() => {
    if (!currentUserPortfolio) {
      dispatch(getUserPortfolio());
    }
  }, [dispatch, currentUserPortfolio]);

  if (!currentUserPortfolio) {
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
            {transaction.ticker}
            <br />
            {transaction.shares_owned} shares
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioDetails;
