
export const selectAllAttractions =
    `SELECT *
FROM Attractions
LEFT JOIN Places ON Attractions.place_id = Places.place_id
ORDER BY Attractions.attraction_id;`