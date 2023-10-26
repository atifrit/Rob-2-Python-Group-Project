import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../../../store/companies";
import { Line } from "react-chartjs-2";
import {
  addStockToWatchlistById,
  removeStockFromWatchlistById,
  getUserWatchlist,
} from "../../../store/watchlists";

const CompanyDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const company = useSelector((state) => state.companies.currentCompany);
  const { currentUserWatchlist } = useSelector((state) => state.watchlists);
  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    dispatch(getCompanyById(Number(id)));
    dispatch(getUserWatchlist());
  }, [dispatch, id]);

  useEffect(() => {
    if (company && currentUserWatchlist && selectedWatchlist) {
      const targetWatchlist = currentUserWatchlist.find(
        (watchlist) => watchlist.id === parseInt(selectedWatchlist, 10)
      );

      const isStockInSelectedWatchlist = targetWatchlist
        ? targetWatchlist.watchlist_stocks.some(
            (stock) => stock.company_id === company.id
          )
        : false;

      setIsInWatchlist(isStockInSelectedWatchlist);
    }
  }, [company, currentUserWatchlist, selectedWatchlist]);

  if (!company) return <div>Loading...</div>;

  let options = {
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  };

  function choose(arr) {
    let i = Math.floor(Math.random() * arr.length);
    return arr[i];
  }

  let Progressions = [
    [1, 2, -1, 2, 3, -1],
    [-1, -1, 1, -1, -1, 1],
  ];

  function priceGenerator(base, num, progressions) {
    let trend = choose(progressions);

    let prices = [];
    let val = base;

    for (let i = 0; i < num; i++) {
      let stockval = val + choose(trend) * Math.random();
      prices.push(stockval.toFixed(2));
      val = stockval;
    }

    return prices;
  }

  let prices = priceGenerator(company.price, 30, Progressions);

  let data = {
    labels: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29,
    ].reverse(),
    datasets: [
      {
        label: `${company.name}`,
        data: prices,
      },
    ],
  };

  const handleAddToWatchlist = async () => {
    if (selectedWatchlist) {
      if (!isInWatchlist) {
        await dispatch(addStockToWatchlistById(selectedWatchlist, company.id));
        dispatch(getUserWatchlist());
      }

      // setSelectedWatchlist("");
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (selectedWatchlist) {
      if (isInWatchlist) {
        await dispatch(
          removeStockFromWatchlistById(selectedWatchlist, company.id)
        );
        dispatch(getUserWatchlist());
      }

      // setSelectedWatchlist("");
    }
  };

  return (
    <div className="company-details">
      <div className="detailsgraph">
        <Line options={options} data={data} />
      </div>

      <div className="company-about">
        <h2>About</h2>
        <p>{company.name}</p>
        <p>{company.ticker}</p>
        <p>{company.ceo}</p>
        <p>Headquarters: {company.headquarters}</p>
        <p>Founded: {company.founded}</p>
      </div>

      <div className="company-statistics">
        <h2>Key Statistics</h2>
        <table>
          <tbody>
            <tr>
              <td>Avg. Volume:</td>
              <td>{company.avg_volume}</td>
            </tr>
            <tr>
              <td>High:</td>
              <td>{company.high}</td>
            </tr>
            <tr>
              <td>Low:</td>
              <td>{company.low}</td>
            </tr>
            <tr>
              <td>Open Price:</td>
              <td>{company.open_price}</td>
            </tr>
            <tr>
              <td>Volume:</td>
              <td>{company.volume}</td>
            </tr>
            <tr>
              <td>52 Week High:</td>
              <td>{company.week_high}</td>
            </tr>
            <tr>
              <td>52 Week Low:</td>
              <td>{company.week_low}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="add-to-watchlist">
        <select
          value={selectedWatchlist}
          onChange={(e) => setSelectedWatchlist(e.target.value)}
        >
          <option value="">Select Watchlist</option>
          {currentUserWatchlist &&
            currentUserWatchlist.map((watchlist) => (
              <option key={watchlist.id} value={watchlist.id}>
                {watchlist.name}
              </option>
            ))}
        </select>
        {selectedWatchlist ? (
          isInWatchlist ? (
            <button onClick={handleRemoveFromWatchlist}>
              Remove from Watchlist
            </button>
          ) : (
            <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
          )
        ) : (
          <button onClick={handleAddToWatchlist} disabled>
            Add to Watchlist
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;
