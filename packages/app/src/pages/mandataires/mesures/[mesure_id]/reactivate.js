import { Flex } from "rebass";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireMesureSidebar } from "~/containers/MandataireMesureSidebar";
import { MesureProvider } from "~/containers/MesureContext";
import { MesureReactivate } from "~/containers/MesureReactivate";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function ReactivateMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutMandataire>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <MandataireMesureSidebar mesureId={mesureId} />
            <MesureReactivate />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </MesureProvider>
  );
}

export default ReactivateMesurePage;
