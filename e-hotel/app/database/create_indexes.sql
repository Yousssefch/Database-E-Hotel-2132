-- Create indexes to optimize common query patterns in the hotel management system

-- Index for optimizing reservation date-based queries
-- This will improve performance for:
-- - Finding available rooms for specific dates
-- - Checking room availability
-- - Generating occupancy reports
-- - Managing check-ins and check-outs
CREATE INDEX idx_reservations_dates ON reservations (check_in_date, check_out_date);

-- Index for optimizing room searches by hotel and room type
-- This will improve performance for:
-- - Room availability searches by hotel and room type
-- - Room type filtering and sorting
-- - Room inventory management
CREATE INDEX idx_rooms_hotel_type ON rooms (hotel_id, room_type);

-- Index for optimizing customer-related queries
-- This will improve performance for:
-- - Customer lookups by SSN/SIN
-- - Customer registration date-based queries
-- - Customer history and loyalty program queries
CREATE INDEX idx_customers_registration ON customers (ssn_sin, registration_date); 