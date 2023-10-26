import React, { useState, useEffect, useSelector } from "react";
import { buyStocksThunkActionCreator } from "../../store/companies";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./BuyForm.css";

export default function BuyFormModal(props) {
    const dispatch = useDispatch();
    const [buyCount, setBuyCount] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    console.log('userbalance: ', props.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const balanceDeduct = props.prices[props.prices.length - 1]*buyCount
        const userId = props.id;
        const companyId = props.companyId

        const data = await fetch('/api/transactions/', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ buyCount, userId, companyId, balanceDeduct }),
          });
        if (data) {
        //   setErrors(data);
            console.log('errors: ', errors)
        } else {
            closeModal()
        }
      };

    return (
        <>
            <h1>How Many Stocks Would you Like to Purchase?</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Buy:
                    <input
                        type="number"
                        value={buyCount}
                        onChange={(e) => {
                            setBuyCount(e.target.value)
                            console.log('buycount: ', Number(buyCount) < 1)
                        }}
                        required
                    />
                </label>
                <button type="submit" disabled={((props.portfolio.balance>(props.prices[props.prices.length - 1]*buyCount)) && Number(buyCount) >= 1) ? false : true}>Purchase</button>
            </form>
        </>
    )
}

//(props.portfolio.balance>(props.prices[props.prices.length - 1]*buyCount))
//Number(buyCount) >= 1
