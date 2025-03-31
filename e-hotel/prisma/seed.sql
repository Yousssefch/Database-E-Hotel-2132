TRUNCATE TABLE "Room" CASCADE;
TRUNCATE TABLE "Hotel" CASCADE;
TRUNCATE TABLE "HotelChain" CASCADE;

INSERT INTO "HotelChain" (name, "centralOfficeAddress", "numberOfHotels", "contactEmail", "phoneNumber") 
VALUES
('Luxury Stays International', '123 Park Avenue, New York, NY 10001', 8, 'corporate@luxurystays.com', '1-800-555-0101'),
('Budget Inn Group', '456 Main Street, Chicago, IL 60601', 8, 'headquarters@budgetinn.com', '1-800-555-0102'),
('Resort Retreats Worldwide', '789 Beach Road, Miami, FL 33139', 8, 'info@resortretreats.com', '1-800-555-0103'),
('Business Hub Hotels', '101 Bay Street, San Francisco, CA 94105', 8, 'contact@businesshub.com', '1-800-555-0104'),
('Mountain Getaways', '202 Alpine Road, Denver, CO 80202', 8, 'reservations@mountaingetaways.com', '1-800-555-0105');

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


WITH RECURSIVE hotel_rooms AS (
    SELECT 
        h.id as hotel_id,
        h.name as hotel_name,
        h.rating,
        1 as room_number
    FROM "Hotel" h
    
    UNION ALL
    
    SELECT 
        hotel_id,
        hotel_name,
        rating,
        room_number + 1
    FROM hotel_rooms
    WHERE room_number < 5
)
INSERT INTO "Room" ("hotelId", name, price, amenities, capacity, "viewType", extendable, problems)
SELECT 
    hr.hotel_id,
    CASE 
        WHEN hr.room_number = 1 THEN 
            CASE 
                WHEN hr.hotel_name LIKE '%Luxury%' THEN 
                    CASE 
                        WHEN hr.rating = 5 THEN 'The Royal Penthouse'
                        ELSE 'The Grand Suite'
                    END
                WHEN hr.hotel_name LIKE '%Resort%' THEN 
                    CASE 
                        WHEN hr.rating = 5 THEN 'The Beachfront Villa'
                        ELSE 'The Ocean Suite'
                    END
                WHEN hr.hotel_name LIKE '%Mountain%' THEN 
                    CASE 
                        WHEN hr.rating = 5 THEN 'The Summit Suite'
                        ELSE 'The Alpine Lodge'
                    END
                ELSE 
                    CASE 
                        WHEN hr.rating = 5 THEN 'The Corner Office Suite'
                        ELSE 'The Executive Quarters'
                    END
            END
        WHEN hr.room_number = 2 THEN 
            CASE 
                WHEN hr.rating >= 4 THEN 'The Family Haven'
                ELSE 'The Family Quarters'
            END
        WHEN hr.room_number = 3 THEN 
            CASE 
                WHEN hr.rating >= 4 THEN 'The Deluxe Chamber'
                ELSE 'The Comfort Room'
            END
        WHEN hr.room_number = 4 THEN 
            CASE 
                WHEN hr.rating >= 4 THEN 'The Standard Suite'
                ELSE 'The Classic Room'
            END
        ELSE 
            CASE 
                WHEN hr.rating >= 4 THEN 'The Cozy Corner'
                ELSE 'The Solo Retreat'
            END
    END as room_name,
    CASE 
        WHEN hr.room_number = 1 THEN 
            CASE 
                WHEN hr.rating = 5 THEN 1299.99
                WHEN hr.rating = 4 THEN 999.99
                ELSE 799.99
            END
        WHEN hr.room_number = 2 THEN 
            CASE 
                WHEN hr.rating = 5 THEN 849.99
                WHEN hr.rating = 4 THEN 699.99
                ELSE 549.99
            END
        WHEN hr.room_number = 3 THEN 
            CASE 
                WHEN hr.rating = 5 THEN 649.99
                WHEN hr.rating = 4 THEN 499.99
                ELSE 399.99
            END
        WHEN hr.room_number = 4 THEN 
            CASE 
                WHEN hr.rating = 5 THEN 449.99
                WHEN hr.rating = 4 THEN 349.99
                ELSE 299.99
            END
        ELSE 
            CASE 
                WHEN hr.rating = 5 THEN 349.99
                WHEN hr.rating = 4 THEN 279.99
                ELSE 229.99
            END
    END as price,
    CASE 
        WHEN hr.room_number = 1 THEN 
            CASE 
                WHEN hr.hotel_name LIKE '%Luxury%' THEN 'Wi-Fi, AC, Smart TV, Mini Bar, Premium View, Butler Service'
                WHEN hr.hotel_name LIKE '%Resort%' THEN 'Wi-Fi, AC, Smart TV, Mini Bar, Beach Access, Pool Access'
                WHEN hr.hotel_name LIKE '%Mountain%' THEN 'Wi-Fi, AC, Smart TV, Mini Bar, Mountain View, Fireplace'
                ELSE 'Wi-Fi, AC, Smart TV, Mini Bar, City View, Work Desk'
            END
        WHEN hr.room_number = 2 THEN 
            CASE 
                WHEN hr.rating >= 4 THEN 'Wi-Fi, AC, Smart TV, Mini Bar, City View, Family Amenities'
                ELSE 'Wi-Fi, AC, TV, City View, Family Amenities'
            END
        ELSE 
            CASE 
                WHEN hr.rating >= 4 THEN 'Wi-Fi, AC, Smart TV, City View'
                ELSE 'Wi-Fi, AC, TV, City View'
            END
    END as amenities,
    CASE 
        WHEN hr.room_number IN (1, 2) THEN 4
        WHEN hr.room_number IN (3, 4) THEN 2
        ELSE 1
    END as capacity,
    CASE 
        WHEN hr.room_number = 1 THEN 
            CASE 
                WHEN hr.hotel_name LIKE '%Resort%' THEN 'Ocean'
                WHEN hr.hotel_name LIKE '%Mountain%' THEN 'Mountain'
                ELSE 'City'
            END
        ELSE 'City'
    END as view_type,
    CASE 
        WHEN hr.room_number <= 3 THEN true
        ELSE false
    END as extendable,
    NULL as problems
FROM hotel_rooms hr;