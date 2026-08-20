

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

console.log('base url', BASE_URL)

/*----------------
/* GETS
/*----------------*/


// attractions
export async function getAttractions() {
    const response = await fetch(`${BASE_URL}/attractions`)
    const data = await response.json()
    console.log(data)
    return data
}

// road trip routes
export async function getRoadTripRoutes() {
    const response = await fetch(`${BASE_URL}/roadTripRoutes`)
    const data = await response.json()
    return data
}

// road trippers
export async function getRoadTrippers() {
    const response = await fetch(`${BASE_URL}/roadTrippers`)
    const data = await response.json()
    return data
}

// trip budgets
export async function getTripBudgets() {
    const response = await fetch(`${BASE_URL}/tripBudgets`)
    const data = await response.json()
    return data
}

// places
export async function getPlaces() {
    const response = await fetch(`${BASE_URL}/places`)
    const data = await response.json()
    return data
}

// road trip places
export async function getRoadTripPlaces() {
    const response = await fetch(`${BASE_URL}/roadTripPlaces`)
    const data = await response.json()
    return data
}

/*----------------
/* POSTS
/*----------------*/

export async function postUser(data) {
    try {
        const response = await fetch(`${BASE_URL}/insert-roadtripper`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
            })
        })
        const result = await response.json()

        if (!response.ok) {
            return { error: result.error }
        }

        return { message: result.message }

    } catch (error) {
        console.error(error)
        return { error: "Could not connect to server" }
    }
}

export async function postAttractions(data) {
    try {
        console.log("POST attractions data:", data);
        console.log(data.place_id)

        const response = await fetch(`${BASE_URL}/insert-attractions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                place_id: data.place_id,
                attraction_name: data.attraction_name
            })
        });

        const result = await response.json();

        console.log("POST attractions response:", result);

        if (!response.ok) {
            return { error: result.error };
        }

        return { message: result.message };

    } catch (error) {
        console.error(error);
        return { error: "Could not connect to server" };
    }
}

export async function postRoadTripPlaces(data) {
    try {
        console.log("POST road trips data:", data);
        console.log(data.place_id)

        const response = await fetch(`${BASE_URL}/create-road-trip-places`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                road_trip_id: data.road_trip_id,
                place_id: data.place_id,
                stop_order: data.stop_order
            })
        });

        const result = await response.json();

        console.log("POST road trips response:", result);

        if (!response.ok) {
            return { error: result.error };
        }

        return { message: result.message };

    } catch (error) {
        console.error(error);
        return { error: "Could not connect to server" };
    }
}

export async function postRoadTripRoutes(data) {
    try {
        console.log("POST road trip route data:", data);

        const response = await fetch(`${BASE_URL}/create-road-trip-routes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                road_tripper_id: data.road_tripper_id,
                road_trip_name: data.road_trip_name,
                distance: data.distance,
                start_date: data.start_date,
                end_date: data.end_date
            })
        });

        const result = await response.json();

        console.log("POST road trip routes response:", result);

        if (!response.ok) {
            return { error: result.error };
        }

        return { message: result.message };

    } catch (error) {
        console.error(error);
        return { error: "Could not connect to server" };
    }
}


/*----------------
/* EDITS
/*----------------*/

export async function editRoadTripPlaces(data) {
    try {
        const response = await fetch(`${BASE_URL}/edit-rt-places`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                road_trip_place_id: data.road_trip_place_id,
                road_trip_id: data.road_trip_id,
                place_id: data.place_id,
                stop_order: data.stop_order
            })
        })

        const result = await response.json()

        if (!response.ok) {
            return { error: result.error }
        }

        return { message: result.message }

    } catch (error) {
        console.error(error)
        return { error: "Could not connect to server" }
    }
}
export async function editRoadTrips(data) {
    try {
        const response = await fetch(`${BASE_URL}/edit-road-trips`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                road_trip_id: data.road_trip_id,
                road_tripper_id: data.road_tripper_id,
                road_trip_name: data.road_trip_name,
                distance: data.distance,
                start_date: data.start_date,
                end_date: data.end_date
            })
        })

        const result = await response.json()
        if (!response.ok) return { error: result.error }
        return { message: result.message }
    } catch (error) {
        console.error(error)
        return { error: "Could not connect to server" }
    }
}

/*----------------
/* DELETES
/*----------------*/

export async function deleteRoadTripPlaces(data) {
    try {
        const response = await fetch(`${BASE_URL}/delete-road-trip-places`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                road_trip_place_id: data.road_trip_place_id,
            })
        })
        const result = await response.json()
        if (!response.ok) return { error: result.error }
        return { message: result.message }
    } catch (error) {
        console.error(error)
        return { error: "Could not connect to server" }
    }
}

export async function deleteRoadTripRoutes(data) {
    try {
        const response = await fetch(`${BASE_URL}/delete-road-trip-routes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                road_trip_id: data.road_trip_id,
            })
        })
        const result = await response.json()
        if (!response.ok) return { error: result.error }
        return { message: result.message }
    } catch (error) {
        console.error(error)
        return { error: "Could not connect to server" }
    }
}


export async function deleteAttraction(data) {
    try {
        const response = await fetch(`${BASE_URL}/delete-attraction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                attraction_id: data.attraction_id
            })
        })

        const result = await response.json()

        if (!response.ok) {
            return { error: result.error }
        }

        return { message: result.message }

    } catch (error) {
        console.error(error)
        return { error: "Could not connect to server" }
    }
}
