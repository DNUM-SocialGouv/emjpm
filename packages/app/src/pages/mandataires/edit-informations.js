import { Helmet } from "react-helmet";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireEditInformations } from "~/containers/MandataireEditInformations";
import useUser from "~/hooks/useUser";
import { PATH } from "~/constants/basePath";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function EditInformations() {
  const { id, type } = useUser();

  const redirectLink = `${PATH[type]}/informations`;

  return (
    <>
      <Helmet>
        <title>Edition des informations de l'utilisateur | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="Informations_personnelles_heading" />
      <LayoutMandataire>
        <BoxWrapper px="1" mt={3}>
          <MandataireEditInformations
            userId={id}
            userType={type}
            cancelLink={redirectLink}
            successLink={redirectLink}
            mt="3"
          />
        </BoxWrapper>
      </LayoutMandataire>
    </>
  );
}

export default EditInformations;
