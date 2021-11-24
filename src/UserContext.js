
import { createContext, useReducer, useContext } from 'react';

const UserContext = createContext(null);
const userReducer = (state, action) => {
    switch (action.type) {
        case 'create_account':
            return {
                ...state,
                users: [...state.users, action.payload]
            }

        case 'login':
            return {
                ...state,
                loggedInUser: action.payload
            }

        case 'deposit':
            return {

                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    balance: state.loggedInUser.balance + action.payload,
                    // balance: state.users.balance + action.payload
                }
            }
        case 'withdraw':
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    balance: state.loggedInUser.balance - action.payload,
                    // balance: state.users.balance - action.payload
                }
            }
        default:
            return state;
    }
}

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {
        loggedInUser: null,
        users: [
            { name: 'Ivana', email: 'ivana.cliffords@gmail.com', password: 'password', balance: 100 }
        ]
    });
    const value = { state, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}
const useUsers = () => {
    const context = useContext(UserContext);
    return context;
}

export { UserProvider, useUsers, UserContext };