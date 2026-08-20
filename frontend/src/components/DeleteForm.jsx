/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

import FormBase from './FormBase';
import { deleteAttraction, deleteRoadTripPlaces } from '../../lib/api';
import { useState } from 'react';

export default function DeleteForm({
    recordList,
    entityType,
    onClose
}) {
    const [message, setMessage] = useState("");

    async function handleSubmit(data) {
        let result;

        if (entityType === "attractions") {
            result = await deleteAttraction(data);
        }

        if (entityType === "roadTripPlaces") {
            result = await deleteRoadTripPlaces(data);
        }

        if (!result) {
            setMessage("Error: Delete operation not supported.");
            return;
        }

        if (result.error) {
            setMessage(`Error: ${result.error}`);
        } else {
            setMessage(result.message);
        }
    }

    function handleClose() {
        setMessage("");
        onClose?.();
    }

    return (
        <FormBase
            recordList={recordList}
            submitLabel="Delete"
            onSubmit={handleSubmit}
            onClose={handleClose}
            message={message}
            viewForm={false}
        />
    );
}