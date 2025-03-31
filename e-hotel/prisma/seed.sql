-- Drop existing data
TRUNCATE TABLE "Room" CASCADE;
TRUNCATE TABLE "Hotel" CASCADE;
TRUNCATE TABLE "HotelChain" CASCADE;

-- Insert Hotel Chains
INSERT INTO "HotelChain" (name, "centralOfficeAddress", "numberOfHotels", "contactEmail", "phoneNumber") 
VALUES
('Luxury Stays International', '123 Park Avenue, New York, NY 10001', 8, 'corporate@luxurystays.com', '1-800-555-0101'),
('Budget Inn Group', '456 Main Street, Chicago, IL 60601', 8, 'headquarters@budgetinn.com', '1-800-555-0102'),
('Resort Retreats Worldwide', '789 Beach Road, Miami, FL 33139', 8, 'info@resortretreats.com', '1-800-555-0103'),
('Business Hub Hotels', '101 Bay Street, San Francisco, CA 94105', 8, 'contact@businesshub.com', '1-800-555-0104'),
('Mountain Getaways', '202 Alpine Road, Denver, CO 80202', 8, 'reservations@mountaingetaways.com', '1-800-555-0105');

-- Insert Hotels for Luxury Stays International
INSERT INTO "Hotel" ("hotelChainId", name, rating, "numberOfRooms", address, "contactEmail", "phoneNumber", "urlImage")
SELECT 
    hc.id,
    v.name,
    v.rating,
    v."numberOfRooms",
    v.address,
    v."contactEmail",
    v."phoneNumber",
    v."urlImage"
