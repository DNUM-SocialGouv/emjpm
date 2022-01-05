import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { EnqueteImportPanel } from "~/containers/EnqueteImport";
import { LayoutMandataire } from "~/containers/Layout";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function ImportEnquetePage() {
  const user = useUser();
  const history = useHistory();

  const { enquete_id } = useParams();
  const enqueteId = parseInt(enquete_id);

  return (
    <>
      <Helmet>
        <title>Import de l' enquête {enquete_id} | e-MPJM</title>
      </Helmet>
      <LayoutMandataire>
        <BoxWrapper>
          <EnqueteImportPanel
            goToStep={(enqueteId, { step, substep }) => {
              history.push({
                pathname: `/mandataires/enquetes/${enqueteId}`,
                search: `?step=${step}&substep=${substep}`,
              });
            }}
            enqueteId={enqueteId}
            userId={user.id}
          />
        </BoxWrapper>
      </LayoutMandataire>
    </>
  );
}

export default ImportEnquetePage;
