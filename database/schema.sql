-- Road Trip Guru Database DDL
-- Creates the Road Trip Guru database schema.
-- Daniella Norris and Feifan Qi

/*
Citation:
File level -
Asked ChatGPT:
"Help structure the SQL_MODE for this DDL file"
*/

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS;
SET UNIQUE_CHECKS = 0;

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

SET @OLD_SQL_MODE = @@SQL_MODE;

SET SQL_MODE =
'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- ============================================
-- Drop existing tables
-- ============================================

DROP TABLE IF EXISTS Attractions;
DROP TABLE IF EXISTS RoadTripPlaces;
DROP TABLE IF EXISTS TripBudgets;
DROP TABLE IF EXISTS RoadTripRoutes;
DROP TABLE IF EXISTS Places;
DROP TABLE IF EXISTS RoadTrippers;


-- ============================================
-- RoadTrippers
-- ============================================

CREATE TABLE RoadTrippers (
    road_tripper_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,

    PRIMARY KEY (road_tripper_id),
    UNIQUE INDEX email_UNIQUE (email),
    UNIQUE INDEX username_UNIQUE (username)
)
ENGINE = InnoDB;


-- ============================================
-- RoadTripRoutes
-- ============================================

CREATE TABLE RoadTripRoutes (
    road_trip_id INT NOT NULL AUTO_INCREMENT,
    road_tripper_id INT NOT NULL,
    road_trip_name VARCHAR(255) NOT NULL,
    distance INT NOT NULL,
    start_date DATETIME NULL DEFAULT NULL,
    end_date DATETIME NULL DEFAULT NULL,

    PRIMARY KEY (road_trip_id),
    INDEX road_tripper_id_idx (road_tripper_id),

    CONSTRAINT fk_route_roadtripper
        FOREIGN KEY (road_tripper_id)
        REFERENCES RoadTrippers (road_tripper_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- ============================================
-- TripBudgets
-- ============================================

CREATE TABLE TripBudgets (
    trip_budget_id INT NOT NULL AUTO_INCREMENT,
    total_budget DECIMAL(10,2) NULL DEFAULT NULL,
    daily_budget DECIMAL(10,2) NULL DEFAULT NULL,
    road_trip_id INT NOT NULL,

    PRIMARY KEY (trip_budget_id),
    UNIQUE INDEX road_trip_id_UNIQUE (road_trip_id),

    CONSTRAINT fk_route_budget
        FOREIGN KEY (road_trip_id)
        REFERENCES RoadTripRoutes (road_trip_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- ============================================
-- Places
-- ============================================

CREATE TABLE Places (
    place_id INT NOT NULL AUTO_INCREMENT,
    place_name VARCHAR(255) NOT NULL,
    place_state VARCHAR(255) NOT NULL,
    place_city VARCHAR(255) NOT NULL,

    PRIMARY KEY (place_id)
)
ENGINE = InnoDB;


-- ============================================
-- RoadTripPlaces
-- ============================================

CREATE TABLE RoadTripPlaces (
    road_trip_place_id INT NOT NULL AUTO_INCREMENT,
    road_trip_id INT NOT NULL,
    place_id INT NOT NULL,
    stop_order INT NOT NULL,

    PRIMARY KEY (road_trip_place_id),
    INDEX road_trip_id_idx (road_trip_id),
    INDEX place_id_idx (place_id),

    CONSTRAINT fk_rtplace_trip
        FOREIGN KEY (road_trip_id)
        REFERENCES RoadTripRoutes (road_trip_id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,

    CONSTRAINT fk_rtplace_place
        FOREIGN KEY (place_id)
        REFERENCES Places (place_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- ============================================
-- Attractions
-- ============================================

CREATE TABLE Attractions (
    attraction_id INT NOT NULL AUTO_INCREMENT,
    place_id INT NOT NULL,
    attraction_name VARCHAR(255) NOT NULL,

    PRIMARY KEY (attraction_id),
    INDEX place_id_idx (place_id),

    CONSTRAINT fk_attraction_place
        FOREIGN KEY (place_id)
        REFERENCES Places (place_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
)
ENGINE = InnoDB;
