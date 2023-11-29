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
import OpenModalButton from "../../OpenModalButton";
import BuyFormModal from "../../BuyFormModal";
import SellFormModal from "../../SellFormModal";
import { getUserPortfolio } from "../../../store/portfolios";
import "./CompanyDetails.css";

const CompanyDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const company = useSelector((state) => state.companies.currentCompany);
  const { currentUserWatchlist } = useSelector((state) => state.watchlists);
  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const user = useSelector((state) => state.session.user);
  const { currentUserPortfolio } = useSelector((state) => state.portfolios);
  const [yearBool, setYearBool] = useState(false);
  const [monthBool, setMonthBool] = useState(true);
  const [weekBool, setWeekBool] = useState(false);
  const [prices, setPrices] = useState([]);

  let labels
  if (monthBool) {
    labels = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29,
    ].reverse()
  }

  if (weekBool) {
    labels = [
      0, 1, 2, 3, 4, 5, 6
    ].reverse()
  }

  if (yearBool) {
    labels = []

    for (let i = 364; i >= 0; i--) {
      labels.push(i)
    }
  }



  useEffect(() => {
    if (!currentUserPortfolio) {
      dispatch(getUserPortfolio());
    }
  }, [dispatch, currentUserPortfolio]);

  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = (e) => {
    setShowMenu(false);
  };

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

  useEffect(() => {
    if (company) {
      setPrices(priceGenerator(company.price, 30, Progressions));
    }
  }, [company]);

  const priceUpdate = () => {
    setMonthBool(true);
    setYearBool(false);
    setWeekBool(false);
    setPrices(priceGenerator(company.price, 30, Progressions))
  }

  const  priceUpdateWeek = () => {
    setMonthBool(false);
    setYearBool(false);
    setWeekBool(true);
    setPrices(priceGenerator(company.price, 7, Progressions))
  }
  const  priceUpdateYear = () => {
    setMonthBool(false);
    setYearBool(true);
    setWeekBool(false);
    setPrices(priceGenerator(company.price, 365, Progressions))
    console.log(prices)
  }


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  if (!company) return <div>Loading...</div>;

  let options = {
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          display: false,
          beginAtZero: true,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          display: false,
          beginAtZero: true,
        },
      },
    },
    elements: {
      point: {
        radius: 4,
      },
    },
    tooltips: {
      intersect: false,
    },
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "nearest",
        intersect: false,
        callbacks: {
          label: function (context) {
            return `Price: ${context.parsed.y}`;
          },
        },
      },
    },
    responsive: true,
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


  let data = {
    labels: labels,
    datasets: [
      {
        label: `${company.name}`,
        data: prices,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: prices[0] < prices[prices.length - 1] ? "green" : "red",
        borderWidth: 3,
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

  const fetchWatchlists = () => {
    dispatch(getUserWatchlist());
  };

  if (user) {
    return (
      <>
        <div className="company-details">
          <div className="company-about">
            <h2>About</h2>
            <p>Name: {company.name}</p>
            <p>Ticker: {company.ticker}</p>
            <p>CEO: {company.ceo}</p>
            <p>Headquarters: {company.headquarters}</p>
            <p>Founded: {company.founded}</p>
          </div>
          <div className="detailsgraph">
            <Line options={options} data={data} />
          </div>
          <div className="company-statistics">
            <h2>Key Statistics</h2>
            <table className="companyStatsTable">
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
        </div>
        <div className="companyInteractionContainer">
          <div className="h1titletext">Time Scale:</div>
          <div className='timeoptions'>
            <button className='companyBuySellModal' onClick={priceUpdateWeek}>1 Week</button>
            <button className='companyBuySellModal' onClick={priceUpdate}>1 Month</button>
            <button className='companyBuySellModal' onClick={priceUpdateYear}>1 Year</button>
          </div>
          <div className="add-to-watchlist">
            <select
              className="companyWatchlistSelect"
              onFocus={fetchWatchlists}
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
                <button
                  className="companyAddToWatchlist"
                  onClick={handleRemoveFromWatchlist}
                >
                  Remove from Watchlist
                </button>
              ) : (
                <button
                  className="companyAddToWatchlist"
                  onClick={handleAddToWatchlist}
                >
                  Add to Watchlist
                </button>
              )
            ) : (
              <button
                className="companyAddToWatchlist"
                onClick={handleAddToWatchlist}
                disabled
              >
                Add to Watchlist
              </button>
            )}
          </div>
          <div className="companyModalButtonContainer">
            <OpenModalButton
              className="companyBuySellModal"
              buttonText="Buy"
              onItemClick={closeMenu}
              modalComponent={
                <BuyFormModal
                  prices={prices}
                  id={user.id}
                  companyId={company.id}
                  portfolio={currentUserPortfolio}
                />
              }
            />
            <OpenModalButton
              className="companyBuySellModal"
              buttonText="Sell"
              onItemClick={closeMenu}
              modalComponent={
                <SellFormModal
                  prices={prices}
                  id={user.id}
                  companyId={company.id}
                  user={user}
                  portfolio={currentUserPortfolio}
                  ticker={company.ticker}
                />
              }
            />
          </div>
        </div>
      </>
    );
  } else {
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
      </div>
    );
  }
};

export default CompanyDetails;
