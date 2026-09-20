-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('DRAFT', 'AVAILABLE', 'RESERVED', 'SOLD');

-- CreateEnum
CREATE TYPE "VehicleLocationStatus" AS ENUM ('ABROAD', 'IN_TRANSIT', 'IN_CONGO');

-- CreateEnum
CREATE TYPE "CongoCity" AS ENUM ('POINTE_NOIRE', 'BRAZZAVILLE');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('XAF', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "PriceBasis" AS ENUM ('VEHICLE_ONLY', 'LANDED');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('GASOLINE', 'DIESEL', 'HYBRID', 'PLUGIN_HYBRID', 'ELECTRIC', 'OTHER');

-- CreateEnum
CREATE TYPE "TransmissionType" AS ENUM ('AUTOMATIC', 'MANUAL', 'CVT', 'DCT', 'OTHER');

-- CreateEnum
CREATE TYPE "VehicleBodyType" AS ENUM ('SUV', 'SEDAN', 'HATCHBACK', 'COUPE', 'PICKUP', 'MINIVAN', 'WAGON', 'CONVERTIBLE', 'OTHER');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "variant" TEXT,
    "year" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "bodyType" "VehicleBodyType" NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "transmission" "TransmissionType" NOT NULL,
    "engine" TEXT,
    "power" INTEGER,
    "color" TEXT,
    "interiorColor" TEXT,
    "doors" INTEGER,
    "seats" INTEGER,
    "originCountry" TEXT NOT NULL,
    "locationStatus" "VehicleLocationStatus" NOT NULL,
    "congoCity" "CongoCity",
    "price" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "priceBasis" "PriceBasis" NOT NULL,
    "priceNegotiable" BOOLEAN NOT NULL DEFAULT false,
    "status" "VehicleStatus" NOT NULL DEFAULT 'DRAFT',
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "features" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_slug_key" ON "Vehicle"("slug");

-- CreateIndex
CREATE INDEX "Vehicle_status_idx" ON "Vehicle"("status");

-- CreateIndex
CREATE INDEX "Vehicle_locationStatus_idx" ON "Vehicle"("locationStatus");

-- CreateIndex
CREATE INDEX "Vehicle_make_model_idx" ON "Vehicle"("make", "model");

-- CreateIndex
CREATE INDEX "Vehicle_year_idx" ON "Vehicle"("year");

-- CreateIndex
CREATE INDEX "Vehicle_price_idx" ON "Vehicle"("price");
