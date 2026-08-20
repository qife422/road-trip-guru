/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

// Create form, reusable across all entities

import FormBase from '../components/FormBase'
import { useState } from 'react'
import { postUser, postAttractions, postRoadTripPlaces, postRoadTripRoutes } from '../../lib/api'

export default function Create({ recordList, onClose, entityType, viewForm = false }) {
    const [message, setMessage] = useState("")

    async function handleSubmit(data) {
        let result

        if (entityType === "roadTrippers") {
            result = await postUser(data)

        }
        else if (entityType === "roadTripPlaces") {
            result = await postRoadTripPlaces(data)

        }
        else if (entityType === "attractions") {

            result = await postAttractions(data);
        }

        else if (entityType === "roadTripRoutes") {
            result = await postRoadTripRoutes(data)

        }
        else {
            return
        }

        if (result?.error) {
            setMessage(`Error: ${result.error}`)
        } else {
            setMessage(
                result?.message || "Record created successfully"
            )
        }
    }

    function handleClose() {
        setMessage("")
        onClose?.()
    }

    return (
        <FormBase
            title="Create a record"
            recordList={recordList}
            submitLabel="Create"
            onClose={handleClose}
            onSubmit={handleSubmit}
            message={message}
            entityType={entityType}
        />
    )
}
