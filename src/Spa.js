
import { Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar.js';
import Home from './components/Home.js';
import CreateAccount from './components/CreateAccount.js';
import Login from './components/Login.js';
import Deposit from './components/Deposit.js';
import Withdraw from './components/Withdraw.js';
import AllData from './components/AllData.js';
import { UserProvider } from './UserContext.js';


function Spa() {
  return (
    <UserProvider>
      <HashRouter>
        <NavBar />
        <Route path='/' exact component={Home} />
        <Route path='/createaccount' component={CreateAccount} />
        <Route path='/login' component={Login} />
        <Route path='/deposit' component={Deposit} />
        <Route path='/withdraw' component={Withdraw} />
        <Route path='/alldata' component={AllData} />
      </HashRouter>
    </UserProvider>
  );
}

export default Spa;