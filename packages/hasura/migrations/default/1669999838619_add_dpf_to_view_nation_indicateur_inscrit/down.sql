-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW "public"."view_nation_indicateur_inscrit" AS
--  SELECT u.type,
--     count(m.id) AS count
--    FROM mandataires m,
--     users u
--   WHERE ((m.user_id = u.id) AND (u.active = true))
--   GROUP BY u.type
-- UNION
--  SELECT u.type,
--     count(DISTINCT sm.service_id) AS count
--    FROM users u,
--     departements d,
--     service_members sm,
--     services s
--   WHERE ((u.active = true) AND (u.id = sm.user_id) AND (sm.service_id = s.id))
--   GROUP BY u.type
-- UNION
--  SELECT u.type,
--     count(DISTINCT m.id) AS count
--    FROM ((tis t
--      JOIN magistrat m ON ((m.ti_id = t.id)))
--      JOIN users u ON ((u.id = m.user_id)))
--   WHERE (u.active = true)
--   GROUP BY u.type
-- UNION
--  SELECT u.type,
--     count(DISTINCT g.id) AS count
--    FROM ((tis t
--      JOIN greffier g ON ((g.ti_id = t.id)))
--      JOIN users u ON ((u.id = g.user_id)))
--   WHERE (u.active = true)
--   GROUP BY u.type
-- UNION
--  SELECT u.type,
--     count(DISTINCT di.id) AS count
--    FROM (direction di
--      JOIN users u ON ((di.user_id = u.id)))
--   WHERE (u.active = true)
--   GROUP BY u.type
-- UNION
--  SELECT
--   u.type,
--   count(fi.id) AS count
--  FROM
--   dpfi fi,
--   users u
--   WHERE
--    (
--      (fi.user_id = u.id)
--      AND (u.active = true)
--    )
--  GROUP BY
--   u.type
-- UNION
--  SELECT
--   u.type,
--   count(DISTINCT sm.sdpf_id) AS count
--  FROM
--   users u,
--   departements d,
--   sdpf_members sm,
--   sdpf s
--  WHERE
--    (
--      (u.active = true)
--      AND (u.id = sm.user_id)
--      AND (sm.sdpf_id = s.id)
--    )
--  GROUP BY
--   u.type;
