module.exports = {
  INIT_ENQUETE_REPONSE: `
  mutation create_enquete_individuel_reponse(
    $enqueteId: Int!,
    $mandataireId: Int!,
    $departementCode: String,
    $nom: String,
    $departement: String,
    $region: String,
    $benevole: Boolean,
    $genre: String,
    $anciennete: String,
    $estimation_etp: String,
    $secretaire_specialise_etp: Float,
    $local_professionnel: Boolean,
    $exerce_seul_activite: Boolean,
    $exerce_secretaires_specialises: Boolean,
    $tranche_age: String,
    $annee_agrement: Int,
    $nb_departements: String,
    $debut_activite_avant_2009: Boolean,
    $nb_mesures_dep_finance: Int,
    $nb_mesures_dep_autres: Int,
    $cnc_annee_obtention: Int,
    $cnc_heures_formation: Float,
    $niveau_qualification: Int,
    $secretaire_specialise_etp_n1: Float,
    $secretaire_specialise_etp_n2: Float,
    $secretaire_specialise_etp_n3: Float,
    $secretaire_specialise_etp_n4: Float,
    $secretaire_specialise_etp_n5: Float,
    $secretaire_specialise_etp_n6: Float,
    
    $curatelle_renforcee_etablissement_debut_annee: Int,
    $curatelle_renforcee_etablissement_fin_annee: Int,
    $curatelle_renforcee_domicile_debut_annee: Int,
    $curatelle_renforcee_domicile_fin_annee: Int,
    $curatelle_simple_etablissement_debut_annee: Int,
    $curatelle_simple_etablissement_fin_annee: Int,
    $curatelle_simple_domicile_debut_annee: Int,
    $curatelle_simple_domicile_fin_annee: Int,
    $tutelle_etablissement_debut_annee: Int,
    $tutelle_etablissement_fin_annee: Int,
    $tutelle_domicile_debut_annee: Int,
    $tutelle_domicile_fin_annee: Int,
    $accompagnement_judiciaire_etablissement_debut_annee: Int,
    $accompagnement_judiciaire_etablissement_fin_annee: Int,
    $accompagnement_judiciaire_domicile_debut_annee: Int,
    $accompagnement_judiciaire_domicile_fin_annee: Int,
    $curatelle_biens_etablissement_debut_annee: Int,
    $curatelle_biens_etablissement_fin_annee: Int,
    $curatelle_biens_domicile_debut_annee: Int,
    $curatelle_personne_etablissement_debut_annee: Int,
    $curatelle_personne_etablissement_fin_annee: Int,
    $curatelle_personne_domicile_debut_annee: Int,
    $curatelle_personne_domicile_fin_annee: Int,
    $subroge_tuteur_createur_debut_annee: Int,
    $subroge_tuteur_createur_fin_annee: Int,
    $sauvegarde_justice_debut_annee: Int,
    $sauvegarde_justice_fin_annee: Int,
    $mandat_adhoc_majeur_debut_annee: Int,
    $mandat_adhoc_majeur_fin_annee: Int,

  ) {
    insert_enquete_reponses
      (objects: [
        {
          enquete_id: $enqueteId,
          departement_code: $departementCode,
          user_type: "individuel",
          mandataire_id: $mandataireId,
          enquete_reponses_activites: {data: [{
            curatelle_renforcee_etablissement_debut_annee: $curatelle_renforcee_etablissement_debut_annee,
            curatelle_renforcee_etablissement_fin_annee: $curatelle_renforcee_etablissement_fin_annee,
            curatelle_renforcee_domicile_debut_annee: $curatelle_renforcee_domicile_debut_annee,
            curatelle_renforcee_domicile_fin_annee: $curatelle_renforcee_domicile_fin_annee,
            curatelle_simple_etablissement_debut_annee: $curatelle_simple_etablissement_debut_annee,
            curatelle_simple_etablissement_fin_annee: $curatelle_simple_etablissement_fin_annee,
            curatelle_simple_domicile_debut_annee: $curatelle_simple_domicile_debut_annee,
            curatelle_simple_domicile_fin_annee: $curatelle_simple_domicile_fin_annee,
            tutelle_etablissement_debut_annee: $tutelle_etablissement_debut_annee,
            tutelle_etablissement_fin_annee: $tutelle_etablissement_fin_annee,
            tutelle_domicile_debut_annee: $tutelle_domicile_debut_annee,
            tutelle_domicile_fin_annee: $tutelle_domicile_fin_annee,
            accompagnement_judiciaire_etablissement_debut_annee: $accompagnement_judiciaire_etablissement_debut_annee,
            accompagnement_judiciaire_etablissement_fin_annee: $accompagnement_judiciaire_etablissement_fin_annee,
            accompagnement_judiciaire_domicile_debut_annee: $accompagnement_judiciaire_domicile_debut_annee,
            accompagnement_judiciaire_domicile_fin_annee: $accompagnement_judiciaire_domicile_fin_annee,
            curatelle_biens_etablissement_debut_annee: $curatelle_biens_etablissement_debut_annee,
            curatelle_biens_etablissement_fin_annee: $curatelle_biens_etablissement_fin_annee,
            curatelle_biens_domicile_debut_annee: $curatelle_biens_domicile_debut_annee,
            curatelle_personne_etablissement_debut_annee: $curatelle_personne_etablissement_debut_annee,
            curatelle_personne_etablissement_fin_annee: $curatelle_personne_etablissement_fin_annee,
            curatelle_personne_domicile_debut_annee: $curatelle_personne_domicile_debut_annee,
            curatelle_personne_domicile_fin_annee: $curatelle_personne_domicile_fin_annee,
            subroge_tuteur_createur_debut_annee: $subroge_tuteur_createur_debut_annee,
            subroge_tuteur_createur_fin_annee: $subroge_tuteur_createur_fin_annee,
            sauvegarde_justice_debut_annee: $sauvegarde_justice_debut_annee,
            sauvegarde_justice_fin_annee: $sauvegarde_justice_fin_annee,
            mandat_adhoc_majeur_debut_annee: $mandat_adhoc_majeur_debut_annee,
            mandat_adhoc_majeur_fin_annee: $mandat_adhoc_majeur_fin_annee,
          }]},
          enquete_reponses_agrements_formations: {data: [{
            annee_agrement: $annee_agrement,
            nb_departements: $nb_departements,
            debut_activite_avant_2009: $debut_activite_avant_2009,
            nb_mesures_dep_finance: $nb_mesures_dep_finance,
            nb_mesures_dep_autres: $nb_mesures_dep_autres,
            cnc_annee_obtention: $cnc_annee_obtention,
            cnc_heures_formation: $cnc_heures_formation,
            niveau_qualification: $niveau_qualification,
            secretaire_specialise_etp_n1: $secretaire_specialise_etp_n1,
            secretaire_specialise_etp_n2: $secretaire_specialise_etp_n2,
            secretaire_specialise_etp_n3: $secretaire_specialise_etp_n3,
            secretaire_specialise_etp_n4: $secretaire_specialise_etp_n4,
            secretaire_specialise_etp_n5: $secretaire_specialise_etp_n5,
            secretaire_specialise_etp_n6: $secretaire_specialise_etp_n6,
          }]},
          enquete_reponses_informations_mandataires: {data: [{
            nom: $nom,
            departement: $departement,
            region: $region,
            benevole: $benevole,
            sexe: $genre,
            anciennete: $anciennete,
            estimation_etp: $estimation_etp,
            secretaire_specialise_etp: $secretaire_specialise_etp,
            local_professionnel: $local_professionnel,
            exerce_seul_activite: $exerce_seul_activite,
            exerce_secretaires_specialises: $exerce_secretaires_specialises,
            tranche_age: $tranche_age,
          }]},
          enquete_reponses_populations: {data: [{}]},
          enquete_reponses_prestations_sociales: {data: [{}]}
        }
      ]) {
      returning {
        id
        departement_code
        mandataire_id
        service_id
        status
        submitted_at
        created_at
        enquete_id
        user_type
      }
    }
  }
`,

  SUBMIT_ENQUETE_REPONSE: `
  mutation submit_enquete_reponse($id: Int!, $submittedAt: timestamptz!) {
    update_enquete_reponses_by_pk(pk_columns: {id: $id}, _set: {submitted_at: $submittedAt, status: "submitted"}) {
      id
      departement_code
      mandataire_id
      service_id
      status
      submitted_at
      created_at
      enquete_id
    }
  }
  `,
};
