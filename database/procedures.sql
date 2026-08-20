-- Road Trip Guru RESET stored procedure
-- Recreates database tables and reloads sample data
-- Daniella Norris and Feifan Qi
/* Used ChatGPT to help format this file.
Citation: File level -
Prompt: Format this file for MariaDB, keeping my comment and DB structure in tact */

DROP PROCEDURE IF EXISTS sp_reset_road_trip_guru;

DELIMITER //

CREATE PROCEDURE sp_reset_road_trip_guru ()
BEGIN
SET
    FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- Drop existing tables
-- ============================================
DROP TABLE IF EXISTS RoadTripPlaces;

DROP TABLE IF EXISTS Attractions;

DROP TABLE IF EXISTS TripBudgets;

DROP TABLE IF EXISTS RoadTripRoutes;

DROP TABLE IF EXISTS Places;

DROP TABLE IF EXISTS RoadTrippers;

-- ============================================
-- RoadTrippers
-- ============================================
CREATE TABLE
    IF NOT EXISTS RoadTrippers (
        road_tripper_id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL,
        PRIMARY KEY (road_tripper_id),
        UNIQUE INDEX email_UNIQUE (email),
        UNIQUE INDEX username_UNIQUE (username)
    ) ENGINE = InnoDB;

-- ============================================
-- RoadTripRoutes
-- ============================================
CREATE TABLE
    IF NOT EXISTS RoadTripRoutes (
        road_trip_id INT NOT NULL AUTO_INCREMENT,
        road_tripper_id INT NOT NULL,
        road_trip_name VARCHAR(255) NOT NULL,
        distance INT NOT NULL,
        start_date DATETIME NULL DEFAULT NULL,
        end_date DATETIME NULL DEFAULT NULL,
        PRIMARY KEY (road_trip_id),
        INDEX road_tripper_id_idx (road_tripper_id),
        CONSTRAINT fk_route_roadtripper FOREIGN KEY (road_tripper_id) REFERENCES RoadTrippers (road_tripper_id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- ============================================
-- TripBudgets
-- ============================================
CREATE TABLE
    IF NOT EXISTS TripBudgets (
        trip_budget_id INT NOT NULL AUTO_INCREMENT,
        total_budget DECIMAL(10, 2) NULL DEFAULT NULL,
        daily_budget DECIMAL(10, 2) NULL DEFAULT NULL,
        road_trip_id INT NOT NULL,
        PRIMARY KEY (trip_budget_id),
        UNIQUE INDEX road_trip_id_UNIQUE (road_trip_id),
        CONSTRAINT fk_route_budget FOREIGN KEY (road_trip_id) REFERENCES RoadTripRoutes (road_trip_id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- ============================================
-- Places
-- ============================================
CREATE TABLE
    IF NOT EXISTS Places (
        place_id INT NOT NULL AUTO_INCREMENT,
        place_name VARCHAR(255) NOT NULL,
        place_state VARCHAR(255) NOT NULL,
        place_city VARCHAR(255) NOT NULL,
        PRIMARY KEY (place_id)
    ) ENGINE = InnoDB;

-- ============================================
-- RoadTripPlaces
-- ============================================
CREATE TABLE
    IF NOT EXISTS RoadTripPlaces (
        road_trip_place_id INT NOT NULL AUTO_INCREMENT,
        road_trip_id INT NOT NULL,
        place_id INT NOT NULL,
        stop_order INT NOT NULL,
        PRIMARY KEY (road_trip_place_id),
        INDEX road_trip_id_idx (road_trip_id),
        INDEX place_id_idx (place_id),
        CONSTRAINT fk_rtplace_trip FOREIGN KEY (road_trip_id) REFERENCES RoadTripRoutes (road_trip_id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT fk_rtplace_place FOREIGN KEY (place_id) REFERENCES Places (place_id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- ============================================
-- Attractions
-- ============================================
CREATE TABLE
    IF NOT EXISTS Attractions (
        attraction_id INT NOT NULL AUTO_INCREMENT,
        place_id INT NOT NULL,
        attraction_name VARCHAR(255) NOT NULL,
        PRIMARY KEY (attraction_id),
        INDEX place_id_idx (place_id),
        CONSTRAINT fk_attraction_place FOREIGN KEY (place_id) REFERENCES Places (place_id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- ============================================
-- Insert sample RoadTrippers
-- ============================================
INSERT INTO
    RoadTrippers (username, email, created_at)
VALUES
    (
        'dani_travels',
        'dani@example.com',
        '2026-07-01 10:15:00'
    ),
    (
        'roadrunner22',
        'roadrunner22@example.com',
        '2026-07-02 14:30:00'
    ),
    (
        'wanderlust',
        'wanderlust@example.com',
        '2026-07-03 09:45:00'
    ),
    (
        'mountainlover',
        'mountainlover@example.com',
        '2026-07-04 16:20:00'
    ),
    (
        'coast2coast',
        'coast2coast@example.com',
        '2026-07-05 08:10:00'
    );

-- ============================================
-- Insert sample RoadTripRoutes
-- ============================================
INSERT INTO
    RoadTripRoutes (
        road_tripper_id,
        road_trip_name,
        distance,
        start_date,
        end_date
    )
VALUES
    (
        1,
        'Pacific Northwest Adventure',
        1200,
        '2026-08-01',
        '2026-08-07'
    ),
    (
        2,
        'California Coast',
        850,
        '2026-09-10',
        '2026-09-15'
    ),
    (
        3,
        'Southwest National Parks',
        1600,
        '2026-10-01',
        '2026-10-10'
    ),
    (
        4,
        'Rocky Mountain Escape',
        950,
        NULL,
        '2026-07-25'
    ),
    (4, 'New England Fall Colors', 700, NULL, NULL),
    (2, 'Cross Country Move', 2000, NULL, NULL);

-- ============================================
-- Insert sample TripBudgets
-- ============================================
INSERT INTO
    TripBudgets (total_budget, daily_budget, road_trip_id)
VALUES
    (1500.00, 214.29, 1),
    (1200.00, 200.00, 2),
    (2500.00, 250.00, 3),
    (1000.00, 166.67, 4),
    (1400.00, 200.00, 5),
    (NULL, NULL, 6);

-- ============================================
-- Insert sample Places
-- ============================================
INSERT INTO
    Places (place_name, place_state, place_city)
VALUES
    (
        'Crater Lake National Park',
        'Oregon',
        'Crater Lake'
    ),
    (
        'Golden Gate Bridge',
        'California',
        'San Francisco'
    ),
    (
        'Grand Canyon National Park',
        'Arizona',
        'Grand Canyon Village'
    ),
    (
        'Rocky Mountain National Park',
        'Colorado',
        'Estes Park'
    ),
    ('Acadia National Park', 'Maine', 'Bar Harbor'),
    ('Mount Hood', 'Oregon', 'Government Camp'),
    (
        'Yosemite National Park',
        'California',
        'Yosemite Valley'
    );

-- ============================================
-- Insert sample RoadTripPlaces
-- ============================================
INSERT INTO
    RoadTripPlaces (road_trip_id, place_id, stop_order)
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

-- ============================================
-- Insert sample Attractions
-- ============================================
INSERT INTO
    Attractions (place_id, attraction_name)
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

SET
    FOREIGN_KEY_CHECKS = 1;

END //

DELIMITER ;

-- For inserting roadtripper (CREATE)
DROP PROCEDURE IF EXISTS sp_insert_roadtripper;

DELIMITER //

CREATE PROCEDURE sp_insert_roadtripper (
    IN p_username VARCHAR(50),
    IN p_email VARCHAR(100)
)
BEGIN
INSERT INTO
    RoadTrippers (username, email, created_at)
VALUES
    (p_username, p_email, CURRENT_TIMESTAMP);

END //

DELIMITER ;

-- SP for deleting from road_trip_places table
DROP PROCEDURE IF EXISTS sp_delete_rt_places;

DELIMITER //

CREATE PROCEDURE sp_delete_rt_places (IN p_road_trip_place_id INT)
BEGIN
DELETE FROM RoadTripPlaces
WHERE
    road_trip_place_id = p_road_trip_place_id;

END //

DELIMITER ;

-- sp for adding road trip places, takes road_trip_id, place_id, and stop_order as params
DROP PROCEDURE IF EXISTS sp_create_rt_places;

DELIMITER //

CREATE PROCEDURE sp_create_rt_places (
    IN p_road_trip_id INT,
    IN p_place_id INT,
    IN p_stop_order INT
)
BEGIN
INSERT INTO
    RoadTripPlaces (road_trip_id, place_id, stop_order)
VALUES
    (p_road_trip_id, p_place_id, p_stop_order);

END //

DELIMITER ;

-- sp for editing road trip places, takes road_trip_place_id,
-- road_trip_id, place_id, and stop_order as params
DROP PROCEDURE IF EXISTS sp_edit_rt_places;

DELIMITER //

CREATE PROCEDURE sp_edit_rt_places (
    IN p_road_trip_place_id INT,
    IN p_road_trip_id INT,
    IN p_place_id INT,
    IN p_stop_order INT
)
BEGIN
UPDATE RoadTripPlaces
SET
    road_trip_id = p_road_trip_id,
    place_id = p_place_id,
    stop_order = p_stop_order
WHERE
    road_trip_place_id = p_road_trip_place_id;

END //

DELIMITER ;

-- sp for inserting new attractions, takes place_id and attraction_name as parameters
DROP PROCEDURE IF EXISTS sp_insert_attraction;

DELIMITER //

CREATE PROCEDURE sp_insert_attraction (
    IN p_place_id INT,
    IN p_attraction_name VARCHAR(255)
)
BEGIN
INSERT INTO
    Attractions (place_id, attraction_name)
VALUES
    (p_place_id, p_attraction_name);

END //

DELIMITER ;

-- sp for deleting rt routes
DROP PROCEDURE IF EXISTS sp_delete_road_trip_routes;

DELIMITER //

CREATE PROCEDURE sp_delete_road_trip_routes (IN p_road_trip_id INT)
BEGIN
-- needing to delete records that are dependant
DELETE FROM TripBudgets
WHERE
    road_trip_id = p_road_trip_id;

DELETE FROM RoadTripRoutes
WHERE
    road_trip_id = p_road_trip_id;

END //

DELIMITER ;

-- sp for inserting new rt routes, takes place_id and attraction_name as parameters
DROP PROCEDURE IF EXISTS sp_insert_road_trip_route;

DELIMITER //

CREATE PROCEDURE sp_insert_road_trip_route (
    IN p_road_tripper_id INT,
    IN p_road_trip_name VARCHAR(255),
    IN p_distance INT,
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
INSERT INTO
    RoadTripRoutes (
        road_tripper_id,
        road_trip_name,
        distance,
        start_date,
        end_date
    )
VALUES
    (
        p_road_tripper_id,
        p_road_trip_name,
        p_distance,
        p_start_date,
        p_end_date
    );

END //

DELIMITER ;

-- sp for editing road trips, takes road_tripper_id,
-- road_trip_name, distance, start_date, and end_date as params
DROP PROCEDURE IF EXISTS sp_edit_road_trip;

DELIMITER //

CREATE PROCEDURE sp_edit_road_trip (
    IN p_road_trip_id INT,
    IN p_road_tripper_id INT,
    IN p_road_trip_name VARCHAR(255),
    IN p_distance INT,
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
UPDATE RoadTripRoutes
SET
    road_tripper_id = p_road_tripper_id,
    road_trip_name = p_road_trip_name,
    distance = p_distance,
    start_date = p_start_date,
    end_date = p_end_date
WHERE
    road_trip_id = p_road_trip_id;

END //

DELIMITER ;
