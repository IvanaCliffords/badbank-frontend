import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Form, } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useUsers } from '../UserContext.js';


function ATMDeposit({ onChange, isValid }) {
    return (
        <label className="label huge"><br />
            <p>Please enter the ammount</p>
            <input className="ammount-input" type="number" width="200" placeholder="$0" onChange={onChange}></input>
            <br />
            <input type="submit" disabled={!isValid} value="Submit"></input>

        </label >
    );
};


function Deposit() {
    const [deposit, setDeposit] = useState(0);
    // const [isDeposit, setIsDeposit] = useState(true);
    const [validTransaction, setValidTransaction] = useState(false);
    const { state, dispatch } = useUsers();

    useEffect(() => {
        if (!state.loggedInUser) {
            alert('You have to be logged in to make deposits.');
        }
    }, [state.loggedInUser]);


    function handleChange(event) {

        if (Number(event.target.value) < 0) {
            alert('Negative deposit is not allowed');
            event.target.value = 0;
            return setValidTransaction(false);
        }
        if (Number(event.target.value) <= 0) {
            return setValidTransaction(false);
        }
        else {
            setValidTransaction(true);
        }
        setDeposit(Number(event.target.value));
    };

    function handleSubmit(event) {
        event.preventDefault();
        dispatch({
            type: 'deposit',
            payload: deposit
        })
        setValidTransaction(false);
        alert('Success, your deposit will be added to your balance!');
    };


    return (
        <>
            {!state.loggedInUser ? (
                <Redirect
                    to='/login'
                />

            ) : (

                <Card
                    style={{ width: '20rem' }}
                    className="card-style"
                >
                    <Card.Body>
                        <Card.Title>Deposit</Card.Title>
                        <hr />
                        <>
                            <Form onSubmit={handleSubmit}>
                                <>

                                    <h2 id="total">Account Balance ${state.loggedInUser.balance}</h2>
                                    <ATMDeposit
                                        onChange={handleChange}
                                        // isDeposit={isDeposit}
                                        isValid={validTransaction}
                                    ></ATMDeposit>


                                </>
                            </Form>
                        </>
                    </Card.Body>
                </Card>

            )
            }
        </>

    );
}

export default Deposit;