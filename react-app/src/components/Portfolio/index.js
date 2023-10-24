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

  const { balance, transactions } = currentUserPortfolio;

  return (
    <div>
      <h2>Portfolio Details</h2>
      <p>Funds: ${balance.toFixed(2)}</p>
      <h3>Companies Owned</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <strong>Company:</strong> {transaction.company_name}
            <br />
            <strong>Shares Owned:</strong> {transaction.shares}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioDetails;
