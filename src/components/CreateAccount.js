import React, { useState } from 'react';
import { useUsers } from '../UserContext';
import { Card, Button, Form } from 'react-bootstrap';

function CreateAccount() {


    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { state, dispatch } = useUsers();


    function validate(field, label) {
        if (field === undefined) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }

        if (!field === (/^\d+$/.test(field))) {
            setStatus('Error input can only contain numbers.');
            setTimeout(() => setStatus(''), 3000);

        }

        if (label === 'email') {
            if (state.users.filter((item) => item.email === field).length > 0) {
                alert('Error: This email is already in use');
                setStatus('Error: This email is already in use');

                return false;
            }
            if (!email) {
                alert('Error: Must fill in an email');
                setStatus('Error: Must fill in an email');

                return false;

            }
        }
        if (label === 'name') {
            if (!name) {
                alert('Error: Must fill in a name');
                setStatus('Error: Must fill in a name');
                return false;
            }
        }
        if (label === 'password') {
            if (password.length < 8) {
                alert('Password must be at least 8 characters long!');
                setStatus('Password must be at least 8 characters long!');
                return false;
            }
        }
        setStatus("Success!!")



        return true;
    }

    function handleCreate(event) {
        event.preventDefault();

        console.log('Name: ', name);
        console.log('Email: ', email);
        console.log('Password: ', password);

        if (!validate(name, 'name')) {
            setShow(true);
            return;
        };
        if (!validate(email, 'email')) {
            setShow(true);
            return;
        };
        if (!validate(password, 'password')) {
            setShow(true);
            return;
        };

        // context.users.push({ name: name, email: email, password: password, balance: 100 });
        dispatch({
            type: 'create_account',
            payload: { name, email, password, balance: 100 }
        })

        setShow(true);
        setShowForm(false);
        clearForm();
    }

    function clearForm() {
        setShow(false);
        setName('');
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



                    <Card.Title>Create Account</Card.Title>
                    <hr />
                    {showForm ? (
                        <>
                            <Form onSubmit={handleCreate}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name} onChange={(event) => setName(event.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email} onChange={(event) => setEmail(event.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password} onChange={(event) => setPassword(event.target.value)} />
                                </Form.Group>

                                {show && <p> {status} </p>}

                                <Button variant="dark" type="submit">
                                    Create Account
                                </Button>

                            </Form>





                        </>

                    ) : (
                        <>
                            <hr />
                            <h5>Success!! Account created!</h5>
                            <Button variant="dark" type="submit" onClick={() => setShowForm(true)}>
                                Add another Account
                            </Button>
                        </>
                    )}

                </Card.Body>
            </Card>



        </>
    );
}
export default CreateAccount;