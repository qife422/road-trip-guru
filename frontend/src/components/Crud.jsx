/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

import './Crud.css'
import { useState } from 'react'
import Create from './CreateForm'
import Edit from './EditForm'

import {
    roadTrippers,
    roadTripPlaces,
    roadTripRoutes,
    attractions,
    places,
    tripBudgets
} from '../types/data'

const entityData = {
    places,
    tripBudgets,
    attractions,
    roadTripRoutes,
    roadTripPlaces,
    roadTrippers,
}

const creatableEntities = new Set([
    'attractions',
    'roadTripRoutes',
    'roadTripPlaces',
    'roadTrippers',
])

export default function Crud({ entityType, onReset }) {
    const [isOpen, setIsOpen] = useState("")

    const isReset = entityType === "reset"
    const data = entityData[entityType]
    const canCreate = creatableEntities.has(entityType)

    if (!isReset && !data) {
        console.error(`No entity type found: ${entityType}`)
    }

    function handleClose() {
        setIsOpen("")
    }

    return (
        <>
            <div className="crud-container">

                {isReset ? (
                    <button
                        className="crud-button delete"
                        onClick={onReset}
                    >
                        Reset all records
                    </button>
                ) : canCreate ? (
                    <>
                        <button
                            onClick={() => setIsOpen("create")}
                            className="crud-button create"
                        >
                            Create Record
                        </button>

                    </>
                ) : null}

            </div>

            {isOpen === "create" && (
                <Create
                    recordList={data}
                    entityType={entityType}
                    onClose={handleClose}
                />
            )}

            {isOpen === "edit" && (
                <Edit
                    recordList={data}
                    entityType={entityType}
                    onClose={handleClose}
                />
            )}
        </>
    )
}
