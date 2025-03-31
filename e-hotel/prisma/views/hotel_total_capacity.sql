CREATE VIEW hotel_total_capacity AS
SELECT 
    h.name as hotel_name,
    h.address,
    SUM(r.capacity) as total_capacity,
    COUNT(r.id) as total_rooms,
    CAST(AVG(r.capacity) AS DECIMAL(10,2)) as average_room_capacity
FROM "Hotel" h
LEFT JOIN "Room" r ON h.id = r."hotelId"
GROUP BY h.id, h.name, h.address; 