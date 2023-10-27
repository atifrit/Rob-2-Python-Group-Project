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
        if (data.status>400) {
            let res = await data.json();
            let errorsStrings = []
            for (let el of res.errors) {
                for (let i in el){
                    if (el[i] === ':') {
                        errorsStrings.push(el.slice(Number(i) + 1))
                    }
                }
            }
            setErrors(errorsStrings);
        } else {
            closeModal()
        }
      };

    return (
        <>
            <h1>How Many Shares Would you Like to Purchase?</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <p>You have ${props.portfolio.balance} remaining</p>
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
