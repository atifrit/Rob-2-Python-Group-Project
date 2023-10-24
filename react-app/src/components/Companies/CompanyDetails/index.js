import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../../../store/companies";

const CompanyDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("Company ID:", id);
  const company = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(getCompanyById(Number(id)));
  }, [dispatch, id]);

  if (!company) return <div>Loading...</div>;

  return (
    <div className="company-details">
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
};

export default CompanyDetails;
