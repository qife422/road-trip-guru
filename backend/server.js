/* Used express documentation from https://expressjs.com/
to generate api routes */

import express from 'express'
import { db } from './db-connector.js'
import cors from 'cors'
import dotenv from 'dotenv'
import { selectAllAttractions } from './queries/attractions-places.js'


dotenv.config();

const app = express();
const PORT = Number(process.env.BACKEND_PORT || 3001);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5175";

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

/* -------------
* SELECTS
*---------------*/

app.get('/attractions', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM Attractions ORDER BY attraction_id')
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

app.get('/roadTrippers', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM RoadTrippers ORDER BY road_tripper_id')
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

app.get('/roadTripPlaces', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM RoadTripPlaces ORDER BY road_trip_place_id')
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

app.get('/roadTripRoutes', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM RoadTripRoutes ORDER BY road_trip_id')
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

app.get('/places', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM Places ORDER BY place_id')
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

app.get('/tripBudgets', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM TripBudgets ORDER BY trip_budget_id')
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

app.get('/attractions-places', async (req, res) => {
    try {
        const [result] = await db.query(selectAllAttractions)
        res.status(200).json({ result, message: "Records successfully grabbed" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})


/* -------------
* PUTS
*---------------*/
app.put('/edit-rt-places', async (req, res) => {
    try {
        const { road_trip_place_id, road_trip_id, place_id, stop_order } = req.body
        const [result] = await db.query('CALL sp_edit_rt_places(?, ?, ?, ?)', [road_trip_place_id, road_trip_id, place_id, stop_order])
        res.status(201).json({ result, message: 'Record edited successfully. Refresh page to see row added to table.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.sqlMessage || error.message })
    }
})

app.put('/edit-road-trips', async (req, res) => {
    try {
        const { road_trip_id, road_tripper_id, road_trip_name, distance, start_date, end_date } = req.body
        const [result] = await db.query('CALL sp_edit_road_trip(?, ?, ?, ?, ?, ?)', [road_trip_id, road_tripper_id, road_trip_name, distance, start_date, end_date])
        res.status(201).json({ result, message: 'Record edited successfully. Refresh page to see row added to table.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.sqlMessage || error.message })
    }
})


/* -------------
* CREATES
*---------------*/


app.post('/insert-roadtripper', async (req, res) => {
    try {
        const { username, email } = req.body
        const [result] = await db.query('CALL sp_insert_roadtripper(?, ?)', [username, email])
        res.status(201).json({ result, message: 'Record created successfully. Refresh page to see row added to table.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.sqlMessage || error.message })
    }
})

app.post('/insert-attractions', async (req, res) => {
    try {
        console.log("REQUEST BODY:", req.body);

        const { place_id, attraction_name } = req.body;

        console.log("place_id:", place_id);
        console.log("attraction_name:", attraction_name);

        const [result] = await db.query(
            'CALL sp_insert_attraction(?, ?)',
            [place_id, attraction_name]
        );

        res.status(201).json({
            result,
            message: 'Record created successfully.'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.sqlMessage || error.message
        });
    }
});

app.post('/create-road-trip-places', async (req, res) => {
    try {
        const { road_trip_id, place_id, stop_order } = req.body
        const [result] = await db.query('CALL sp_create_rt_places(?,?,?)', [road_trip_id, place_id, stop_order])
        res.status(201).json({ result, message: 'Record created successfully. Refresh page to see row added to table.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.sqlMessage || error.message })
    }
})

app.post('/create-road-trip-routes', async (req, res) => {
    try {
        const { road_tripper_id, road_trip_name, distance, start_date, end_date } = req.body
        const [result] = await db.query('CALL sp_insert_road_trip_route(?,?,?,?,?)', [road_tripper_id, road_trip_name, distance, start_date, end_date])
        res.status(201).json({ result, message: 'Record created successfully. Refresh page to see row added to table.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.sqlMessage || error.message })
    }
})



/* -------------
* DELETES
*---------------*/

app.post('/delete-road-trip-places', async (req, res) => {
    try {
        const { road_trip_place_id } = req.body
        const [result] = await db.query('CALL sp_delete_rt_places(?)', [road_trip_place_id])
        res.status(201).json({ result, message: 'Record deleted successfully. Refresh page to see row added to table.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.sqlMessage || error.message })
    }
})


app.post('/delete-road-trip-routes', async (req, res) => {
    try {
        const { road_trip_id } = req.body
        const [result] = await db.query('CALL sp_delete_road_trip_routes(?)', [road_trip_id])
        res.status(201).json({ result, message: 'Record deleted successfully. Refresh page to see row added to table.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.sqlMessage || error.message })
    }
})

app.post('/delete-attraction', async (req, res) => {
    try {
        const { attraction_id } = req.body;

        console.log("DELETE ATTRACTION:", attraction_id);

        const [result] = await db.query(
            'CALL sp_delete_attraction(?)',
            [attraction_id]
        );

        res.status(200).json({
            result,
            message: 'Attraction deleted successfully.'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.sqlMessage || error.message
        });
    }
});



app.post('/reset', async (req, res) => {
    try {
        const [result] = await db.query('CALL sp_reset_road_trip_guru()')
        res.status(200).json({ result, message: "Records successfully reset" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})


app.listen(PORT, function () {
    console.log(`Express started on http://localhost:${PORT}; press Ctrl-C to terminate.`)
})
