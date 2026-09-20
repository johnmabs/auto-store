import "dotenv/config";
import argon2 from "argon2";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.vehicleImage.deleteMany();
  await prisma.customerRequest.deleteMany();
  await prisma.vehicle.deleteMany();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? "Administrator";

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be defined to seed the admin user.",
    );
  }

  const passwordHash = await argon2.hash(adminPassword);

  await prisma.user.upsert({
    where: {
      email: adminEmail.toLowerCase(),
    },
    update: {
      name: adminName,
      password: passwordHash,
      isActive: true,
    },
    create: {
      name: adminName,
      email: adminEmail.toLowerCase(),
      password: passwordHash,
      isActive: true,
    },
  });

  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        slug: "toyota-land-cruiser-prado-2021-japan",
        make: "Toyota",
        model: "Land Cruiser Prado",
        variant: "TX-L",
        year: 2021,
        mileage: 48500,
        bodyType: "SUV",

        fuelType: "DIESEL",
        transmission: "AUTOMATIC",

        engine: "2.8L Turbo Diesel",
        power: 204,

        color: "Black",
        interiorColor: "Beige",
        doors: 5,
        seats: 7,

        originCountry: "Japan",

        locationStatus: "ABROAD",
        congoCity: null,

        price: 22_500_000,
        currency: "XAF",
        priceBasis: "VEHICLE_ONLY",
        priceNegotiable: true,

        status: "AVAILABLE",
        featured: true,

        description:
          "Toyota Land Cruiser Prado d’occasion, disponible à l’importation depuis le Japon.",

        features: [
          "Climatisation automatique",
          "Caméra de recul",
          "Sièges cuir",
          "Démarrage sans clé",
        ],
      },
    }),

    prisma.vehicle.create({
      data: {
        slug: "toyota-rav4-2022-in-transit",
        make: "Toyota",
        model: "RAV4",
        variant: "Adventure",
        year: 2022,
        mileage: 31000,
        bodyType: "SUV",

        fuelType: "GASOLINE",
        transmission: "AUTOMATIC",

        engine: "2.5L",
        power: 203,

        color: "White",
        interiorColor: "Black",
        doors: 5,
        seats: 5,

        originCountry: "United States",

        locationStatus: "IN_TRANSIT",
        congoCity: null,

        price: 19_800_000,
        currency: "XAF",
        priceBasis: "VEHICLE_ONLY",
        priceNegotiable: true,

        status: "AVAILABLE",
        featured: true,

        description:
          "Toyota RAV4 d’occasion actuellement en transit vers le Congo.",

        features: [
          "Caméra de recul",
          "Apple CarPlay",
          "Bluetooth",
          "Régulateur de vitesse",
        ],
      },
    }),

    prisma.vehicle.create({
      data: {
        slug: "lexus-rx350-2020-pointe-noire",
        make: "Lexus",
        model: "RX 350",
        year: 2020,
        mileage: 56000,
        bodyType: "SUV",

        fuelType: "GASOLINE",
        transmission: "AUTOMATIC",

        engine: "3.5L V6",
        power: 295,

        color: "Pearl White",
        interiorColor: "Black",
        doors: 5,
        seats: 5,

        originCountry: "United States",

        locationStatus: "IN_CONGO",
        congoCity: "POINTE_NOIRE",

        price: 28_500_000,
        currency: "XAF",
        priceBasis: "LANDED",
        priceNegotiable: true,

        status: "AVAILABLE",
        featured: true,

        description:
          "Lexus RX 350 déjà disponible à Pointe-Noire. Prix incluant les charges d’importation prises en compte par le vendeur.",

        features: [
          "Toit ouvrant",
          "Sièges cuir",
          "Caméra 360°",
          "Démarrage sans clé",
          "Navigation GPS",
        ],
      },
    }),

    prisma.vehicle.create({
      data: {
        slug: "mercedes-benz-c300-2019-brazzaville",
        make: "Mercedes-Benz",
        model: "C 300",
        year: 2019,
        mileage: 72000,
        bodyType: "SEDAN",

        fuelType: "GASOLINE",
        transmission: "AUTOMATIC",

        engine: "2.0L Turbo",
        power: 255,

        color: "Silver",
        interiorColor: "Black",
        doors: 4,
        seats: 5,

        originCountry: "Germany",

        locationStatus: "IN_CONGO",
        congoCity: "BRAZZAVILLE",

        price: 17_900_000,
        currency: "XAF",
        priceBasis: "LANDED",
        priceNegotiable: false,

        status: "RESERVED",
        featured: false,

        description:
          "Mercedes-Benz C 300 disponible à Brazzaville, actuellement réservée.",

        features: [
          "Climatisation automatique",
          "Caméra de recul",
          "Bluetooth",
          "Sièges électriques",
        ],
      },
    }),

    prisma.vehicle.create({
      data: {
        slug: "bmw-x5-2018-sold",
        make: "BMW",
        model: "X5",
        year: 2018,
        mileage: 84000,
        bodyType: "SUV",

        fuelType: "DIESEL",
        transmission: "AUTOMATIC",

        engine: "3.0L",
        power: 258,

        color: "Black",
        interiorColor: "Brown",
        doors: 5,
        seats: 5,

        originCountry: "Germany",

        locationStatus: "IN_CONGO",
        congoCity: "POINTE_NOIRE",

        price: 21_000_000,
        currency: "XAF",
        priceBasis: "LANDED",
        priceNegotiable: false,

        status: "SOLD",
        featured: false,

        description:
          "BMW X5 d’occasion précédemment disponible à Pointe-Noire.",

        features: [
          "Toit panoramique",
          "Sièges cuir",
          "Navigation GPS",
          "Caméra de recul",
        ],
      },
    }),
  ]);

  console.log(`Seed completed: ${vehicles.length} vehicles created.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
