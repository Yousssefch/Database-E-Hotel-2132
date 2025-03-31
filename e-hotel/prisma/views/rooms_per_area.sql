CREATE VIEW rooms_per_area AS
SELECT 
    h.address,
    COUNT(r.id) as total_rooms,
    SUM(CASE WHEN r.problems IS NULL THEN 1 ELSE 0 END) as available_rooms
FROM "Hotel" h
LEFT JOIN "Room" r ON h.id = r."hotelId"
GROUP BY h.address; 