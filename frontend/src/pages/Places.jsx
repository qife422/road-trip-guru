/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */



import Crud from "../components/Crud"
import Table from "../components/Table"
import { places } from "../types/data"
import { useState } from "react"
import View from "../components/ViewForm"

export default function Places() {
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
            <h1> Places </h1>
            <p> A physical place in the world that can be added to a road trip route, such as a city or municipality.</p>
            <Crud entityType="places"></Crud>
            <Table
                recordType="places"
                onView={handleView}
                refreshKey={tableRefresh}
            />

            {viewingRow && (
                <View
                    row={viewingRow}
                    recordList={places}
                    entityType="places"
                    onClose={handleCloseView}

                />
            )}
        </>
    )
}