# 🧪 API ROUTES DOCUMENTATION


---

## 📦 Common Setup for Testing

You can test all routes using:
- **Postman** or **Insomnia** (GUI)
- **cURL** in terminal
- **Fetch API** in frontend code

All requests should be made to:
```bash
http://localhost:3000/api/<route>
```
*(Replace `localhost:3000` with your deployed URL if hosted)*

---

## 🔗 Route Format Template
```http
GET    /api/{model}         → Get all
GET    /api/{model}/:id     → Get one
POST   /api/{model}         → Create one
PUT    /api/{model}/:id     → Update one
DELETE /api/{model}/:id     → Delete one
```

---

## 🏨 /api/hotel-chains

### GET `/api/hotel-chains`
- Returns all hotel chains
- Used to populate dropdowns, filter hotels, etc.

### POST `/api/hotel-chains`
```json
{
  "name": "Marriott",
  "centralOfficeAddress": "123 Corporate Way",
  "numberOfHotels": 20,
  "contactEmail": "contact@marriott.com",
  "phoneNumber": "555-1234"
}
```

### PUT `/api/hotel-chains/:id`
Update hotel chain info

### DELETE `/api/hotel-chains/:id`
Delete a hotel chain (cascades to hotels if configured)

---

## 🏨 /api/hotels

### GET `/api/hotels`
- Lists all hotels with chain info

### POST `/api/hotels`
```json
{
  "name": "Hilton New York",
  "hotelChainId": 1,
  "rating": 5,
  "numberOfRooms": 150,
  "address": "NYC",
  "contactEmail": "info@hilton.com",
  "phoneNumber": "212-0000",
  "urlImage": "https://..."
}
```

---

## 🛏 /api/rooms

### GET `/api/rooms`
- Lists all rooms with hotel info

### POST `/api/rooms`
```json
{
  "hotelId": 1,
  "name": "Suite 101",
  "price": 199.99,
  "amenities": "TV, AC, WiFi",
  "capacity": 2,
  "viewType": "sea",
  "extendable": true,
  "problems": "None"
}
```

---

## 👤 /api/customers

### GET `/api/customers`
- Lists all registered customers

### POST `/api/customers`
```json
{
  "ssn_sin": "123-45-6789",
  "fullName": "John Doe",
  "address": "123 Street",
  "registrationDate": "2024-03-29T00:00:00.000Z",
  "profilePictureURL": "https://..."
}
```

---

## 🧑‍💼 /api/employees

### GET `/api/employees`
- Lists all employees with their assigned hotel

### POST `/api/employees`
```json
{
  "hotelId": 1,
  "fullName": "Alice Smith",
  "address": "456 Ave",
  "ssn_sin": "999-88-7777",
  "role": "Manager"
}
```

---

## 📆 /api/bookings

### GET `/api/bookings`
- Get all current bookings (with customer + room info)

### POST `/api/bookings`
```json
{
  "customerSsnSin": "123-45-6789",
  "roomId": 5,
  "bookingDate": "2024-03-30T00:00:00.000Z",
  "checkInDate": "2024-04-01T14:00:00.000Z",
  "checkOutDate": "2024-04-05T11:00:00.000Z",
  "status": "Confirmed"
}
```

---

## 🔑 /api/rentings

### GET `/api/rentings`
- See all active room rentings with related data

### POST `/api/rentings`
```json
{
  "customerSsnSin": "123-45-6789",
  "roomId": 5,
  "employeeId": 2,
  "checkInDate": "2024-04-01T14:00:00.000Z"
}
```

---

## 🗃️ /api/archives

### GET `/api/archives`
- See all past booking/renting history

### POST `/api/archives`
```json
{
  "bookingRentingId": 7,
  "transactionType": "Renting",
  "customerInfo": "{\"name\":\"John\"}",
  "roomInfo": "{\"room\":\"Suite 101\"}",
  "checkInDate": "2024-04-01T14:00:00.000Z",
  "checkOutDate": "2024-04-05T11:00:00.000Z"
}
```

---

## ✅ Testing Notes

- Test using Postman or curl with JSON body for POST/PUT
- All timestamps must be in ISO format: `YYYY-MM-DDTHH:mm:ss.sssZ`
- For any `DELETE` call, you’ll need the record's `id` or `ssn_sin` from a previous GET

---

- View DB with npx prisma studio

