import { useState } from "react";
import { Card, Flex } from "rebass";
import { NavLink } from "theme-ui";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireMesureImport } from "~/containers/MandataireMesureImport";
import { MandataireOcmiMesureImport } from "~/containers/MandataireOcmiMesureImport";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";
import { SkipToContent } from "~/components";

function ImportMesures() {
  const user = useUser();
  const { mandataire = {} } = user;
  const { ocmi_mandataire } = mandataire;

  const [importType, setImportType] = useState(
    ocmi_mandataire ? "ocmi" : "file"
  );

  function ImportTypeTab({ type, children }) {
    return (
      <NavLink
        sx={{
          bg: importType === type ? "white" : "",
          borderRadius: "10px 10px 0 0",
          px: "3",
          py: "2",
        }}
        onClick={() => setImportType(type)}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <>
      <Helmet>
        <title>Importez vos mesures | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="import_box_wrapper" />
      <LayoutMandataire>
        <BoxWrapper mt={3} px="1" id="import_box_wrapper">
          <Flex>
            {ocmi_mandataire && (
              <ImportTypeTab type="ocmi">
                A partir de votre compte OCMI
              </ImportTypeTab>
            )}
            <ImportTypeTab type="file">{`À partir d'un fichier`}</ImportTypeTab>
          </Flex>
          <Card mb="5" pt="5">
            {importType === "ocmi" && (
              <MandataireOcmiMesureImport mandataireUserId={user.id} />
            )}
            {importType === "file" && (
              <MandataireMesureImport
                mandataireId={mandataire.id}
                mandataireUserId={user.id}
              />
            )}
          </Card>
        </BoxWrapper>
      </LayoutMandataire>
    </>
  );
}

export default ImportMesures;
