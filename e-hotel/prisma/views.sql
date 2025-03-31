-- View 1: Number of available rooms per area
CREATE VIEW rooms_per_area AS
SELECT 
    h.address,
    COUNT(r.id) as total_rooms,
    SUM(CASE WHEN r.problems IS NULL THEN 1 ELSE 0 END) as available_rooms
FROM "Hotel" h
LEFT JOIN "Room" r ON h.id = r.hotelId
GROUP BY h.address;

-- View 2: Aggregated capacity of all rooms per hotel
CREATE VIEW hotel_total_capacity AS
SELECT 
    h.name as hotel_name,
    h.address,
    SUM(r.capacity) as total_capacity,
    COUNT(r.id) as total_rooms,
    CAST(AVG(r.capacity) AS DECIMAL(10,2)) as average_room_capacity
FROM "Hotel" h
LEFT JOIN "Room" r ON h.id = r.hotelId
GROUP BY h.id, h.name, h.address;

-- View 3: Room type distribution and pricing per hotel
CREATE VIEW room_type_distribution AS
SELECT 
    h.name as hotel_name,
    r.viewType,
    COUNT(r.id) as room_count,
    MIN(r.price) as min_price,
    MAX(r.price) as max_price,
    CAST(AVG(r.price) AS DECIMAL(10,2)) as avg_price,
    SUM(r.capacity) as total_capacity
FROM "Hotel" h
LEFT JOIN "Room" r ON h.id = r.hotelId
GROUP BY h.id, h.name, r.viewType
ORDER BY h.name, r.viewType; 