/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

// Edit form, reusable across all entities

/*

Citation:
File level -
Asked ChatGPT:
"Help me figure out a method to pass in my data objects from my forms
into my existing methods that call my express API"

*/


import FormBase from "./FormBase";
import { editRoadTrips, editRoadTripPlaces } from "../../lib/api";
import { useState } from "react";

export default function Edit({
    row,
    recordList,
    entityType,
    onClose
}) {
    const [message, setMessage] = useState("");

    async function handleSubmit(data) {
        console.log("EDIT DATA:", data);

        let result;

        // section where we add edit options for the table
        if (entityType === "roadTripPlaces") {
            result = await editRoadTripPlaces({
                road_trip_place_id: row.road_trip_place_id,
                road_trip_id: data.road_trip_id,
                place_id: data.place_id,
                stop_order: data.stop_order
            });
        }

        if (entityType === "roadTripRoutes") {
            result = await editRoadTrips({
                road_trip_id: row.road_trip_id,
                road_tripper_id: data.road_tripper_id,
                road_trip_name: data.road_trip_name,
                distance: data.distance,
                start_date: data.start_date,
                end_date: data.end_date
            });
        }


        if (result?.error) {
            setMessage(`Error: ${result.error}`);
        } else {
            setMessage(
                result?.message || "Record updated successfully"
            );
        }
    }

    return (
        <FormBase
            rowData={row}
            recordList={recordList}
            submitLabel="Edit"
            onClose={onClose}
            onSubmit={handleSubmit}
            message={message}
            className={'card'}
        />
    );
}