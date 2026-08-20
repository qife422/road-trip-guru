/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

// Table uses Material UI for generation + column management

/*

Citation:
File level -
Asked ChatGPT:
"With the current Material UI components in place, help me utilize
Material UI's Grid functionality. This is meant to be used with my data
types (inserted data types)."

"Assist with mapping over existing object keys to display in a tabular
format for compatibility with Material UI."

*/



import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import {
    getPlaces,
    getAttractions,
    getRoadTrippers,
    getRoadTripRoutes,
    getTripBudgets,
    getRoadTripPlaces
} from '../../lib/api.js'

const fetchMap = {
    attractions: getAttractions,
    places: getPlaces,
    roadTrippers: getRoadTrippers,
    roadTripRoutes: getRoadTripRoutes,
    tripBudgets: getTripBudgets,
    roadTripPlaces: getRoadTripPlaces,
}

const primaryKeyMap = {
    attractions: 'attraction_id',
    places: 'place_id',
    roadTrippers: 'road_tripper_id',
    roadTripRoutes: 'road_trip_id',
    tripBudgets: 'trip_budget_id',
    roadTripPlaces: 'road_trip_place_id',
}

export default function Table({ recordType, onEdit, onDelete, onView, refreshKey }) {
    const [rows, setRows] = useState([])

    useEffect(() => {
        async function fetchData() {
            const fetchFn = fetchMap[recordType]

            if (!fetchFn) return

            const data = await fetchFn()
            setRows(data)
        }

        fetchData()
    }, [recordType, refreshKey])

    if (rows.length === 0) {
        return <p>No records found.</p>
    }

    const primaryKey = primaryKeyMap[recordType]

    const dataColumns = Object.keys(rows[0]).map((col) => ({
        field: col,
        headerName: col,
        flex: 1,
    }))

    const actionColumn = {
        field: 'actions',
        headerName: 'Actions',
        width: 300,
        sortable: false,
        filterable: false,

        renderCell: (params) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    width: '100%',
                    whiteSpace: 'nowrap'
                }}
            >
                {onEdit && (
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => onEdit(params.row)}
                    >
                        Edit
                    </Button>
                )}

                {onDelete && (
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => onDelete(params.row)}
                    >
                        Delete
                    </Button>
                )}

                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onView(params.row)}
                >
                    View Details
                </Button>
            </Box>
        ),
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={onView ? [...dataColumns, actionColumn] : dataColumns}
                getRowId={(row) => row[primaryKey]}
                showToolbar
            />
        </div>
    )
}
