/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

import Crud from "../components/Crud"
import Table from "../components/Table"
import { roadTrippers } from "../types/data";
import { useState } from "react";
import View from "../components/ViewForm"

export default function RoadTrippers() {
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
            <h1> RoadTrippers</h1>
            <p> Represents an individual user that the road trip belongs to. A single road tripper can create multiple road trips.</p>
            <Crud entityType="roadTrippers"></Crud>
            <Table
                recordType="roadTrippers"
                onView={handleView}
                refreshKey={tableRefresh}
            />



            {viewingRow && (
                <View
                    row={viewingRow}
                    recordList={roadTrippers}
                    entityType="roadTrippers"
                    onClose={handleCloseView}

                />
            )}
        </>
    )
}