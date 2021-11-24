import React from "react";
import { UserContext } from "./UserContext.js";

function NavBar() {
  return (
    <UserContext.Consumer>
      {(state) => (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a
            className="navbar-brand"
            href="#"
            title="You probably want to choose another bank"
          >
            <img src="bank.png" alt="bad bank logo" width="24" height="24" />
            Bad Bank
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  title="You can create your account"
                  href="#/createaccount/"
                >
                  Create Account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" title="You can login" href="#/login/">
                  Login
                </a>
              </li>
              {/* {state.loggedInUser && ( */}
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    title="Deposit money into your account"
                    href="#/deposit/"
                  >
                    Deposit
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    title="Withdraw money from your account"
                    href="#/withdraw/"
                  >
                    Withdraw
                  </a>
                </li>
              </>

              <li className="nav-item">
                <a
                  className="nav-link"
                  title="Users and their information"
                  href="#/alldata/"
                >
                  AllData
                </a>
              </li>
              {/* )} */}
            </ul>
          </div>
        </nav>
      )}
    </UserContext.Consumer>
  );
}
export default NavBar;
