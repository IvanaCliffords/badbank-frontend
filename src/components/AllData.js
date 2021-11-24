import React from 'react';
import { Table, Card } from 'react-bootstrap';
import { useUsers } from '../UserContext.js';

function AllData() {
    const { state } = useUsers();


    console.log(state.users);

    return (
        <Card
            style={{ width: '60rem' }}
            className="card-style">
            <Card.Body>
                <Card.Title>All Data</Card.Title>
                <hr />

                <Table
                    striped bordered hover variant="dark"
                    className="table"

                >

                    < tbody >

                        {
                            state.users.map((item, i) => {
                                return (

                                    <tr key={i + 1}>

                                        <th scope="row">{i + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.password}</td>


                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>
            </Card.Body >
        </Card >


    );
}

export default AllData;