import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { getUserPortfolio } from "../../store/portfolios";
import { getAllCompanies } from '../../store/companies';

const PortfolioDetails = () => {
  const dispatch = useDispatch();
  const { currentUserPortfolio } = useSelector((state) => state.portfolios);
  const allCompanies = useSelector((state) => state.companies.byId);

  useEffect(() => {
    if (!currentUserPortfolio) {
      dispatch(getUserPortfolio());
    }
  }, [dispatch, currentUserPortfolio]);


  useEffect(() => {
    if (Object.values(allCompanies).length < 1) {
      dispatch(getAllCompanies());
    }
  }, [dispatch, allCompanies]);

  if (!currentUserPortfolio) {
    return <div>Loading...</div>;
  }

  const transactions = currentUserPortfolio.transactions || [];

  let allPrices;

  if(Object.values(allCompanies).length) {
    allPrices = transactions.map((transaction, index) => {
      let resindex
      for (let i=0; i<Object.values(allCompanies).length; i++) {
        if(transaction.ticker === allCompanies[i][i+1].ticker) {
          resindex=i
        }
      }
      return {[transaction.ticker]: allCompanies[resindex][resindex+1]}
      //[resindex+1].price
    })
  }

  console.log('allPrices: ', allPrices);
  console.log('currentUserPortfolio: ', currentUserPortfolio);
  let options = {title: {
    display: true,
    text: 'Chart.js Line Chart',
  },}

  function choose(arr) {
    let i = Math.floor(Math.random()*arr.length)
    return arr[i]
  }

  let Progressions = [[ 1, 2, -1, 2, 3, -1 ],[ -1, -1, 1, -1, -1, 1 ]]


  function priceGenerator(base, num, progressions) {
    let trend = choose(progressions)

    let prices = []
    let val = base

    for (let i=0; i<num; i++) {
      let stockval = val + (choose(trend)*Math.random())
      prices.push(stockval.toFixed(2))
      val = stockval
    }

    return prices
  }

  let priceArrs=[];
  console.log('transactions at index: ', transactions[0])
  if(allPrices && allPrices.length) {
    for (let i=0; i<allPrices.length; i++) {
      priceArrs.push(priceGenerator((Object.values(allPrices[i])[i].price), 30, Progressions))
    }
  }

  let priceData=[]
  if(priceArrs.length) {
    for (let i=0; i<priceArrs[0].length; i++) {
      let sum = 0;
      for (let j=0; j < priceArrs.length; j++) {
        console.log(priceArrs[j][i])
        sum += priceArrs[j][i]
        priceData.push(sum)
      }
    }
  }

  console.log('currentUserPortfolio: ', currentUserPortfolio);
  let data = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29].reverse(),
    datasets: [{
      label:`Portfolio History`,
      data: priceData
    }]
  }


  return (
    <div>
      <h2>Your Portfolio</h2>
      <div className='detailsgraph'>
        <Line options={options} data={data} />
      </div>
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
