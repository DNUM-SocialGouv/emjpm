-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW "public"."view_mandataires_siret" AS
--  SELECT lbu.siret
--    FROM (mandataires m
--      JOIN lb_users lbu ON ((lbu.id = m.lb_user_id))) WHERE lbu.siret IS NOT NULL;
