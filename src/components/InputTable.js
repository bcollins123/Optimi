import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const InputTable = ({ isLoading, data }) => (
  <>
    <Typography variant="h4" my={2}>Transactions</Typography>
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading ? (
              data.map((row, i) => (
                <TableRow key={row.customer + i}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{new Date(row.timestamp).toDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </>
);

export default InputTable;
