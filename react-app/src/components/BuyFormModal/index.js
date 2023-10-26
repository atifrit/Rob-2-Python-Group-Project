import React, { useState } from "react";
import { buyStocksThunkActionCreator } from "../../store/companies";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./BuyForm.css";

export default function BuyFormModal(props) {
    const dispatch = useDispatch();
    const [buyCount, setBuyCount] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await fetch(`/api/users/${props.id}`)

        const user = await userData.json();
        const userId = user.id;
        const companyId = props.companyId

        console.log('user: ', user);

        const data = await fetch('/api/transactions/', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ buyCount, userId, companyId }),
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
                        onChange={(e) => setBuyCount(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Purchase</button>
            </form>
        </>
    )
}
