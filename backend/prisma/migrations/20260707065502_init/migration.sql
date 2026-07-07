-- CreateTable
CREATE TABLE "Aircraft" (
    "id" SERIAL NOT NULL,
    "icao24" TEXT NOT NULL,
    "callsign" TEXT,
    "origin_country" TEXT NOT NULL,
    "time_position" INTEGER,
    "last_contact" INTEGER NOT NULL,
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "baro_altitude" DOUBLE PRECISION,
    "on_ground" BOOLEAN NOT NULL,
    "velocity" DOUBLE PRECISION,
    "true_track" DOUBLE PRECISION,
    "vertical_rate" DOUBLE PRECISION,
    "geo_altitude" DOUBLE PRECISION,
    "squawk" TEXT,
    "spi" BOOLEAN NOT NULL,
    "position_source" INTEGER NOT NULL,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Threat" (
    "id" SERIAL NOT NULL,
    "lat_threat" DOUBLE PRECISION NOT NULL,
    "long_threat" DOUBLE PRECISION NOT NULL,
    "speed_threat" DOUBLE PRECISION NOT NULL,
    "range_threat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Threat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "threatId" INTEGER NOT NULL,
    "aircraftId" INTEGER,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_threatId_fkey" FOREIGN KEY ("threatId") REFERENCES "Threat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft"("id") ON DELETE SET NULL ON UPDATE CASCADE;
