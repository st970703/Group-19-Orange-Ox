import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useToken from "./UseToken";

function UserInfoTable() {
  const { token } = useToken();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="User_Info_Table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>ID</b>
            </TableCell>
            <TableCell>
              <b>username</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={"user"}>
            <TableCell component="th" scope="row">
              {token.id}
            </TableCell>
            <TableCell>{token.username}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserInfoTable;
