CREATE VIEW room_type_distribution AS
SELECT 
    h.name as hotel_name,
    r."viewType",
    COUNT(r.id) as room_count,
    MIN(r.price) as min_price,
    MAX(r.price) as max_price,
    CAST(AVG(r.price) AS DECIMAL(10,2)) as avg_price,
    SUM(r.capacity) as total_capacity
FROM "Hotel" h
LEFT JOIN "Room" r ON h.id = r."hotelId"
GROUP BY h.id, h.name, r."viewType"
ORDER BY h.name, r."viewType"; 