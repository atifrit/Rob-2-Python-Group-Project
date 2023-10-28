import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { getUserPortfolio } from "../../store/portfolios";
import {
  getUserWatchlist,
  createNewWatchlist,
  deleteWatchlistById,
} from "../../store/watchlists";
import { Link } from "react-router-dom";
import { getAllCompanies } from "../../store/companies";
import "./portfolio.css";
import OpenModalButton from "../OpenModalButton";
import DeleteWatchlistFormModal from "../DeleteWatchlistFormModal";
import AddFundsModal from "../AddFundsModal";
import RemoveFundsModal from "../RemoveFundsModal";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";

const PortfolioDetails = () => {
  const dispatch = useDispatch();
  const { currentUserPortfolio } = useSelector((state) => state.portfolios);
  const { currentUserWatchlist } = useSelector((state) => state.watchlists);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const allCompanies = useSelector((state) => state.companies.byId);
  const { modalContent, setModalContent } = useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioBalance, setPortfolioBalance] = useState(null);
  const [isCreateWatchlistDisabled, setIsCreateWatchlistDisabled] =
    useState(true);
  const [chartData, setChartData] = useState(null);
  const [reRendered, setReRendered] = useState(false);

  const transactions = currentUserPortfolio
    ? currentUserPortfolio.transactions || []
    : [];

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
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "nearest",
        intersect: false,
        callbacks: {
          label: function (context) {
            return `Portfolio value: ${context.parsed.y}`;
          },
        },
      },
    },
    responsive: true,
  };

  useEffect(() => {
    if (!currentUserPortfolio) {
      dispatch(getUserPortfolio());
    }
    if (!currentUserWatchlist) {
      dispatch(getUserWatchlist());
    }

    const handleClickOutsideModal = (e) => {
      if (modalContent && isModalOpen && !e.target.closest(".modal-content")) {
        setIsModalOpen(false);
        setModalContent(null);
      }
    };

    document.addEventListener("click", handleClickOutsideModal);

    return () => {
      document.removeEventListener("click", handleClickOutsideModal);
    };
  }, [
    dispatch,
    currentUserPortfolio,
    currentUserWatchlist,
    modalContent,
    isModalOpen,
    setModalContent,
  ]);

  useEffect(() => {
    if (Object.values(allCompanies).length < 1) {
      dispatch(getAllCompanies());
    }

    if (
      currentUserPortfolio !== null &&
      currentUserPortfolio.balance !== null
    ) {
      setIsLoading(false);
      setPortfolioBalance(currentUserPortfolio.balance);
    }
  }, [dispatch, allCompanies, currentUserPortfolio]);

  useEffect(() => {
    if (chartData === null) {
      let allPrices;

      if (Object.values(allCompanies).length) {
        allPrices = transactions.map((transaction, index) => {
          let resindex;
          for (let i = 0; i < Object.values(allCompanies).length; i++) {
            let company = allCompanies[i][i + 1];
            if (company && transaction.ticker === company.ticker) {
              resindex = i;
            }
          }
          let selectedCompany = allCompanies[resindex];
          if (selectedCompany) {
            return {
              [transaction?.ticker]: allCompanies[resindex][resindex + 1],
            };
          }
        });
      }

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

      let priceArrs = [];

      if (allPrices && allPrices.length) {
        for (let i = 0; i < allPrices.length; i++) {
          const currentCompany = allPrices[i];
          for (const ticker in currentCompany) {
            if (currentCompany.hasOwnProperty(ticker)) {
              const price = currentCompany[ticker].price;
              priceArrs.push(priceGenerator(price, 30, Progressions));
            }
          }
        }
      }

      let priceData = [];
      if (priceArrs.length) {
        for (let i = 0; i < priceArrs[0].length; i++) {
          let sum = 0;
          for (let j = 0; j < priceArrs.length; j++) {
            const priceValue = parseFloat(priceArrs[j][i]);
            sum += priceValue;
          }
          priceData.push(sum);
        }
      }

      const newChartData = {
        labels: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        ].reverse(),
        datasets: [
          {
            label: "Value",
            data: priceData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor:
              priceData[0] < priceData[priceData.length - 1] ? "green" : "red",
            borderWidth: 3,
          },
        ],
      };
      console.log("Updating chartData to:", newChartData);
      console.log("Is Chart Data Null?", chartData === null);
      console.log("Chart Data:", JSON.stringify(chartData));
      setChartData(newChartData);

      console.log("Updated Chart Data:", JSON.stringify(chartData));
    }
  }, [chartData, allCompanies, transactions]);

  useEffect(() => {
    console.log("Updated Chart Data2:", JSON.stringify(chartData));
  }, [chartData]);

  useEffect(() => {
    if (!reRendered) {
      const timer = setTimeout(() => {
        setChartData(null);
        setReRendered(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [reRendered]);

  if (!currentUserPortfolio || !currentUserWatchlist) {
    return <div>Loading...</div>;
  }

  const handleCreateWatchlist = () => {
    if (newWatchlistName.trim() !== "") {
      dispatch(createNewWatchlist(newWatchlistName));
      setNewWatchlistName("");
      setIsCreateWatchlistDisabled(true);
    }
  };

  const handleDeleteWatchlist = (watchlistId) => {
    setIsModalOpen(true);
    setModalContent(
      <DeleteWatchlistFormModal
        watchlistId={watchlistId}
        onClose={() => setIsModalOpen(false)}
      />
    );
  };

  const handleRemoveFunds = () => {
    setIsModalOpen(true);
    setModalContent(<RemoveFundsModal onClose={() => setIsModalOpen(false)} />);
  };

  const handleAddFunds = () => {
    setIsModalOpen(true);
    setModalContent(<AddFundsModal onClose={() => setIsModalOpen(false)} />);
  };

  let transactionObj = {};
  let sharesOwnedArr = [];
  let tickerCompanyIdObj = {};

  for (let i of transactions) {
    tickerCompanyIdObj[i.ticker] = i.company_id;
  }

  for (let i of transactions) {
    let ticker = i.ticker;
    if (Object.keys(transactionObj).includes(ticker)) {
      transactionObj[ticker].push(i.shares_owned);
    } else {
      transactionObj[ticker] = [i.shares_owned];
    }
  }

  for (let key in transactionObj) {
    let tickObj = {};
    let sum = 0;
    for (let el of transactionObj[key]) {
      sum += el;
    }
    tickObj[key] = sum;
    sharesOwnedArr.push(tickObj);
  }

  return (
    <div>
      <div className="portfolio-container">
        <div className="chart-container">
          <div className="detailsgraph">
            {chartData && <Line options={options} data={chartData} />}
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <p>
              Funds: $
              {portfolioBalance !== null
                ? portfolioBalance.toFixed(2)
                : "Loading..."}{" "}
            </p>
          )}
          <h3>Stocks</h3>
          <ul>
            {sharesOwnedArr.map((stock) => {
              if (Number(Object.values(stock)[0]) > 0) {
                return (
                  <li className="portfolioShares">
                    {/* /companies/${transactions[Object.keys(stock)[0]].company_id} */}
                    <Link
                      to={`/companies/${
                        tickerCompanyIdObj[Object.keys(stock)[0]]
                      }`}
                    >
                      {Object.keys(stock)[0]}
                    </Link>
                    <br />
                    {Object.values(stock)[0]} shares
                    <br />
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
        <div className="info-container">
          <h3>Watchlists</h3>
          {currentUserWatchlist.map((watchlist, watchlistIndex) => (
            <div key={watchlistIndex}>
              <h4>{watchlist.name}</h4>
              <button
                className="delete-watchlist-btn"
                onClick={() => handleDeleteWatchlist(watchlist.id)}
              >
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
          <div className="new-watchlist-container">
            <input
              className="new-watchlist-input"
              type="text"
              placeholder="New Watchlist Name"
              value={newWatchlistName}
              onChange={(e) => {
                setNewWatchlistName(e.target.value);
                setIsCreateWatchlistDisabled(e.target.value === "");
              }}
            />
            <button
              className="create-watchlist-btn"
              onClick={handleCreateWatchlist}
              disabled={isCreateWatchlistDisabled}
            >
              Create New Watchlist
            </button>
          </div>
        </div>
        <button className="add-funds-btn" onClick={handleAddFunds}>
          Add Funds
        </button>
        <button className="withdraw-funds-btn" onClick={handleRemoveFunds}>
          Withdraw Funds
        </button>
      </div>
      {isModalOpen && modalContent}
    </div>
  );
};

export default PortfolioDetails;
