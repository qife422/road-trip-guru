/* Used React documentation from react.com and the Geeks for Geeks React articles
https://www.geeksforgeeks.org/reactjs/reactjs-basics-concepts-complete-reference/ */

/*

Citation:
File level -
Asked ChatGPT:
"I am building a nav bar using React and I already have my routes and general scaffolding set up in the pasted code.
Help me add CSS styling to make sure the navbar has consistent styling, wraps on resize,
and the relevant tab the user is on remains highlighted. "

*/

import { NavLink } from 'react-router-dom';
import { useState } from 'react'
import '../App.css';
import svg from '../assets/road_transparent.svg'
import ResetModal from './ResetModal';

const links = [
    { to: '/road-trippers', label: 'Road Trippers' },
    { to: '/trip-budgets', label: 'Trip Budgets' },
    { to: '/road-trip-places', label: 'Road Trip Places' },
    { to: '/places', label: 'Places' },
    { to: '/road-trip-routes', label: 'Road Trip Routes' },
    { to: '/attractions', label: 'Attractions' },
]

export default function NavBar() {

    const [resetOpen, setResetOpen] = useState(false)

    return (
        <>
            <nav style={{
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    padding: '1rem 1.5rem 0.5rem',
                }}>
                    <a href="/" style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: 'white',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                    }}
                        className='shrikhand-regular'>
                        Road Trip Guru
                    </a>

                    <img src={svg} style={{ height: '80px', flex: 1 }} />

                    <button className="crud-button"
                        onClick={() => (setResetOpen(true))}>
                        Reset all records
                    </button>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '0.25rem',
                    padding: '0 1rem',
                    flexWrap: 'wrap',
                }}>
                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            style={({ isActive }) => ({
                                padding: '6px 14px',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                color: isActive ? '#1976d2' : 'var(--text)',
                                backgroundColor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                                fontWeight: isActive ? '600' : '400',
                            })}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </nav>
            {resetOpen &&
                <ResetModal open={resetOpen} setResetOpen={setResetOpen}></ResetModal>
            }
        </>

    )
}