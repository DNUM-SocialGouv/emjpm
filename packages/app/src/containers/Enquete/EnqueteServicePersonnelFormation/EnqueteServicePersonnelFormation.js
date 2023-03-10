import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteServicePersonnelFormationForm } from "./EnqueteServicePersonnelFormationForm";
import { UPDATE_ENQUETE_REPONSE_SERVICE_PERSONNEL_FORMATION } from "./mutations";
import { ENQUETE_REPONSES_SERVICE_PERSONNEL_FORMATION } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

export function EnqueteServicePersonnelFormation(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();

  const { data, loading } = useQuery(
    ENQUETE_REPONSES_SERVICE_PERSONNEL_FORMATION,
    {
      variables: {
        id: enqueteReponse.id,
      },
    }
  );

  const [updateEnquete, { loading: loading2, error: error2 }] = useMutation(
    UPDATE_ENQUETE_REPONSE_SERVICE_PERSONNEL_FORMATION,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId: enqueteReponse.id },
        },
        {
          query: ENQUETE_REPONSES_SERVICE_PERSONNEL_FORMATION,
          variables: {
            id: enqueteReponse.id,
          },
        },
      ],
    }
  );
  useQueryReady(loading2, error2);

  const personnelFormation = data
    ? data.enquete_reponses_service_personnel_formation[0] || {}
    : {};

  return loading ? null : (
    <EnqueteServicePersonnelFormationForm
      data={personnelFormation}
      section={section}
      sections={props.sections}
      currentStep={props.currentStep}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      enquete={props.enquete}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: enqueteReponse.id,
            ...values,
          },
        });
      }}
    />
  );
}

export default EnqueteServicePersonnelFormation;
