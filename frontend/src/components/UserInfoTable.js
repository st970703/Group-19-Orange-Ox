import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAuth0 } from "@auth0/auth0-react";

function UserInfoTable() {
    const { user } = useAuth0();

    const userProperties = Object.keys(user).sort();

    return (
        <TableContainer component={Paper}>
            <Table aria-label="User_Info_Table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Property</b></TableCell>
                        <TableCell><b>Value</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userProperties.map((property) => (
                        <TableRow key={property}>
                            <TableCell component="th" scope="row">
                                {property}
                            </TableCell>
                            <TableCell>{user[property]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}

export default UserInfoTable