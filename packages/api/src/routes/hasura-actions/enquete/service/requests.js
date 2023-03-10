/* eslint-disable no-unused-vars */

const { graphqlFetch, backendAuthHeaders } = require("~/utils/graphql-fetcher");
const {
  ENQUETE,
  ENQUETE_REPONSE_SERVICE,
  ENQUETE_REPONSE_DEFAULT_VALUES,
  NB_MESURES,
} = require("./queries");
const { INIT_ENQUETE_REPONSE, SUBMIT_ENQUETE_REPONSE } = require("./mutations");
const logger = require("~/utils/logger");

module.exports = {
  createEmptyEnqueteReponse: async ({ enqueteId, serviceId }) => {
    const { data: enqueteData } = await graphqlFetch(
      { enqueteId },
      ENQUETE,
      backendAuthHeaders
    );

    const enqueteAnnee = enqueteData.enquetes_by_pk.annee;
    const year = enqueteAnnee - 1;
    const yearLess1 = year - 1;
    const yearLess3 = year - 3;
    const yearLess5 = year - 5;
    const yearLess10 = year - 10;
    const yearLess25 = year - 25;
    const yearLess39 = year - 39;
    const yearLess40 = year - 40;
    const yearLess59 = year - 59;
    const yearLess60 = year - 60;
    const yearLess74 = year - 74;
    const yearLess75 = year - 75;

    try {
      const { data: enqueteReponseDefaultData, errors: errorsDefaultData } =
        await graphqlFetch(
          {
            serviceId,
            year: year.toString(),
          },
          ENQUETE_REPONSE_DEFAULT_VALUES,
          backendAuthHeaders
        );

      if (errorsDefaultData) {
        console.error("errorsDefaultData", errorsDefaultData);
      }

      const defaultValues = {
        departement: null,
        nom: null,
        region: null,
      };

      const service = enqueteReponseDefaultData.services_by_pk;

      const { etablissement, departement } = service;

      defaultValues.region = departement.region.nom;
      defaultValues.departementCode = departement.id;
      defaultValues.departement = departement.nom;
      defaultValues.nom = etablissement;

      const previous =
        enqueteReponseDefaultData.previous_enquete?.[0]?.enquete_reponses?.[0];

      const dateStart = new Date(enqueteAnnee - 1, 0, 1);
      const dateEnd = new Date(enqueteAnnee - 1, 11, 31);
      const { data: nbMesures, errors: errorsNbMesures } = await graphqlFetch(
        {
          dateEnd,
          dateStart,
          dateYearLess1: new Date(yearLess1, 0, 1),
          dateYearLess10: new Date(yearLess10, 0, 1),
          dateYearLess3: new Date(yearLess3, 0, 1),
          dateYearLess5: new Date(yearLess5, 0, 1),
          serviceId,
          yearLess25: yearLess25.toString(),
          yearLess39: yearLess39.toString(),
          yearLess40: yearLess40.toString(),
          yearLess59: yearLess59.toString(),
          yearLess60: yearLess60.toString(),
          yearLess74: yearLess74.toString(),
          yearLess75: yearLess75.toString(),
        },
        NB_MESURES,
        backendAuthHeaders
      );

      if (errorsNbMesures) {
        console.error("errorsNbMesures", errorsNbMesures);
      }

      // # 2. Informations service
      if (previous) {
        for (const k of [
          "nb_structures_concernees",
          "affiliation_federation",
          "type_organisme_gestionnaire",
        ]) {
          defaultValues[k] = previous.enquete_reponses_service_informations[k];
        }
      }

      // # 3. Personnel et formation
      if (previous) {
        for (const k of [
          "nb_delegues",
          "nb_delegues_etp",
          "nb_delegues_cnc",
          "nb_delegues_en_formation",
          "total_heures_delegues_en_formation",
          "nb_delegues_non_formes",
          "nb_delegues_niveau1",
          "nb_delegues_niveau1_etp",
          "nb_delegues_niveau2",
          "nb_delegues_niveau2_etp",
          "nb_delegues_niveau3",
          "nb_delegues_niveau3_etp",
          "nb_delegues_niveau4",
          "nb_delegues_niveau4_etp",
          "nb_delegues_niveau5",
          "nb_delegues_niveau5_etp",
          "nb_delegues_niveau6",
          "nb_delegues_niveau6_etp",
          "nb_delegues_homme",
          "nb_delegues_homme_etp",
          "nb_delegues_femme",
          "nb_delegues_femme_etp",
        ]) {
          defaultValues[k] =
            previous.enquete_reponses_service_personnel_formation[k];
        }
      }

      // # 4. Activit?? dans l'ann??e
      for (const k of [
        "curatelle_renforcee_etablissement_debut_annee",
        "curatelle_renforcee_etablissement_fin_annee",
        "curatelle_renforcee_domicile_debut_annee",
        "curatelle_renforcee_domicile_fin_annee",
        "curatelle_simple_etablissement_debut_annee",
        "curatelle_simple_etablissement_fin_annee",
        "curatelle_simple_domicile_debut_annee",
        "curatelle_simple_domicile_fin_annee",
        "tutelle_etablissement_debut_annee",
        "tutelle_etablissement_fin_annee",
        "tutelle_domicile_debut_annee",
        "tutelle_domicile_fin_annee",
        "accompagnement_judiciaire_etablissement_debut_annee",
        "accompagnement_judiciaire_etablissement_fin_annee",
        "accompagnement_judiciaire_domicile_debut_annee",
        "accompagnement_judiciaire_domicile_fin_annee",
        "curatelle_biens_etablissement_debut_annee",
        "curatelle_biens_etablissement_fin_annee",
        "curatelle_biens_domicile_debut_annee",
        "curatelle_personne_etablissement_debut_annee",
        "curatelle_personne_etablissement_fin_annee",
        "curatelle_personne_domicile_debut_annee",
        "curatelle_personne_domicile_fin_annee",
        "subroge_tuteur_createur_debut_annee",
        "subroge_tuteur_createur_fin_annee",
        "sauvegarde_justice_debut_annee",
        "sauvegarde_justice_fin_annee",
        "mandat_adhoc_majeur_debut_annee",
        "mandat_adhoc_majeur_fin_annee",
        "curatelle_renforcee_etablissement_mesures_nouvelles",
        "curatelle_renforcee_etablissement_sortie_mesures",
        "curatelle_renforcee_domicile_mesures_nouvelles",
        "curatelle_renforcee_domicile_sortie_mesures",
        "curatelle_simple_etablissement_mesures_nouvelles",
        "curatelle_simple_etablissement_sortie_mesures",
        "curatelle_simple_domicile_mesures_nouvelles",
        "curatelle_simple_domicile_sortie_mesures",
        "tutelle_etablissement_mesures_nouvelles",
        "tutelle_etablissement_sortie_mesures",
        "tutelle_domicile_mesures_nouvelles",
        "tutelle_domicile_sortie_mesures",
        "accompagnement_judiciaire_etablissement_mesures_nouvelles",
        "accompagnement_judiciaire_etablissement_sortie_mesures",
        "accompagnement_judiciaire_domicile_mesures_nouvelles",
        "accompagnement_judiciaire_domicile_sortie_mesures",
        "curatelle_biens_etablissement_mesures_nouvelles",
        "curatelle_biens_etablissement_sortie_mesures",
        "curatelle_biens_domicile_mesures_nouvelles",
        "curatelle_biens_domicile_sortie_mesures",
        "curatelle_personne_etablissement_mesures_nouvelles",
        "curatelle_personne_etablissement_sortie_mesures",
        "curatelle_personne_domicile_mesures_nouvelles",
        "curatelle_personne_domicile_sortie_mesures",
        "subroge_tuteur_createur_mesures_nouvelles",
        "subroge_tuteur_createur_sortie_mesures",
        "sauvegarde_justice_mesures_nouvelles",
        "sauvegarde_justice_sortie_mesures",
        "mandat_adhoc_majeur_mesures_nouvelles",
        "mandat_adhoc_majeur_sortie_mesures",
        "revisions_main_levee",
        "revisions_reconduction",
        "revisions_changement",
        "revisions_autre",
        "sorties_main_levee",
        "sorties_deces",
      ]) {
        defaultValues[k] = nbMesures[k].aggregate.count;
      }

      // # 5. Population
      for (const k of [
        "tutelle_age_inf_25_ans_homme",
        "tutelle_age_inf_25_ans_femme",
        "tutelle_age_25_39_ans_homme",
        "tutelle_age_25_39_ans_femme",
        "tutelle_age_40_59_ans_homme",
        "tutelle_age_40_59_ans_femme",
        "tutelle_age_60_74_ans_homme",
        "tutelle_age_60_74_ans_femme",
        "tutelle_age_sup_75_ans_homme",
        "tutelle_age_sup_75_ans_femme",
        "curatelle_age_inf_25_ans_homme",
        "curatelle_age_inf_25_ans_femme",
        "curatelle_age_25_39_ans_homme",
        "curatelle_age_25_39_ans_femme",
        "curatelle_age_40_59_ans_homme",
        "curatelle_age_40_59_ans_femme",
        "curatelle_age_60_74_ans_homme",
        "curatelle_age_60_74_ans_femme",
        "curatelle_age_sup_75_ans_homme",
        "curatelle_age_sup_75_ans_femme",
        "maj_age_inf_25_ans_homme",
        "maj_age_inf_25_ans_femme",
        "maj_age_25_39_ans_homme",
        "maj_age_25_39_ans_femme",
        "maj_age_40_59_ans_homme",
        "maj_age_40_59_ans_femme",
        "maj_age_60_74_ans_homme",
        "maj_age_60_74_ans_femme",
        "maj_age_sup_75_ans_homme",
        "maj_age_sup_75_ans_femme",
        "sauvegarde_justice_age_inf_25_ans_homme",
        "sauvegarde_justice_age_inf_25_ans_femme",
        "sauvegarde_justice_age_25_39_ans_homme",
        "sauvegarde_justice_age_25_39_ans_femme",
        "sauvegarde_justice_age_40_59_ans_homme",
        "sauvegarde_justice_age_40_59_ans_femme",
        "sauvegarde_justice_age_60_74_ans_homme",
        "sauvegarde_justice_age_60_74_ans_femme",
        "sauvegarde_justice_age_sup_75_ans_homme",
        "sauvegarde_justice_age_sup_75_ans_femme",
        "autre_mesures_age_inf_25_ans_homme",
        "autre_mesures_age_inf_25_ans_femme",
        "autre_mesures_age_25_39_ans_homme",
        "autre_mesures_age_25_39_ans_femme",
        "autre_mesures_age_40_59_ans_homme",
        "autre_mesures_age_40_59_ans_femme",
        "autre_mesures_age_60_74_ans_homme",
        "autre_mesures_age_60_74_ans_femme",
        "autre_mesures_age_sup_75_ans_homme",
        "autre_mesures_age_sup_75_ans_femme",
        "tutelle_anciennete_inf_1_an",
        "tutelle_anciennete_1_3_ans",
        "tutelle_anciennete_3_5_ans",
        "tutelle_anciennete_5_10_ans",
        "tutelle_anciennete_sup_10_ans",
        "curatelle_anciennete_inf_1_an",
        "curatelle_anciennete_1_3_ans",
        "curatelle_anciennete_3_5_ans",
        "curatelle_anciennete_5_10_ans",
        "curatelle_anciennete_sup_10_ans",
        "maj_anciennete_inf_1_an",
        "maj_anciennete_1_3_ans",
        "maj_anciennete_3_5_ans",
        "maj_anciennete_5_10_ans",
        "maj_anciennete_sup_10_ans",
        "sauvegarde_justice_anciennete_inf_1_an",
        "sauvegarde_justice_anciennete_1_3_ans",
        "sauvegarde_justice_anciennete_3_5_ans",
        "sauvegarde_justice_anciennete_5_10_ans",
        "sauvegarde_justice_anciennete_sup_10_ans",
        "autre_mesures_anciennete_inf_1_an",
        "autre_mesures_anciennete_1_3_ans",
        "autre_mesures_anciennete_3_5_ans",
        "autre_mesures_anciennete_5_10_ans",
        "autre_mesures_anciennete_sup_10_ans",
        "tutelle_etablissement_personne_handicapee",
        "tutelle_service_personne_handicapee",
        "tutelle_autre_etablissement_personne_agee",
        "tutelle_chrs",
        "tutelle_service_hospitalier_soins_longue_duree",
        "tutelle_service_psychiatrique",
        "tutelle_autre_service",
        "curatelle_etablissement_personne_handicapee",
        "curatelle_service_personne_handicapee",
        "curatelle_autre_etablissement_personne_agee",
        "curatelle_chrs",
        "curatelle_service_hospitalier_soins_longue_duree",
        "curatelle_service_psychiatrique",
        "curatelle_autre_service",
        "maj_etablissement_personne_handicapee",
        "maj_service_personne_handicapee",
        "maj_autre_etablissement_personne_agee",
        "maj_chrs",
        "maj_service_hospitalier_soins_longue_duree",
        "maj_service_psychiatrique",
        "maj_autre_service",
        "sauvegarde_justice_etablissement_personne_handicapee",
        "sauvegarde_justice_service_personne_handicapee",
        "sauvegarde_justice_autre_etablissement_personne_agee",
        "sauvegarde_justice_chrs",
        "sauvegarde_justice_service_hospitalier_soins_longue_duree",
        "sauvegarde_justice_service_psychiatrique",
        "sauvegarde_justice_autre_service",
        "autre_mesures_etablissement_personne_handicapee",
        "autre_mesures_service_personne_handicapee",
        "autre_mesures_autre_etablissement_personne_agee",
        "autre_mesures_chrs",
        "autre_mesures_service_hospitalier_soins_longue_duree",
        "autre_mesures_service_psychiatrique",
        "autre_mesures_autre_service",
      ]) {
        defaultValues[k] = nbMesures[k].aggregate.count;
      }

      const value = {
        ...defaultValues,
        enqueteId,
        serviceId,
      };

      const { data, errors } = await graphqlFetch(
        value,
        INIT_ENQUETE_REPONSE,
        backendAuthHeaders
      );

      if (errors && errors.length) {
        errors.map((error) => logger.error(error));
      }

      return data;
    } catch (err) {
      logger.error(err);
      return null;
    }
  },
  getEnqueteReponseService: async ({ enqueteId, serviceId }) => {
    try {
      const { data, errors } = await graphqlFetch(
        {
          enqueteId,
          serviceId,
        },
        ENQUETE_REPONSE_SERVICE,
        backendAuthHeaders
      );

      if (errors && errors.length) {
        errors.map((error) => logger.error(error));
      }

      const { enquete_reponses } = data;
      const [enqueteReponse] = enquete_reponses;
      return enqueteReponse;
    } catch (err) {
      logger.error(err);
      return null;
    }
  },
  submitEnqueteReponse: async (id) => {
    try {
      const { data, errors } = await graphqlFetch(
        {
          id,
          submittedAt: new Date(),
        },
        SUBMIT_ENQUETE_REPONSE,
        backendAuthHeaders
      );

      if (errors && errors.length) {
        errors.map((error) => logger.error(error));
      }
      return data.update_enquete_reponses_by_pk;
    } catch (err) {
      logger.error(err);
      return null;
    }
  },
};
