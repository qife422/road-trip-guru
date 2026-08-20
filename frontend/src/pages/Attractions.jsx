
/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

import Crud from "../components/Crud"
import Table from "../components/Table"
import { attractions } from "../types/data"
import { useState } from "react"
import View from "../components/ViewForm"
import { deleteAttraction } from "../../lib/api"


export default function Attractions() {
    const [viewingRow, setViewingRow] = useState(null);
    const [tableRefresh, setTableRefresh] = useState(0);


    function handleView(row) {
        setViewingRow(row);
    }

    function handleCloseView() {
        setViewingRow(null)
    }

    async function handleDelete(row) {
        const result = await deleteAttraction({
            attraction_id: row.attraction_id
        })

        if (result.error) {
            alert(result.error)
            return
        }

        setTableRefresh(previous => previous + 1)
    }


    return (
        <>
            <h1>Attractions</h1>
            <p>Represents attractions (interesting shops, geological features, historic sites) that a place may contain.</p>
            <Crud entityType="attractions" />
            <Table
                recordType="attractions"
                onDelete={handleDelete}
                onView={handleView}
                refreshKey={tableRefresh}
            />

            {viewingRow && (
                <View
                    row={viewingRow}
                    recordList={attractions}
                    entityType="attractions"
                    onClose={handleCloseView}

                />
            )}
        </>
    )
}
