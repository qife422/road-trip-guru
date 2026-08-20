/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */


import Crud from '../components/Crud.jsx'
import ResetModal from '../components/ResetModal.jsx'
import { useState } from 'react'

export default function Home() {
    const [resetOpen, setResetOpen] = useState(false)

    return (
        <>
            <h1>Welcome to Road Trip Guru</h1>
            <p>This web application serves as a way to manage the records within
                Road Trip Guru's entity tables.
            </p>
            <Crud entityType="reset" onReset={() => setResetOpen(true)} />
            <ResetModal open={resetOpen} setResetOpen={setResetOpen} />
        </>
    )
}