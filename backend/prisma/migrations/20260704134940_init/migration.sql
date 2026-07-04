-- CreateTable
CREATE TABLE "Aircraft" (
    "id" SERIAL NOT NULL,
    "icao24" TEXT NOT NULL,
    "callsign" TEXT NOT NULL,
    "origin_country" TEXT NOT NULL,
    "time_position" INTEGER NOT NULL,
    "last_contact" INTEGER NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "baro_altitude" DOUBLE PRECISION NOT NULL,
    "on_ground" BOOLEAN NOT NULL,
    "velocity" DOUBLE PRECISION NOT NULL,
    "true_track" DOUBLE PRECISION NOT NULL,
    "vertical_rate" DOUBLE PRECISION NOT NULL,
    "sensors" INTEGER[],
    "geo_altitude" DOUBLE PRECISION NOT NULL,
    "squawk" TEXT NOT NULL,
    "spi" BOOLEAN NOT NULL,
    "position_source" INTEGER NOT NULL,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Threat" (
    "id" SERIAL NOT NULL,
    "lat_threat" INTEGER NOT NULL,
    "long_threat" INTEGER NOT NULL,
    "speed_threat" INTEGER NOT NULL,
    "range_threat" INTEGER NOT NULL,

    CONSTRAINT "Threat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "threatId" INTEGER NOT NULL,
    "aircraftId" INTEGER NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_threatId_fkey" FOREIGN KEY ("threatId") REFERENCES "Threat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
