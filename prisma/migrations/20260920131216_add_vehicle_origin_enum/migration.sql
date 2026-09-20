CREATE TYPE "VehicleOrigin" AS ENUM (
  'JAPAN',
  'CHINA',
  'UNITED_ARAB_EMIRATES',
  'GERMANY',
  'FRANCE',
  'SOUTH_KOREA',
  'UNITED_STATES'
);

ALTER TABLE "Vehicle"
ADD COLUMN "originCountry_new" "VehicleOrigin";

UPDATE "Vehicle"
SET "originCountry_new" =
  CASE
    WHEN LOWER("originCountry") = 'japan' THEN 'JAPAN'::"VehicleOrigin"
    WHEN LOWER("originCountry") = 'china' THEN 'CHINA'::"VehicleOrigin"
    WHEN LOWER("originCountry") IN (
      'united arab emirates',
      'uae',
      'dubai'
    ) THEN 'UNITED_ARAB_EMIRATES'::"VehicleOrigin"
    WHEN LOWER("originCountry") = 'germany' THEN 'GERMANY'::"VehicleOrigin"
    WHEN LOWER("originCountry") = 'france' THEN 'FRANCE'::"VehicleOrigin"
    WHEN LOWER("originCountry") IN (
      'south korea',
      'korea'
    ) THEN 'SOUTH_KOREA'::"VehicleOrigin"
    WHEN LOWER("originCountry") IN (
      'united states',
      'usa',
      'united states of america'
    ) THEN 'UNITED_STATES'::"VehicleOrigin"
    ELSE NULL
  END;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "Vehicle"
    WHERE "originCountry_new" IS NULL
  ) THEN
    RAISE EXCEPTION 'Some Vehicle.originCountry values could not be converted';
  END IF;
END $$;

ALTER TABLE "Vehicle"
DROP COLUMN "originCountry";

ALTER TABLE "Vehicle"
RENAME COLUMN "originCountry_new" TO "originCountry";

ALTER TABLE "Vehicle"
ALTER COLUMN "originCountry" SET NOT NULL;