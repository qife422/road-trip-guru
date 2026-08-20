
/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

import Crud from "../components/Crud"
import Table from "../components/Table"
import { useState } from "react";
import Edit from "../components/EditForm";
import View from "../components/ViewForm"
import {
    deleteRoadTripRoutes,
} from "../../lib/api";

import { roadTripRoutes } from "../types/data";

export default function RoadTripRoutes() {
    const [editingRow, setEditingRow] = useState(null);
    const [viewingRow, setViewingRow] = useState(null);
    const [tableRefresh, setTableRefresh] = useState(0);

    async function handleDelete(row) {
        console.log("Deleting row:", row);

        const result = await deleteRoadTripRoutes({
            road_trip_id: row.road_trip_id
        });

        if (result.error) {
            alert(result.error);
            return;
        }

        // Tell the table to fetch its data again
        // For citation, prompt: Chat GPT - 'table refresh with props for React'
        setTableRefresh(prev => prev + 1);
    }

    function handleEdit(row) {
        console.log("Editing row:", row);
        setEditingRow(row);
    }

    function handleCloseEdit() {
        setEditingRow(null);
    }

    function handleView(row) {
        setViewingRow(row);
    }

    function handleCloseView() {
        setViewingRow(null)
    }



    return (
        <>
            <h1> RoadTripRoutes</h1>
            <p> Represents a road trip route that helps users organize their planned trips, destinations, and travel information. The start_date and end_date attributes can be NULL because users may create a route before finalizing their travel schedule. Additionally, users may not want to declare these dates when creating the road trip, as they may not know the exact dates that work with their schedule until later on.</p>
            <Crud entityType="roadTripRoutes"></Crud>
            <Table
                recordType="roadTripRoutes"
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                refreshKey={tableRefresh}
            />

            {editingRow && (
                <Edit
                    row={editingRow}
                    recordList={roadTripRoutes}
                    entityType="roadTripRoutes"
                    onClose={handleCloseEdit}
                />

            )}

            {viewingRow && (
                <View
                    row={viewingRow}
                    recordList={roadTripRoutes}
                    entityType="roadTripRoutes"
                    onClose={handleCloseView}

                />
            )}
        </>
    )
}