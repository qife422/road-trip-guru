
export const attractions = {
    place_id: Number,
    attraction_name: String
};

export const roadTripRoutes = {
    road_tripper_id: Number,
    road_trip_name: String,
    distance: Number,
    start_date: Date,
    end_date: Date
};

export const roadTripPlaces = {
    road_trip_id: Number,
    place_id: Number,
    stop_order: Number
};

export const places = {
    place_name: String,
    place_state: String,
    place_city: String
};

export const tripBudgets = {
    total_budget: Number,
    daily_budget: Number,
    road_trip_id: Number
};

export const roadTrippers = {
    username: String,
    email: String
};