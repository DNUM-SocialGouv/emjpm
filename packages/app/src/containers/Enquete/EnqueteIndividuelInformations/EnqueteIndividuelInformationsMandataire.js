import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";

import { UserContext } from "~/containers/UserContext";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteIndividuelInformationsMandataireForm } from "./EnqueteIndividuelInformationsMandataireForm";
import { UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE } from "./queries";

export function EnqueteIndividuelInformationsMandataire(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;
  const {
    enquete_reponse_ids: { informations_mandataire_id },
  } = enqueteReponse;
  const { id: userId } = useContext(UserContext);
  const { data, loading } = useQuery(
    ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE,
    {
      variables: {
        id: informations_mandataire_id,
      },
    }
  );

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE,
        variables: { id: informations_mandataire_id },
      },
    ],
  });

  const informations = data
    ? data.enquete_reponses_informations_mandataire_by_pk || {}
    : {};
  return loading ? null : (
    <EnqueteIndividuelInformationsMandataireForm
      data={informations}
      section={section}
      sections={props.sections}
      currentStep={props.currentStep}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: informations_mandataire_id,
            ...values,
          },
        });
      }}
    />
  );
}

export default EnqueteIndividuelInformationsMandataire;