/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

import { getRoadTripRoutes } from "../../../lib/api";
import { useState, useEffect } from "react";

export default function RoadTripOptions({ name, value, onChange, disabled = false }) {
    const [roadTrips, setRoadTrips] = useState([]);

    useEffect(() => {
        async function fetchRoadTrips() {
            try {
                const data = await getRoadTripRoutes();
                setRoadTrips(data);
                console.log(data)
            } catch (error) {
                console.error("Failed to fetch road trips:", error);
            }
        }

        fetchRoadTrips();
    }, []);

    useEffect(() => {
        async function fetchRoadTrips() {
            try {
                const data = await getRoadTripRoutes();

                console.log("ROAD TRIPS:", data);

                setRoadTrips(data);
            } catch (error) {
                console.error("Failed to fetch road trips:", error);
            }
        }

        fetchRoadTrips();
    }, []);

    return (
        <select
            id={name}
            name={name}
            value={value || ""}
            onChange={onChange}
            className="form-input"
            disabled={disabled}
        >
            <option value="">
                Select a road trip
            </option>

            {roadTrips.map(roadTrip => (
                <option
                    key={roadTrip.road_trip_id}
                    value={roadTrip.road_trip_id}
                >
                    {roadTrip.road_trip_name}
                </option>
            ))}
        </select>
    );
}