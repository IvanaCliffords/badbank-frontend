import React from "react";
import { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useUsers } from "../UserContext";

function ATMWithdraw({ onChange, isValid }) {
  return (
    <label className="label">
      <br />
      <p>Please enter the ammount</p>
      <input
        className="ammount-input"
        type="number"
        width="200"
        placeholder="$0"
        onChange={onChange}
      ></input>
      <input
        type="submit"
        disabled={!isValid}
        width="200"
        margin="10"
        variant="dark"
        value="Submit"
        id="submit-input"
      ></input>
    </label>
  );
}

function Withdraw() {
  const [withdraw, setWithdraw] = useState(0);
  const [validTransaction, setValidTransaction] = useState(false);
  const { state, dispatch } = useUsers();

  useEffect(() => {
    if (!state.loggedInUser) {
      alert("You have to be logged in to make withdrawal.");
    }
  }, [state.loggedInUser]);

  function handleChange(event) {
    if (Number(event.target.value) < 0) {
      alert("Negative withdrawal is not allowed.");
      event.target.value = 0;
    }
    if (Number(event.target.value) > state.loggedInUser.balance) {
      alert("Insufficient funds.");
      return setValidTransaction(false);
    }
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setWithdraw(Number(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({
      type: "withdraw",
      payload: withdraw,
    });
    setValidTransaction(false);
    // alert('Success, your withdrawal will be deducted from your Balance');
  }

  return (
    <>
      {!state.loggedInUser ? (
        <Redirect to="/login" />
      ) : (
        <Card style={{ width: "20rem" }} className="card-style">
          <Card.Body>
            <Card.Title>Withdraw</Card.Title>
            <hr />
            <>
              <Form onSubmit={handleSubmit}>
                <>
                  <h2 id="total">
                    Account Balance ${state.loggedInUser.balance}
                  </h2>

                  <ATMWithdraw
                    onChange={handleChange}
                    isValid={validTransaction}
                  ></ATMWithdraw>
                </>
              </Form>
            </>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Withdraw;
