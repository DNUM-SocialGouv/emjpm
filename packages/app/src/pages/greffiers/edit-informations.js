import { LayoutGreffier } from "~/containers/Layout";
import { GreffierEditInformations } from "~/containers/GreffierEditInformations";
import useUser from "~/hooks/useUser";
import { PATH } from "~/constants/basePath";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";
import { SkipToContent } from "~/components";

function EditInformations() {
  const { id: userId, type } = useUser();
  const redirectLink = `${PATH[type]}/informations`;
  return (
    <>
      <Helmet>
        <title>Edition des informations de l'utilisateur | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="informations_personnelles_heading" />
      <LayoutGreffier>
        <BoxWrapper mt={3} px="1">
          <GreffierEditInformations
            userId={userId}
            cancelLink={redirectLink}
            successLink={redirectLink}
            mt="3"
          />
        </BoxWrapper>
      </LayoutGreffier>
    </>
  );
}

export default EditInformations;
