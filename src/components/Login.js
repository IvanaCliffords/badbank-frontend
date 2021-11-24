
import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useUsers } from '../UserContext.js';


function Login() {
    const { state, dispatch } = useUsers();
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showStatus, setShowStatus] = useState(false);


    useEffect(() => {
        if (!state.user) {
            alert('You have to have an account before you can log in.');
        }
    }, [state.user]);



    function validate(field, label) {

        const user = state.users.filter(user => email === user.email);

        if (field === undefined) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            setShowStatus(true);


            return false;
        }
        if (!user) {
            setStatus('No account with this email');
            setTimeout(() => setStatus(''), 3000);
            setShowStatus(true);

            return false;
        }
        if (password !== user[0].password) {
            setStatus('No user with this password');
            setTimeout(() => setStatus(''), 3000);
            setShowStatus(true);

            return false;
        }

        setStatus('Successful login!')
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 3000);
        clearForm();

        return true;
    }

    function handleLogin(event) {
        event.preventDefault();
        console.log(email, password);
        if (!validate(email, 'email')) return;
        if (!validate(password, 'password')) return;
        const loggedInUser = state.users.filter(user => email === user.email)[0];

        dispatch({
            type: 'login',
            payload: loggedInUser
        })
    }



    function clearForm() {
        setEmail('');
        setPassword('');
    }


    return (
        <>


            <Card
                style={{ width: '20rem' }}
                className="card-style"
            >
                <Card.Body>

                    <Card.Title>Login</Card.Title>
                    <hr />
                    <>
                        <Form
                            onSubmit={handleLogin}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={event => setEmail(event.currentTarget.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password} onChange={event => setPassword(event.currentTarget.value)} />
                            </Form.Group>

                            <Button
                                variant="dark"
                                type="submit">
                                Login
                            </Button>
                            {showStatus && <p>{status}</p>}
                        </Form>
                    </>
                </Card.Body>
            </Card>

        </>
    );
}

export default Login;