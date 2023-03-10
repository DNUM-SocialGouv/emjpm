import { Box, Card } from "rebass";

import { LayoutServices } from "~/containers/Layout";
import { ServiceAntennes } from "~/containers/ServiceAntennes";
import { ServiceInformations } from "~/containers/ServiceInformations";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";
import { SkipToContent } from "~/components";

function Informations() {
  return (
    <>
      <Helmet>
        <title>Informations sur votre service | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="service_informations" />
      <LayoutServices>
        <BoxWrapper
          px="1"
          id="service_informations"
          tabIndex="-1"
          sx={{ margin: "0px auto", marginTop: "20px" }}
        >
          <Card p="5" m={2}>
            <ServiceInformations mt="3" />
          </Card>
          <Box m={2}>
            <ServiceAntennes />
          </Box>
        </BoxWrapper>
      </LayoutServices>
    </>
  );
}

export default Informations;
