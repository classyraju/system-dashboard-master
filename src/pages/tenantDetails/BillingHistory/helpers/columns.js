 import { Chip } from '@material-ui/core';
import React from 'react'
import { getFormattedAmount } from '../../helper/currencyHelper';
export const BillingHistoryOfTenantColumn = () => [
    {
        title: 'Billing Status',
        field: 'billingStatus',
        render: (rowData) => (rowData.billingStatus!=='paid'?
        <div className="chip-unpaid"><Chip label={rowData.billingStatus} variant="outlined" className="status-chip "> </Chip></div>
        :<div className="chip-active"><Chip label={rowData.billingStatus} variant="outlined" className="status-chip"> </Chip></div>)

    },
    {
        title: 'Email',
        field: 'email',

    },
    {
        title: 'Paid at',
        field:'paidAt',
    },
    {
        title: 'Bill cycle starts',
        field:'billCycleStart',
    },
    {
        title: 'Bill cycle ends',
        field:'billCycleEnd',
    },
    {
        title: 'View Invoice',
        field:'invoiceUrl',
        render: (rowData) => <a target='_blank'href={rowData.invoiceUrl}>View</a>
    },
    {
        title: 'Amount (USD)',
        field:'amount',
        render: (rowData) => getFormattedAmount(rowData.amount),
    },

];