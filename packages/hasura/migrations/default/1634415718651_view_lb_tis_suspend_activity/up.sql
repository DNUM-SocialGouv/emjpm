CREATE OR REPLACE VIEW "public"."view_lb_tis" AS 
 SELECT concat('service-', ser.id) AS uid,
    NULL::integer AS ti_id,
    NULL::integer AS lb_user_id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'service'::text AS user_type,
    ser.etablissement AS nom,
    ser.siret,
    ser.code_postal,
    ser.ville,
    ser.adresse AS adress,
    ser.email,
    dep.id AS departement_code,
    CASE WHEN(ser.suspend_activity IS NOT TRUE) THEN ser.dispo_max ELSE 0 END mesures_max,
    ser.mesures_awaiting,
    ser.mesures_in_progress,
    CASE WHEN(ser.suspend_activity IS NOT TRUE) THEN ((ser.dispo_max - ser.mesures_awaiting) - ser.mesures_in_progress) ELSE 0 END remaining_capacity,
    false AS prefer,
    true AS habilitation,
    ((CASE WHEN(ser.suspend_activity IS NOT TRUE) THEN ((ser.dispo_max - ser.mesures_awaiting) - ser.mesures_in_progress) ELSE 0 END) > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM (((services ser
     JOIN service_departements sdep ON ((sdep.service_id = ser.id)))
     JOIN departements dep ON (((dep.id)::text = sdep.departement_code)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (ser.code_postal)::text)))
UNION
 SELECT concat('service-', ser.id) AS uid,
    sti.ti_id,
    NULL::integer AS lb_user_id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'service'::text AS user_type,
    ser.etablissement AS nom,
    ser.siret,
    ser.code_postal,
    ser.ville,
    ser.adresse AS adress,
    ser.email,
    NULL::character varying(255) AS departement_code,
    CASE WHEN(ser.suspend_activity IS NOT TRUE) THEN ser.dispo_max ELSE 0 END mesures_max,
    ser.mesures_awaiting,
    ser.mesures_in_progress,
    CASE WHEN(ser.suspend_activity IS NOT TRUE) THEN ((ser.dispo_max - ser.mesures_awaiting) - ser.mesures_in_progress) ELSE 0 END remaining_capacity,
    true AS prefer,
    true AS habilitation,
    ((CASE WHEN(ser.suspend_activity IS NOT TRUE) THEN ((ser.dispo_max - ser.mesures_awaiting) - ser.mesures_in_progress) ELSE 0 END) > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM ((services ser
     JOIN service_tis sti ON ((sti.service_id = ser.id)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (ser.code_postal)::text)))
UNION
 SELECT concat('individuel-', man.id) AS uid,
    NULL::integer AS ti_id,
    lbu.id AS lb_user_id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'individuel'::text AS user_type,
    concat(lbu.nom, ' ', lbu.prenom) AS nom,
    lbu.siret,
    lbu.code_postal,
    lbu.ville,
    concat_ws(' '::text, lbu.adresse1, lbu.adresse2) AS adress,
    lbu.email,
    dep.id AS departement_code,
    CASE WHEN(man.suspend_activity IS NOT TRUE) THEN man.dispo_max ELSE 0 END mesures_max,
    man.mesures_en_attente AS mesures_awaiting,
    man.mesures_en_cours AS mesures_in_progress,
    CASE WHEN(man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) ELSE 0 END remaining_capacity,
    false AS prefer,
        CASE
            WHEN (lbu.id IS NOT NULL) THEN true
            ELSE false
        END AS habilitation,
    ((CASE WHEN(man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) ELSE 0 END) > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM (((((mandataires man
     JOIN users u ON ((u.id = man.user_id)))
     LEFT JOIN lb_users lbu ON ((man.lb_user_id = lbu.id)))
     LEFT JOIN lb_departements lbd ON ((lbu.id = lbd.lb_user_id)))
     LEFT JOIN departements dep ON (((lbd.departement_code)::text = (dep.id)::text)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (man.code_postal)::text)))
  WHERE ((u.type)::text = 'individuel'::text)
UNION
 SELECT concat('individuel-', man.id) AS uid,
    mti.ti_id,
    lbu.id AS lb_user_id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'individuel'::text AS user_type,
    concat(lbu.nom, ' ', lbu.prenom) AS nom,
    lbu.siret,
    lbu.code_postal,
    lbu.ville,
    concat_ws(' '::text, lbu.adresse1, lbu.adresse2) AS adress,
    lbu.email,
    NULL::character varying(255) AS departement_code,
    CASE WHEN(man.suspend_activity IS NOT TRUE) THEN man.dispo_max ELSE 0 END mesures_max,
    man.mesures_en_attente AS mesures_awaiting,
    man.mesures_en_cours AS mesures_in_progress,
    CASE WHEN(man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) ELSE 0 END remaining_capacity,
    true AS prefer,
        CASE
            WHEN (lbu.id IS NOT NULL) THEN true
            ELSE false
        END AS habilitation,
    ((CASE WHEN(man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) ELSE 0 END) > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM ((((mandataires man
     JOIN users u ON ((u.id = man.user_id)))
     LEFT JOIN lb_users lbu ON ((man.lb_user_id = lbu.id)))
     JOIN mandataire_tis mti ON ((mti.mandataire_id = man.id)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (man.code_postal)::text)))
  WHERE ((u.type)::text = 'individuel'::text)
UNION
 SELECT concat('prepose-', man.id) AS uid,
    NULL::integer AS ti_id,
    lbu.id AS lb_user_id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'prepose'::text AS user_type,
    concat(lbu.nom, ' ', lbu.prenom) AS nom,
    lbu.siret,
    lbu.code_postal,
    lbu.ville,
    concat_ws(' '::text, lbu.adresse1, lbu.adresse2) AS adress,
    lbu.email,
    dep.id AS departement_code,
    CASE WHEN(man.suspend_activity IS NOT TRUE) THEN man.dispo_max ELSE 0 END mesures_max,
    man.mesures_en_attente AS mesures_awaiting,
    man.mesures_en_cours AS mesures_in_progress,
    CASE WHEN(man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) ELSE 0 END remaining_capacity,
    false AS prefer,
        CASE
            WHEN (lbu.id IS NOT NULL) THEN true
            ELSE false
        END AS habilitation,
    ((CASE WHEN(man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) ELSE 0 END) > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM ((((((mandataires man
     JOIN users u ON ((u.id = man.user_id)))
     LEFT JOIN lb_users lbu ON ((man.lb_user_id = lbu.id)))
     LEFT JOIN lb_user_etablissements lbue ON ((lbu.id = lbue.lb_user_id)))
     LEFT JOIN etablissements e ON ((e.id = lbue.etablissement_id)))
     LEFT JOIN departements dep ON (((e.departement_code)::text = (dep.id)::text)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (man.code_postal)::text)))
  WHERE ((u.type)::text = 'prepose'::text)
UNION
 SELECT concat('prepose-', man.id) AS uid,
    mti.ti_id,
    lbu.id AS lb_user_id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'prepose'::text AS user_type,
    concat(lbu.nom, ' ', lbu.prenom) AS nom,
    lbu.siret,
    lbu.code_postal,
    lbu.ville,
    concat_ws(' '::text, lbu.adresse1, lbu.adresse2) AS adress,
    lbu.email,
    NULL::character varying(255) AS departement_code,
    CASE WHEN(man.suspend_activity IS NOT TRUE) THEN man.dispo_max ELSE 0 END mesures_max,
    man.mesures_en_attente AS mesures_awaiting,
    man.mesures_en_cours AS mesures_in_progress,
    CASE WHEN(man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) ELSE 0 END remaining_capacity,
    true AS prefer,
        CASE
            WHEN (lbu.id IS NOT NULL) THEN true
            ELSE false
        END AS habilitation,
    ((CASE WHEN(man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) ELSE 0 END) > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM ((((mandataires man
     JOIN users u ON ((u.id = man.user_id)))
     LEFT JOIN lb_users lbu ON ((man.lb_user_id = lbu.id)))
     JOIN mandataire_tis mti ON ((mti.mandataire_id = man.id)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (man.code_postal)::text)))
  WHERE ((u.type)::text = 'prepose'::text);
