import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { getFormattedAmount } from '../helper/currencyHelper';
import { Box, Chip, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SubscriptionBillingHistoryTable(props) {
  const classes = useStyles();
  var sumOfInvoice=0;
for(var i=0;i<props.invoices.length;i++){
  sumOfInvoice=sumOfInvoice+props.invoices[i].stripeInvoice.amount_paid;
}
  return (
    <TableContainer >
      <Table className={classes.table} aria-label="Subscription Billing History Table">
        <TableHead>
          <TableRow>
       
            <TableCell>Billing Status</TableCell>
            <TableCell>Email</TableCell>
          
            <TableCell >Paid at</TableCell>
            <TableCell >Bill cycle starts</TableCell>
            <TableCell >Bill cycle ends</TableCell>
            <TableCell >View Invoice</TableCell>
            <TableCell align="right">Amount&nbsp;(USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.invoices.map((row,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
              {row.status!=='paid' &&
                         <div className="chip-unpaid"><Chip label={row.status} variant="outlined" className="status-chip "> </Chip></div>
              }
              {row.status==='paid' &&
                <div className="chip-active"><Chip label={row.status} variant="outlined" className="status-chip"> </Chip></div>
              }
      
              </TableCell>
              <TableCell component="th" scope="row">
               { row.stripeInvoice.customer_email}
              </TableCell>
         
              <TableCell align="left">{moment.unix(row.stripeInvoice.status_transitions.paid_at).format('YYYY/MM/DD')}</TableCell>
              <TableCell align="left">{moment.unix(row.stripeInvoice.lines.data[0].period.start).format('YYYY/MM/DD')}</TableCell>
              <TableCell align="left">{moment.unix(row.stripeInvoice.lines.data[0].period.end).format('YYYY/MM/DD')}</TableCell>
              <TableCell align="left" >
              <Typography >

              <Link color="primary" className={'link-color'} target='_blank' href={row.stripeInvoice.hosted_invoice_url}>
                View
              </Link>
              </Typography>
              </TableCell>
              <TableCell align="right" component="th" scope="row">
                {getFormattedAmount(row.stripeInvoice.amount_paid)}
              </TableCell>
            </TableRow>
          ))}

            <TableRow>
            <TableCell colSpan={5} />
            <TableCell  align="right" colSpan={1}> <Box fontWeight="fontWeightBold">Total</Box></TableCell>
            <TableCell align="right"> <Box fontWeight="fontWeightBold">{getFormattedAmount(sumOfInvoice)}</Box></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}