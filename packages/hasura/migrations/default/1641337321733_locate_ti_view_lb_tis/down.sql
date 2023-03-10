-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION public.locate_ti_view_lb_tis(lat double precision, lon double precision)
--  RETURNS SETOF view_lb_tis
--  LANGUAGE sql
--  STABLE
-- AS $function$
--     SELECT
--         DISTINCT ON(uid) uid,
--         ti_id,
--         liste_blanche_id,
--         service_id,
--         mandataire_id,
--         user_type,
--         nom,
--         siret,
--         code_postal,
--         ville,
--         adress,
--         email,
--         departement_code,
--         mesures_max,
--         mesures_awaiting,
--         mesures_in_progress,
--         remaining_capacity,
--         prefer,
--         habilitation,
--         available,
--         latitude,
--         longitude,
--         distance
--     FROM (
--         SELECT
--             uid,
--             ti_id,
--             liste_blanche_id,
--             service_id,
--             mandataire_id,
--             user_type,
--             nom,
--             siret,
--             code_postal,
--             ville,
--             adress,
--             email,
--             departement_code,
--             mesures_max,
--             mesures_awaiting,
--             mesures_in_progress,
--             remaining_capacity,
--             prefer,
--             habilitation,
--             available,
--             latitude,
--             longitude,
--             (ST_Distance(
--                 ST_Transform(ST_SetSRID(ST_Point(longitude, latitude),4326),3857),
--                 ST_Transform(ST_SetSRID(ST_Point(lon, lat),4326),3857)
--             )/1000) as distance
--         FROM
--             view_lb_tis
--         WHERE
--             view_lb_tis.latitude IS NOT NULL AND view_lb_tis.longitude IS NOT NULL
--     ) v
-- $function$;
