import { useMemo } from "react";
import {
  EnqueteActiviteAccompagnementJudiciaire,
  EnqueteActiviteCausesSortiesDispositif,
  EnqueteActiviteCuratelleBiens,
  EnqueteActiviteCuratellePersonne,
  EnqueteActiviteCuratelleRenforcee,
  EnqueteActiviteCuratelleSimple,
  EnqueteActiviteMandatHadocMajeur,
  EnqueteActiviteRevisionMesures,
  EnqueteActiviteSauvegardeJustice,
  EnqueteActiviteSubrogeTuteurCreateur,
  EnqueteActiviteTutelle,
} from "../EnqueteActivite";
import {
  EnqueteIndividuelInformationsAgrement,
  EnqueteIndividuelInformationsFormation,
  EnqueteIndividuelInformationsMandataire,
} from "../EnqueteIndividuelInformations";
import { EnqueteIndividuelPrestationsSociales } from "../EnqueteIndividuelPrestationsSociales";
import {
  EnquetePopulationsAutreMesures,
  EnquetePopulationsCuratelle,
  EnquetePopulationsMAJ,
  EnquetePopulationsSauvegardeJustice,
  EnquetePopulationsTutelle,
} from "../EnquetePopulations";
import { EnqueteIndividuelSubmit } from "./EnqueteIndividuelSubmit";
import { EnqueteIndividuelWelcome } from "./EnqueteIndividuelWelcome";
import EnqueteDirectionStatut from "../EnqueteDirection/Statut";
import EnqueteDirectionValidation from "../EnqueteDirection/Validation";
import useUser from "~/hooks/useUser";

export const enqueteIndividuelMenuBuilder = {
  useMenuSections,
};

function useMenuSections(enqueteReponse, enquete) {
  const { type: userType } = useUser();
  return useMemo(
    () => buildMenuSections(enqueteReponse, enquete, userType),
    [enqueteReponse, enquete, userType]
  );
}

function buildMenuSections(enqueteReponse, enquete, userType) {
  const status = enqueteReponse.enquete_reponse_validation_status;

  const isDirection = userType === "direction";

  const welcomeSection = isDirection
    ? {
        status: "valid",
        steps: [
          {
            component: EnqueteDirectionStatut,
            label: "Statut",
            status: "valid",
          },
        ],
      }
    : {
        status: "valid",
        steps: [
          {
            component: EnqueteIndividuelWelcome,
            label: "Bienvenue",
            status: "valid",
          },
        ],
      };

  const endSection = isDirection
    ? {
        status: "valid",
        steps: [
          {
            component: EnqueteDirectionValidation,
            label: "Validation",
            status: "valid",
          },
        ],
      }
    : {
        status: enqueteReponse.status === "draft" ? "empty" : "valid",
        steps: [
          {
            component: EnqueteIndividuelSubmit,
            label: "Envoi de vos r??ponses",
            status: status.global === "valid" ? "valid" : "empty",
          },
        ],
      };

  const menu = [
    welcomeSection,
    {
      label: "Vos informations",
      status: status.informations.global,
      steps: [
        {
          component: EnqueteIndividuelInformationsMandataire,
          label: "Informations g??n??rales",
          status: status.informations.informationsGenerales,
        },
        {
          component: EnqueteIndividuelInformationsAgrement,
          label: "Agr??ment",
          status: status.informations.agrements,
        },
        {
          component: EnqueteIndividuelInformationsFormation,
          label: "Formation",
          status: status.informations.formation,
        },
      ],
    },
    {
      label: `Votre activit?? en ${enquete.annee - 1}`,
      status: status.activite.global,
      steps: [
        {
          component: EnqueteActiviteCuratelleRenforcee,
          label: "Curatelle renforc??e",
          status: status.activite.curatelleRenforcee,
        },
        {
          component: EnqueteActiviteCuratelleSimple,
          label: "Curatelle simple",
          status: status.activite.curatelleSimple,
        },
        {
          component: EnqueteActiviteTutelle,
          label: "Tutelle",
          status: status.activite.tutelle,
        },
        {
          component: EnqueteActiviteAccompagnementJudiciaire,
          label: "Mesure d'accompagnement judiciaire",
          status: status.activite.accompagnementJudiciaire,
        },
        {
          component: EnqueteActiviteCuratelleBiens,
          label: "Tutelle ou curatelle aux biens",
          status: status.activite.curatelleBiens,
        },
        {
          component: EnqueteActiviteCuratellePersonne,
          label: "Tutelle ou curatelle ?? la personne",
          status: status.activite.curatellePersonne,
        },
        {
          component: EnqueteActiviteSubrogeTuteurCreateur,
          label: "Subrog?? tuteur ou curateur",
          status: status.activite.subrogeTuteurCreateur,
        },
        {
          component: EnqueteActiviteSauvegardeJustice,
          label: "Sauvegarde de justice",
          status: status.activite.sauvegardeJustice,
        },
        {
          component: EnqueteActiviteMandatHadocMajeur,
          label: "Mandat ad hoc majeur",
          status: status.activite.mandatHadocMajeur,
        },
        {
          component: EnqueteActiviteRevisionMesures,
          label: "Issues des r??visions de mesures",
          status: status.activite.revisionMesures,
        },
        {
          component: EnqueteActiviteCausesSortiesDispositif,
          label: "Causes des sorties du dispositif",
          status: status.activite.causesSortiesDispositif,
        },
      ],
    },
    {
      label: "Populations",
      status: status.populations.global,
      steps: [
        {
          component: EnquetePopulationsCuratelle,
          label: "Curatelle",
          status: status.populations.curatelle,
        },
        {
          component: EnquetePopulationsTutelle,
          label: "Tutelle",
          status: status.populations.tutelle,
        },
        {
          component: EnquetePopulationsMAJ,
          label: "Mesure d'accompagnement de justice",
          status: status.populations.accompagnementJudiciaire,
        },
        {
          component: EnquetePopulationsSauvegardeJustice,
          label: "Sauvegarde de justice",
          status: status.populations.sauvegardeJustice,
        },
        {
          component: EnquetePopulationsAutreMesures,
          label: "Autre",
          status: status.populations.autresMesures,
        },
      ],
    },
    {
      label: "Prestations sociales",
      status: status.prestationsSociales.global,
      steps: [
        {
          component: EnqueteIndividuelPrestationsSociales,
          label: "Prestations sociales",
          status: status.prestationsSociales.global,
        },
      ],
    },
    endSection,
  ];

  return menu;
}
