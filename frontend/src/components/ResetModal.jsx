/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

import Modal from '@mui/material/Modal'
import { useState } from 'react'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import { BASE_URL } from '../../lib/api.js'

export default function ResetModal({ open, setResetOpen }) {
    const [message, setMessage] = useState(null)

    async function resetTables() {
        try {
            const response = await fetch(`${BASE_URL}/reset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            const result = await response.json()

            if (!response.ok) {
                setMessage(`Error: ${result.error}`)
            } else {
                setMessage(result.message)
            }
        } catch (error) {
            console.error(error)
            setMessage("Error: Could not connect to server")
        }
    }

    function handleClose() {
        setResetOpen(false)
        setMessage(null)
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                color: '#111',
                borderRadius: '8px',
                padding: '2rem',
                minWidth: '300px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span style={{ fontWeight: '600' }}>Reset Tables</span>
                    <CloseIcon onClick={handleClose} style={{ cursor: 'pointer', color: '#6b7280' }} />
                </div>

                <div>Are you sure you want to reset all tables?</div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="crud-button create" onClick={resetTables}>Yes</div>
                    <div className="crud-button" onClick={handleClose}>No</div>
                </div>

                {message && (
                    <div style={{
                        padding: '8px 12px',
                        borderRadius: '4px',
                        backgroundColor: message.includes('Error') ? '#fee2e2' : '#dcfce7',
                        color: message.includes('Error') ? '#991b1b' : '#166534',
                        fontSize: '0.875rem',
                        width: '100%',
                        textAlign: 'center',
                    }}>
                        {message}
                    </div>
                )}
            </Box>
        </Modal>
    )
}
