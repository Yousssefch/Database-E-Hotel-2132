const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding database...');

  // Create hotel chains
  const chain1 = await prisma.hotelChain.create({
    data: {
      name: 'Luxury Hotels Group',
      centralOfficeAddress: '123 Main St, New York, NY',
      numberOfHotels: 5,
      contactEmail: 'info@luxuryhotels.com',
      phoneNumber: '123-456-7890'
    }
  });

  console.log('Created hotel chain:', chain1);

  // Create hotels
  const hotel1 = await prisma.hotel.create({
    data: {
      name: 'Grand Hotel of Paris',
      address: '123 Champs-Élysées, Paris, France',
      rating: 5,
      numberOfRooms: 10,
      phoneNumber: '123-456-7890',
      contactEmail: 'info@grandhotel.com',
      hotelChainId: chain1.id,
      urlImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945'
    }
  });

  console.log('Created hotel:', hotel1);

  // Create employees
  const employee1 = await prisma.employee.create({
    data: {
      ssn_sin: '123-45-6789',
      fullName: 'John Smith',
      address: '456 Avenue St, Paris, France',
      role: 'Manager',
      hotelId: hotel1.id
    }
  });

  console.log('Created employee:', employee1);

  // Create rooms
  const room1 = await prisma.room.create({
    data: {
      hotelId: hotel1.id,
      name: 'Deluxe Suite',
      price: 199.99,
      amenities: 'TV,WiFi,Minibar',
      capacity: 2,
      viewType: 'City',
      extendable: true,
      problems: null
    }
  });

  const room2 = await prisma.room.create({
    data: {
      hotelId: hotel1.id,
      name: 'Executive Room',
      price: 149.99,
      amenities: 'TV,WiFi',
      capacity: 1,
      viewType: 'Garden',
      extendable: false,
      problems: null
    }
  });

  console.log('Created rooms:', room1, room2);

  // Create customers
  const customer1 = await prisma.customer.create({
    data: {
      ssn_sin: '987-65-4321',
      fullName: 'Jane Doe',
      address: '789 Rue St, Paris, France',
      registrationDate: new Date(),
      profilePictureURL: 'https://randomuser.me/api/portraits/women/42.jpg'
    }
  });

  console.log('Created customer:', customer1);

  // Create bookings
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
  
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

  const booking1 = await prisma.booking.create({
    data: {
      customerSsnSin: customer1.ssn_sin,
      roomId: room1.id,
      bookingDate: new Date(),
      checkInDate: oneWeekFromNow,
      checkOutDate: twoWeeksFromNow,
      status: 'confirmed'
    }
  });

  console.log('Created booking:', booking1);

  // Create a renting
  const renting1 = await prisma.renting.create({
    data: {
      bookingId: booking1.id,
      customerSsnSin: customer1.ssn_sin,
      roomId: room1.id,
      employeeId: employee1.id,
      checkInDate: oneWeekFromNow,
      checkOutDate: twoWeeksFromNow
    }
  });

  console.log('Created renting:', renting1);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 