import { useEffect, useMemo, useState } from "react";
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
import calculateReward from "../utils/calculateReward";
import { MONTH_NAMES } from "../constants";

function OutputTable({ isLoading, data }) {
  const [rewardTotal, setRewardTotal] = useState({});
  const [curMonth, setCurMonth] = useState(0);
  const [customers, setCustomers] = useState([]);
  const months = useMemo(() => {
    return [2, 1, 0].map((index) => {
      let monthNameIndex = curMonth - index;
      if (monthNameIndex < 0) {
        monthNameIndex += 12;
      }
      return MONTH_NAMES[monthNameIndex];
    });
  }, [curMonth]);

  useEffect(() => {
    let result = {};
    let cus = [];
    if (!isLoading) {
      const threeMonthAgo = new Date();
      setCurMonth(threeMonthAgo.getMonth());
      threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 2);
      data.forEach((element) => {
        let d = new Date(element.timestamp);
        if (!cus.includes(element.customer)) {
          cus.push(element.customer);
        }
        if (d > threeMonthAgo) {
          let month = MONTH_NAMES[d.getMonth()];
          let reward = calculateReward(element.amount);
          if (!result[element.customer]) {
            result[element.customer] = { total: 0 };
          }
          if (!result[element.customer][month])
            result[element.customer][month] = 0;
          result[element.customer][month] += reward;
          result[element.customer]["total"] += reward;
        }
      });
      setCustomers(cus);
      setRewardTotal(result);
    }
    // eslint-disable-next-line
  }, [isLoading, data]);

  return (
    <>
      <Typography variant="h4" my={2}>
        Rewards
      </Typography>

      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                {months.map((m) => (
                  <TableCell key={m}>{m}</TableCell>
                ))}
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                customers.map((customer) => (
                  <TableRow key={customer}>
                    <TableCell>{customer}</TableCell>
                    {months.map((m) => (
                      <TableCell key={m}>
                        {rewardTotal[customer]
                          ? rewardTotal[customer][m] || 0
                          : 0}
                      </TableCell>
                    ))}
                    <TableCell>
                      {rewardTotal[customer]
                        ? rewardTotal[customer]["total"] || 0
                        : 0}
                    </TableCell>
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
}

export default OutputTable;
