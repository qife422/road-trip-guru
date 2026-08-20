/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

import Crud from "../components/Crud"
import Table from "../components/Table"
import { tripBudgets } from "../types/data";
import { useState } from "react";
import View from "../components/ViewForm"

export default function TripBudgets() {
    const [viewingRow, setViewingRow] = useState(null);
    const [tableRefresh, setTableRefresh] = useState(0);


    function handleView(row) {
        setViewingRow(row);
    }

    function handleCloseView() {
        setViewingRow(null)
    }


    return (
        <>
            <h1> TripBudgets </h1>
            <p> Represents budget information related to a road trip route, allowing users to track overall and daily spending limits. The budget attributes can be NULL because users may create a road trip before deciding their budget. </p>
            <Crud entityType="tripBudgets"></Crud>
            <Table
                recordType="tripBudgets"
                onView={handleView}
                refreshKey={tableRefresh}
            />

            {viewingRow && (
                <View
                    row={viewingRow}
                    recordList={tripBudgets}
                    entityType="tripBudgets"
                    onClose={handleCloseView}

                />
            )}
        </>
    )
}