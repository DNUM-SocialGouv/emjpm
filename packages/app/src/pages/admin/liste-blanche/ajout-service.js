import { useHistory } from "react-router-dom";
import { Link as StyledLink } from "rebass";
import { Helmet } from "react-helmet";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheServiceCreate } from "~/containers/ListeBlanche";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

export default function ListBlancheAjoutService() {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>Ajout d'un service à la liste blanche | e-MJPM</title>
      </Helmet>

      <SkipToContent skipTo="list_blanche_service_create" />
      <LayoutAdmin>
        <BoxWrapper mt={3} px={1}>
          <Link
            to="/admin/liste-blanche"
            component={(props) => (
              <StyledLink
                onClick={() => props.navigate(props.href)}
                mb={4}
                display="block"
              >
                &larr; Retour
              </StyledLink>
            )}
          />
          <HeadingTitle mb={4}>
            {"Ajout d'un service mandataire à la liste blanche"}
          </HeadingTitle>
          <ListeBlancheServiceCreate
            onSuccess={async () => {
              await history.push("/admin/liste-blanche");
            }}
            handleCancel={async () => {
              await history.push("/admin/liste-blanche");
            }}
          />
        </BoxWrapper>
      </LayoutAdmin>
    </>
  );
}
