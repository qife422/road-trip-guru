/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

import FormBase from '../components/FormBase'

export default function Update({ recordList }) {
    return (
        <FormBase
            title="Update data"
            recordList={recordList}
            submitLabel="Update"
            submitColor="primary"
            onSubmit={(data) => console.log('update', data)}
            viewForm={false}
        />
    )
}