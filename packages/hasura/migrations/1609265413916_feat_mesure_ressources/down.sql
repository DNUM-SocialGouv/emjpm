
ALTER TABLE "public"."mesure_ressources" ALTER COLUMN "niveau_ressource" TYPE numeric;

ALTER TABLE "public"."mesure_ressources" ALTER COLUMN "niveau_ressource" TYPE integer;


DROP TABLE "public"."mesure_ressources_prestations_sociales";

ALTER TABLE "public"."mesure_ressources" ADD COLUMN "prestations_sociales" jsonb;
ALTER TABLE "public"."mesure_ressources" ALTER COLUMN "prestations_sociales" DROP NOT NULL;

DROP TABLE "public"."prestations_sociales";