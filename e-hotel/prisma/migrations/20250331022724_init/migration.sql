-- CreateTable
CREATE TABLE "HotelChain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "centralOfficeAddress" TEXT NOT NULL,
    "numberOfHotels" INTEGER NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "HotelChain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" SERIAL NOT NULL,
    "hotelChainId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "numberOfRooms" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "urlImage" TEXT NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amenities" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "viewType" TEXT NOT NULL,
    "extendable" BOOLEAN NOT NULL,
    "problems" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "ssn_sin" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "profilePictureURL" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("ssn_sin")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ssn_sin" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "customerSsnSin" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Renting" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER,
    "customerSsnSin" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Renting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archives" (
    "id" SERIAL NOT NULL,
    "bookingRentingId" INTEGER NOT NULL,
    "transactionType" TEXT NOT NULL,
    "customerInfo" TEXT NOT NULL,
    "roomInfo" TEXT NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Archives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Renting_bookingId_key" ON "Renting"("bookingId");

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_hotelChainId_fkey" FOREIGN KEY ("hotelChainId") REFERENCES "HotelChain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerSsnSin_fkey" FOREIGN KEY ("customerSsnSin") REFERENCES "Customer"("ssn_sin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_customerSsnSin_fkey" FOREIGN KEY ("customerSsnSin") REFERENCES "Customer"("ssn_sin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
