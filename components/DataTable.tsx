import {
    Table, TableBody, TableCaption, TableCell, TableHead, TableRow, TableHeader
} from "@/components/ui/table"

import React from 'react'

const DataTable = () => {
    return (
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$270.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
export default DataTable
