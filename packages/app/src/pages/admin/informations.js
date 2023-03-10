import { Box, Flex } from "rebass";
import { Helmet } from "react-helmet";

import { AdminInformations } from "~/containers/AdminInformations";
import { LayoutAdmin } from "~/containers/Layout";
import { Heading, SkipToContent } from "~/components";
import { BoxWrapper } from "~/components/Grid";

function Informations() {
  return (
    <>
      <Helmet>
        <title>Vos informations | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="vos_informations" />
      <LayoutAdmin>
        <BoxWrapper mt={3} px="0">
          <Flex
            sx={{
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                flexBasis: 0,
                flexGrow: 99999,
                minWidth: 320,
                p: 1,
              }}
            >
              <Heading size={2}>Informations générales</Heading>
              <AdminInformations mt="3" />
            </Box>
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </>
  );
}

export default Informations;
