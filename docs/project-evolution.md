# Project evolution

This page summarizes the meaningful development stages of Road Trip Guru without publishing five largely duplicated course-submission packages.

## Step 1 - Concept and requirements

The team defined a small travel-planning data model for road trippers, routes, destinations, attractions, and budgets. The initial scope focused on managing relational records through a web interface.

## Step 2 - Relational design

The entities, attributes, primary keys, foreign keys, cardinalities, and nullable fields were refined. `RoadTripPlaces` was introduced as an intersection table to represent the many-to-many relationship between routes and destinations while preserving `stop_order`.

## Step 3 - SQL implementation

The logical design was translated into MySQL/MariaDB DDL and DML. The team added integrity constraints, indexes, sample data, and stored procedures for application operations.

## Step 4 - Web application integration

React pages and reusable forms/tables were connected to an Express API. The backend used parameterized stored-procedure calls through `mysql2` to retrieve and modify database records.

## Step 5 - Final integration

The final milestone added full CRUD support for the `RoadTripPlaces` many-to-many relationship, route-management operations, record detail views, and a reset procedure that recreates the schema and reloads sample data. Documentation was updated with the final ERD, physical schema, sample data, and interface screenshots.

## Portfolio preparation

The public version retains the final implementation and documents the evolution above. It also replaces school-only host configuration with environment variables and adds a Docker-based local database so the project can be evaluated without university VPN access.
