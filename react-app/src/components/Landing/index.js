import "./Landing.css";
import Navigation from "../Navigation";

export default function Landing() {
  return (
    <div className="landing-page">
      <div className="nav"></div>
      <div className="landing-container">
        <img
          className="landing-image"
          src={
            "https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_invest__91b9077cf4788b508a013b9dda8c3ffe4d4fff969655c212a0201c9533237d46.png"
          }
        />
        <div className="title-container">
          <div className="title-text">Investing</div>
          <div className="sub-title-text">
            Build your portfolio starting with just $1
          </div>
          <div className="land-txt">
            Invest in stocks, options, and ETFs at your pace and
            commission-free.
          </div>
        </div>
      </div>
      <div className="retirement-container">
        <img
          className="retirement-image"
          src={
            "https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_retirement__cedde6412904170eb293d6e501ffe3b87291e8e174821856da6c4a5a3a0cb025.png"
          }
        />
        <div className="retirement-title-container">
          <div className="retirement-title-text">Retirement</div>
          <div className="retirement-sub-title-text">
            The only IRA with a match.
          </div>
          <div className="retirement-txt">
            Introducing canaryhood Retirement– Get a 1% match,<br></br> custom
            recommended portfolios, and no commission fees.
          </div>
        </div>
      </div>
    </div>
  );
}
