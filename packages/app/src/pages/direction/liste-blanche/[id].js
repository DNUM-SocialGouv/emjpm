import { useHistory, useParams } from "react-router-dom";
import { Link as StyledLink } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutDirection } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheEdit } from "~/containers/ListeBlanche";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function ListeBlancheDetailPage() {
  const { id: paramId } = useParams();
  const id = parseInt(paramId);

  const history = useHistory();

  return (
    <>
      <Helmet>
        <title>Liste blanche {paramId} | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="list_blanche_edit" />
      <LayoutDirection>
        <BoxWrapper mt={3} px={1}>
          <Link
            to="/direction"
            component={(props) => (
              <StyledLink
                onClick={() => props.navigate(props.href)}
                mb={4}
                display="block"
                href="/direction"
                title="Retour"
                aria-label="Retour à la page précedente"
              >
                &larr; Retour
              </StyledLink>
            )}
          />
          <ListeBlancheEdit
            id={id}
            handleSubmit={async () => {
              await history.push("/direction");
              window.scrollTo(0, 0);
            }}
            handleCancel={async () => {
              await history.push("/direction");
              window.scrollTo(0, 0);
            }}
          />
        </BoxWrapper>
      </LayoutDirection>
    </>
  );
}

export default ListeBlancheDetailPage;
