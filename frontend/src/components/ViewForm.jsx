/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

// View form, reusable across all entities

import FormBase from "./FormBase";

export default function View({
    row,
    recordList,
    onClose
}) {
    return (
        <FormBase
            rowData={row}
            recordList={recordList}
            submitLabel="View Details"
            onClose={onClose}
            viewForm={true}
        />
    );
}