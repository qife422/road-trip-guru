/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

import { getRoadTrippers } from "../../../lib/api";
import { useState, useEffect } from "react";

export default function RoadTripperOptions({
    name,
    value,
    onChange,
    disabled = false
}) {
    const [roadTrippers, setRoadTrippers] = useState([]);

    useEffect(() => {
        async function fetchRoadTrippers() {
            try {
                const data = await getRoadTrippers();

                console.log("ROAD TRIPPERS:", data);

                setRoadTrippers(data);
            } catch (error) {
                console.error("Failed to fetch road trippers:", error);
            }
        }

        fetchRoadTrippers();
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
                Select a road tripper
            </option>

            {roadTrippers.map(roadTripper => (
                <option
                    key={roadTripper.road_tripper_id}
                    value={roadTripper.road_tripper_id}
                >
                    {roadTripper.username}
                </option>
            ))}
        </select>
    );
}