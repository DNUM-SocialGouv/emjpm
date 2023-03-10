import { Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireMesureSidebar } from "~/containers/MandataireMesureSidebar";
import { MesureProvider } from "~/containers/MesureContext";
import { MesureDelete } from "~/containers/MesureDelete";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";
import { SkipToContent } from "~/components";

function DeleteMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <Helmet>
        <title>Supprimer la mesure | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="delete_mesure" />
      <MesureProvider mesureId={mesureId}>
        <LayoutMandataire>
          <BoxWrapper mt={1} id="delete_mesure">
            <Flex flexDirection="column">
              <MandataireMesureSidebar mesureId={mesureId} />
              <MesureDelete />
            </Flex>
          </BoxWrapper>
        </LayoutMandataire>
      </MesureProvider>
    </>
  );
}

export default DeleteMesurePage;