FROM "HotelChain" hc,
(VALUES
    ('Luxury Stays Manhattan', 5, 100, '100 Park Avenue, New York, NY 10001', 'manhattan@luxurystays.com', '212-555-0101', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Luxury Stays Brooklyn', 4, 80, '200 Brooklyn Bridge, Brooklyn, NY 11201', 'brooklyn@luxurystays.com', '718-555-0102', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Luxury Stays Queens', 4, 75, '300 Queens Boulevard, Queens, NY 11101', 'queens@luxurystays.com', '718-555-0103', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Luxury Stays Bronx', 3, 60, '400 Grand Concourse, Bronx, NY 10451', 'bronx@luxurystays.com', '718-555-0104', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/04/4e/b2/hotel-colline-de-france.jpg?w=800&h=400&s=1'),
    ('Luxury Stays Staten Island', 3, 50, '500 Richmond Terrace, Staten Island, NY 10301', 'staten@luxurystays.com', '718-555-0105', 'https://www.o3zone.ro/wp-content/uploads/sites/97/2024/01/o3zone_hotel_home_slide02.jpg'),
    ('Luxury Stays Long Island', 4, 85, '600 Long Island Expressway, Long Island, NY 11701', 'longisland@luxurystays.com', '516-555-0106', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/04/4e/b2/hotel-colline-de-france.jpg?w=800&h=400&s=1'),
    ('Luxury Stays Westchester', 4, 70, '700 Westchester Avenue, Westchester, NY 10501', 'westchester@luxurystays.com', '914-555-0107', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Luxury Stays Jersey City', 4, 65, '800 Jersey City Boulevard, Jersey City, NJ 07301', 'jerseycity@luxurystays.com', '201-555-0108', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg')
) AS v(name, rating, "numberOfRooms", address, "contactEmail", "phoneNumber", "urlImage")
WHERE hc.name = 'Luxury Stays International';

-- Insert Hotels for Budget Inn Group
INSERT INTO "Hotel" ("hotelChainId", name, rating, "numberOfRooms", address, "contactEmail", "phoneNumber", "urlImage")
SELECT 
    hc.id,
    v.name,
    v.rating,
    v."numberOfRooms",
    v.address,
    v."contactEmail",
    v."phoneNumber",
    v."urlImage"
FROM "HotelChain" hc,
(VALUES
    ('Budget Inn Downtown', 3, 60, '100 Michigan Avenue, Chicago, IL 60601', 'downtown@budgetinn.com', '312-555-0201', 'https://image-tc.galaxy.tf/wijpeg-blfrzbpj04b632df1fv6ktvjj/executive-suite-3.jpg?width=1920'),
    ('Budget Inn North Side', 3, 55, '200 North Clark Street, Chicago, IL 60602', 'northside@budgetinn.com', '312-555-0202', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Budget Inn South Side', 3, 50, '300 South State Street, Chicago, IL 60603', 'southside@budgetinn.com', '312-555-0203', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Budget Inn West Side', 3, 45, '400 West Madison Street, Chicago, IL 60604', 'westside@budgetinn.com', '312-555-0204', 'https://www.o3zone.ro/wp-content/uploads/sites/97/2024/01/o3zone_hotel_home_slide02.jpg'),
    ('Budget Inn East Side', 3, 50, '500 East Illinois Street, Chicago, IL 60605', 'eastside@budgetinn.com', '312-555-0205', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/04/4e/b2/hotel-colline-de-france.jpg?w=800&h=400&s=1'),
    ('Budget Inn Evanston', 3, 40, '600 Evanston Avenue, Evanston, IL 60201', 'evanston@budgetinn.com', '847-555-0206', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Budget Inn Oak Park', 3, 35, '700 Oak Park Boulevard, Oak Park, IL 60301', 'oakpark@budgetinn.com', '708-555-0207', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Budget Inn Skokie', 3, 40, '800 Skokie Highway, Skokie, IL 60076', 'skokie@budgetinn.com', '847-555-0208', 'https://image-tc.galaxy.tf/wijpeg-blfrzbpj04b632df1fv6ktvjj/executive-suite-3.jpg?width=1920')
) AS v(name, rating, "numberOfRooms", address, "contactEmail", "phoneNumber", "urlImage")
WHERE hc.name = 'Budget Inn Group';

-- Insert Hotels for Resort Retreats Worldwide
INSERT INTO "Hotel" ("hotelChainId", name, rating, "numberOfRooms", address, "contactEmail", "phoneNumber", "urlImage")
SELECT 
    hc.id,
    v.name,
    v.rating,
    v."numberOfRooms",
    v.address,
    v."contactEmail",
    v."phoneNumber",
    v."urlImage"
FROM "HotelChain" hc,
(VALUES
    ('Resort Retreats South Beach', 5, 120, '100 Ocean Drive, Miami Beach, FL 33139', 'southbeach@resortretreats.com', '305-555-0301', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Resort Retreats Downtown', 4, 90, '200 Biscayne Boulevard, Miami, FL 33131', 'downtown@resortretreats.com', '305-555-0302', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Resort Retreats Coral Gables', 4, 85, '300 Miracle Mile, Coral Gables, FL 33134', 'coralgables@resortretreats.com', '305-555-0303', 'https://www.kayak.com/news/wp-content/uploads/sites/19/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg'),
    ('Resort Retreats Key Biscayne', 5, 100, '400 Crandon Boulevard, Key Biscayne, FL 33149', 'keybiscayne@resortretreats.com', '305-555-0304', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Resort Retreats Fort Lauderdale', 4, 95, '500 Las Olas Boulevard, Fort Lauderdale, FL 33301', 'fortlauderdale@resortretreats.com', '954-555-0305', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/04/4e/b2/hotel-colline-de-france.jpg?w=800&h=400&s=1'),
    ('Resort Retreats Palm Beach', 5, 110, '600 Worth Avenue, Palm Beach, FL 33480', 'palmbeach@resortretreats.com', '561-555-0306', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Resort Retreats Boca Raton', 4, 90, '700 East Palmetto Park Road, Boca Raton, FL 33432', 'bocaraton@resortretreats.com', '561-555-0307', 'https://www.o3zone.ro/wp-content/uploads/sites/97/2024/01/o3zone_hotel_home_slide02.jpg'),
    ('Resort Retreats Delray Beach', 4, 85, '800 Atlantic Avenue, Delray Beach, FL 33483', 'delraybeach@resortretreats.com', '561-555-0308', 'https://image-tc.galaxy.tf/wijpeg-blfrzbpj04b632df1fv6ktvjj/executive-suite-3.jpg?width=1920')
) AS v(name, rating, "numberOfRooms", address, "contactEmail", "phoneNumber", "urlImage")
WHERE hc.name = 'Resort Retreats Worldwide';

-- Insert Hotels for Business Hub Hotels
INSERT INTO "Hotel" ("hotelChainId", name, rating, "numberOfRooms", address, "contactEmail", "phoneNumber", "urlImage")
SELECT 
    hc.id,
    v.name,
    v.rating,
    v."numberOfRooms",
    v.address,
    v."contactEmail",
    v."phoneNumber",
    v."urlImage"
FROM "HotelChain" hc,
(VALUES
    ('Business Hub Financial District', 4, 85, '100 Market Street, San Francisco, CA 94105', 'financial@businesshub.com', '415-555-0401', 'https://image-tc.galaxy.tf/wijpeg-blfrzbpj04b632df1fv6ktvjj/executive-suite-3.jpg?width=1920'),
    ('Business Hub Union Square', 4, 80, '200 Post Street, San Francisco, CA 94108', 'unionsquare@businesshub.com', '415-555-0402', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Business Hub SOMA', 4, 75, '300 Howard Street, San Francisco, CA 94105', 'soma@businesshub.com', '415-555-0403', 'https://www.o3zone.ro/wp-content/uploads/sites/97/2024/01/o3zone_hotel_home_slide02.jpg'),
    ('Business Hub Mission Bay', 4, 70, '400 Mission Bay Boulevard, San Francisco, CA 94158', 'missionbay@businesshub.com', '415-555-0404', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Business Hub Oakland', 4, 65, '500 Broadway, Oakland, CA 94607', 'oakland@businesshub.com', '510-555-0405', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/04/4e/b2/hotel-colline-de-france.jpg?w=800&h=400&s=1'),
    ('Business Hub San Jose', 4, 70, '600 Market Street, San Jose, CA 95110', 'sanjose@businesshub.com', '408-555-0406', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Business Hub Palo Alto', 4, 60, '700 University Avenue, Palo Alto, CA 94301', 'paloalto@businesshub.com', '650-555-0407', 'https://www.o3zone.ro/wp-content/uploads/sites/97/2024/01/o3zone_hotel_home_slide02.jpg'),
    ('Business Hub Mountain View', 4, 55, '800 Castro Street, Mountain View, CA 94041', 'mountainview@businesshub.com', '650-555-0408', 'https://image-tc.galaxy.tf/wijpeg-blfrzbpj04b632df1fv6ktvjj/executive-suite-3.jpg?width=1920')
) AS v(name, rating, "numberOfRooms", address, "contactEmail", "phoneNumber", "urlImage")
WHERE hc.name = 'Business Hub Hotels';

-- Insert Hotels for Mountain Getaways
INSERT INTO "Hotel" ("hotelChainId", name, rating, "numberOfRooms", address, "contactEmail", "phoneNumber", "urlImage")
SELECT 
    hc.id,
    v.name,
    v.rating,
    v."numberOfRooms",
    v.address,
    v."contactEmail",
    v."phoneNumber",
    v."urlImage"
FROM "HotelChain" hc,
(VALUES
    ('Mountain Getaways Downtown', 4, 75, '100 16th Street, Denver, CO 80202', 'downtown@mountaingetaways.com', '303-555-0501', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Mountain Getaways Cherry Creek', 4, 70, '200 Cherry Creek Drive, Denver, CO 80206', 'cherrycreek@mountaingetaways.com', '303-555-0502', 'https://image-tc.galaxy.tf/wijpeg-blfrzbpj04b632df1fv6ktvjj/executive-suite-3.jpg?width=1920'),
    ('Mountain Getaways Capitol Hill', 4, 65, '300 Grant Street, Denver, CO 80203', 'capitolhill@mountaingetaways.com', '303-555-0503', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Mountain Getaways LoDo', 4, 70, '400 Larimer Street, Denver, CO 80202', 'lodo@mountaingetaways.com', '303-555-0504', 'https://www.o3zone.ro/wp-content/uploads/sites/97/2024/01/o3zone_hotel_home_slide02.jpg'),
    ('Mountain Getaways Boulder', 4, 65, '500 Pearl Street, Boulder, CO 80302', 'boulder@mountaingetaways.com', '303-555-0505', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/04/4e/b2/hotel-colline-de-france.jpg?w=800&h=400&s=1'),
    ('Mountain Getaways Golden', 4, 60, '600 Washington Avenue, Golden, CO 80401', 'golden@mountaingetaways.com', '303-555-0506', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg'),
    ('Mountain Getaways Littleton', 4, 55, '700 Main Street, Littleton, CO 80120', 'littleton@mountaingetaways.com', '303-555-0507', 'https://image-tc.galaxy.tf/wijpeg-blfrzbpj04b632df1fv6ktvjj/executive-suite-3.jpg?width=1920'),
    ('Mountain Getaways Aurora', 4, 60, '800 East Colfax Avenue, Aurora, CO 80010', 'aurora@mountaingetaways.com', '303-555-0508', 'https://hoteltimisoara.ro/wp-content/uploads/2021/05/hotel-timisoara-main-4.jpg')
) AS v(name, rating, "numberOfRooms", address, "contactEmail", "phoneNumber", "urlImage")
WHERE hc.name = 'Mountain Getaways';

-- Insert Rooms for each hotel (5 rooms per hotel with different capacities)
INSERT INTO "Room" ("hotelId", name, price, amenities, capacity, "viewType", extendable, problems)
SELECT 
    h.id,
    room_name,
    room_price,
    room_amenities,
    room_capacity,
    room_viewtype,
    room_extendable,
    room_problems
FROM "Hotel" h,
(VALUES
    -- Luxury Stays Manhattan Rooms
    ('Presidential Suite', 1200.00, 'Wi-Fi, AC, TV, Mini Bar, Jacuzzi, Ocean View', 4, 'Ocean', true, NULL),
    ('Executive Suite', 800.00, 'Wi-Fi, AC, TV, Mini Bar, City View', 3, 'City', true, NULL),
    ('Deluxe Room', 600.00, 'Wi-Fi, AC, TV, City View', 2, 'City', true, NULL),
    ('Standard Room', 400.00, 'Wi-Fi, AC, TV, City View', 2, 'City', false, NULL),
    ('Single Room', 300.00, 'Wi-Fi, AC, TV, City View', 1, 'City', false, NULL),
    -- Luxury Stays Brooklyn Rooms
    ('Penthouse Suite', 1000.00, 'Wi-Fi, AC, TV, Mini Bar, Brooklyn Bridge View', 4, 'City', true, NULL),
    ('Family Suite', 700.00, 'Wi-Fi, AC, TV, Mini Bar, City View', 4, 'City', true, NULL),
    ('Deluxe Room', 500.00, 'Wi-Fi, AC, TV, City View', 2, 'City', true, NULL),
    ('Standard Room', 350.00, 'Wi-Fi, AC, TV, City View', 2, 'City', false, NULL),
    ('Single Room', 250.00, 'Wi-Fi, AC, TV, City View', 1, 'City', false, NULL),
    -- Budget Inn Downtown Rooms
    ('Family Room', 200.00, 'Wi-Fi, AC, TV, City View', 4, 'City', true, NULL),
    ('Double Room', 150.00, 'Wi-Fi, AC, TV, City View', 2, 'City', true, NULL),
    ('Standard Room', 120.00, 'Wi-Fi, AC, TV, City View', 2, 'City', false, NULL),
    ('Single Room', 100.00, 'Wi-Fi, AC, TV, City View', 1, 'City', false, NULL),
    ('Economy Room', 80.00, 'Wi-Fi, AC, TV, City View', 1, 'City', false, NULL),
    -- Resort Retreats South Beach Rooms
    ('Oceanfront Suite', 900.00, 'Wi-Fi, AC, TV, Mini Bar, Beach Access', 4, 'Ocean', true, NULL),
    ('Beach View Room', 700.00, 'Wi-Fi, AC, TV, Beach View', 3, 'Ocean', true, NULL),
    ('Garden Room', 500.00, 'Wi-Fi, AC, TV, Garden View', 2, 'Garden', true, NULL),
    ('Standard Room', 350.00, 'Wi-Fi, AC, TV, City View', 2, 'City', false, NULL),
    ('Single Room', 250.00, 'Wi-Fi, AC, TV, City View', 1, 'City', false, NULL),
    -- Business Hub Financial District Rooms
    ('Executive Suite', 600.00, 'Wi-Fi, AC, TV, Mini Bar, City View', 3, 'City', true, NULL),
    ('Business Room', 450.00, 'Wi-Fi, AC, TV, City View', 2, 'City', true, NULL),
    ('Standard Room', 350.00, 'Wi-Fi, AC, TV, City View', 2, 'City', false, NULL),
    ('Single Room', 250.00, 'Wi-Fi, AC, TV, City View', 1, 'City', false, NULL),
    ('Economy Room', 200.00, 'Wi-Fi, AC, TV, City View', 1, 'City', false, NULL),
    -- Mountain Getaways Downtown Rooms
    ('Mountain View Suite', 500.00, 'Wi-Fi, AC, TV, Mini Bar, Mountain View', 4, 'Mountain', true, NULL),
    ('Family Room', 400.00, 'Wi-Fi, AC, TV, Mountain View', 4, 'Mountain', true, NULL),
    ('Deluxe Room', 300.00, 'Wi-Fi, AC, TV, City View', 2, 'City', true, NULL),
    ('Standard Room', 250.00, 'Wi-Fi, AC, TV, City View', 2, 'City', false, NULL),
    ('Single Room', 200.00, 'Wi-Fi, AC, TV, City View', 1, 'City', false, NULL)
) AS v(room_name, room_price, room_amenities, room_capacity, room_viewtype, room_extendable, room_problems)
WHERE h.name IN (
    'Luxury Stays Manhattan',
    'Luxury Stays Brooklyn',
    'Budget Inn Downtown',
    'Resort Retreats South Beach',
    'Business Hub Financial District',
    'Mountain Getaways Downtown'
);

-- Note: This is a sample of rooms for 6 hotels. You would need to insert similar room data for all 40 hotels.
-- Each hotel should have 5 rooms with different capacities and amenities.
-- The pattern would be similar for the remaining hotels, with appropriate price ranges based on the hotel's rating and location. 