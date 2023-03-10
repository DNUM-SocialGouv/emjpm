import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePopulationsForm } from "./EnquetePopulationsForm";
import { UPDATE_ENQUETE_POPULATIONS_SAUVEGARDE_JUSTICE } from "./mutations";
import { ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE } from "./queries";
import { removeAttributesPrefix } from "./removeAttributesPrefix.service";
import useQueryReady from "~/hooks/useQueryReady";

export function EnquetePopulationsSauvegardeJustice(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    enquete: { id: enqueteId },
    section,
    step,
  } = props;

  const { id: userId } = useUser();
  const { data, loading } = useQuery(
    ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE,
    {
      variables: {
        id: enqueteReponse.id,
      },
    }
  );

  const [updateEnquete, { loading: loading2, error: error2 }] = useMutation(
    UPDATE_ENQUETE_POPULATIONS_SAUVEGARDE_JUSTICE,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId: enqueteReponse.id },
        },
        {
          query: ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE,
          variables: { id: enqueteReponse.id },
        },
      ],
    }
  );
  useQueryReady(loading2, error2);

  const populations = useMemo(
    () => (data ? data.enquete_reponses_populations[0] || {} : {}),
    [data]
  );
  const reponsePopulations = useMemo(
    () => removeAttributesPrefix(populations, "sauvegarde_justice_"),
    [populations]
  );

  return (
    <EnquetePopulationsForm
      loading={loading}
      data={reponsePopulations}
      section={section}
      sections={props.sections}
      currentStep={props.currentStep}
      step={step}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: enqueteReponse.id,
            ...values,
          },
        });
      }}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      title={"Sauvegarde de justice"}
      enquete={props.enquete}
    />
  );
}

export default EnquetePopulationsSauvegardeJustice;
