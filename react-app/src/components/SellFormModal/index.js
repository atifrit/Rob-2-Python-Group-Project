import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./SellForm.css";

export default function SellFormModal(props) {
    const dispatch = useDispatch();
    const [sellCount, setSellCount] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    console.log('userbalance: ', props.user)

    const handleSubmit = async (e) => {
        e.preventDefault();


        const userId = props.id;
        const companyId = props.companyId
        const negSellCount = sellCount*-1
        const balanceDeduct = props.prices[props.prices.length - 1]*negSellCount
        const ticker = props.ticker

        const response = await fetch('/api/transactions/');
        const transactionsObj = await response.json()
        console.log('transactionsObj', transactionsObj);

        const data = await fetch('/api/transactions/sell', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ negSellCount, userId, companyId, balanceDeduct, ticker }),
          });
        if (data.status>400) {
            // setErrors(data);
            console.log('errors: ', errors)
        } else {
            closeModal()
        }
      };

    return (
        <>
            <h1>How Many Shares Would you Like to Sell?</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Sell:
                    <input
                        type="number"
                        value={sellCount}
                        onChange={(e) => {
                            setSellCount(e.target.value)
                        }}
                        required
                    />
                </label>
                <button type="submit" disabled={(Number(sellCount) >= 1) ? false : true}>Sell</button>
            </form>
        </>
    )
}
