import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratMesureAdd } from "~/containers/MagistratMesureAdd";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function Reservation() {
  const { gestionnaire_id } = useParams();
  const gestionnaireId = gestionnaire_id;

  return (
    <>
      <Helmet>
        <title>Réserver une mesure | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="magistrat_mesure_add" />
      <LayoutMagistrat>
        <BoxWrapper mt={3} px="0">
          <MagistratMesureAdd gestionnaireId={gestionnaireId} />
        </BoxWrapper>
      </LayoutMagistrat>
    </>
  );
}

export default Reservation;
