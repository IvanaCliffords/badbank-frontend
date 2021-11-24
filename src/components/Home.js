import { useUsers } from '../UserContext';
import { Card } from 'react-bootstrap';
function Home() {

    const { state } = useUsers();
    let message;

    if (state.loggedInUser === null) {
        message = (
            <div>
                You are not logged in.
            </div>
        );
    } else {
        message = (
            <div>
                Welcome back {state.loggedInUser.name}!
                <br />
                Your balance is ${state.loggedInUser.balance}.
            </div>
        );
    }

    return (
        <>
            <Card style={{ width: '20em' }} className="card-style">
                <Card.Body>
                    <Card.Title>Bad Bank</Card.Title>
                    <hr />
                    <Card.Text>
                        <p className="home-p">You probably don't want to do business with us.</p>
                        <hr />
                        {message}
                    </Card.Text>

                </Card.Body>
                <Card.Img src="bank.png" style={{ width: '15rem' }} className="home-image" />
            </Card>
        </>
    );
}

export default Home;