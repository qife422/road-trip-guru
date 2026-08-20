
-- RoadTrippers


INSERT INTO RoadTrippers (username, email, created_at)
VALUES
('dani_travels', 'dani@example.com', '2026-07-01 10:15:00'),
('roadrunner22', 'roadrunner22@example.com', '2026-07-02 14:30:00'),
('wanderlust', 'wanderlust@example.com', '2026-07-03 09:45:00'),
('mountainlover', 'mountainlover@example.com', '2026-07-04 16:20:00'),
('coast2coast', 'coast2coast@example.com', '2026-07-05 08:10:00');


-- RoadTripRoutes

INSERT INTO RoadTripRoutes
(road_tripper_id, road_trip_name, distance, start_date, end_date)
VALUES
(1, 'Pacific Northwest Adventure', 1200, '2026-08-01', '2026-08-07'),
(2, 'California Coast', 850, '2026-09-10', '2026-09-15'),
(3, 'Southwest National Parks', 1600, '2026-10-01', '2026-10-10'),
(4, 'Rocky Mountain Escape', 950, NULL, '2026-07-25'),
(4, 'New England Fall Colors', 700, NULL, NULL),
(2, 'Cross Country Move', 2000, NULL, NULL);

-- TripBudgets

INSERT INTO TripBudgets
(total_budget, daily_budget, road_trip_id)
VALUES
(1500.00, 214.29, 1),
(1200.00, 200.00, 2),
(2500.00, 250.00, 3),
(1000.00, 166.67, 4),
(1400.00, 200.00, 5),
(NULL, NULL, 6);

-- Places

INSERT INTO Places
(place_name, place_state, place_city)
VALUES
('Crater Lake National Park', 'Oregon', 'Crater Lake'),
('Golden Gate Bridge', 'California', 'San Francisco'),
('Grand Canyon National Park', 'Arizona', 'Grand Canyon Village'),
('Rocky Mountain National Park', 'Colorado', 'Estes Park'),
('Acadia National Park', 'Maine', 'Bar Harbor'),
('Mount Hood', 'Oregon', 'Government Camp'),
('Yosemite National Park', 'California', 'Yosemite Valley');



-- RoadTripPlaces

INSERT INTO RoadTripPlaces
(road_trip_id, place_id, stop_order)
VALUES
(1, 6, 1),
(1, 1, 2),

(2, 2, 1),
(2, 7, 2),
(2, 1, 3),

(3, 3, 1),

(4, 4, 1),

(5, 5, 1),

(6, 2, 1);



-- Attractions

INSERT INTO Attractions
(place_id, attraction_name)
VALUES
(1, 'Rim Drive'),
(1, 'Wizard Island'),

(2, 'Golden Gate Overlook'),
(2, 'Battery Spencer'),

(3, 'South Rim'),
(3, 'Bright Angel Trail'),

(4, 'Trail Ridge Road'),
(4, 'Bear Lake'),

(5, 'Cadillac Mountain'),

(6, 'Timberline Lodge'),

(7, 'Half Dome');