import { Flex } from "rebass";
import { Helmet } from "react-helmet";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutGreffier } from "~/containers/Layout";
import { GreffierMandatairesList } from "~/containers/GreffierMandatairesList";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function Mandataires() {
  return (
    <>
      <Helmet>
        <title>Tous les mandataires | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="greffier_mandataires_filter" />
      <LayoutGreffier>
        <BoxWrapper mt={3} px="1">
          <HeadingTitle>Tous les mandataires</HeadingTitle>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <GreffierMandatairesList />
          </Flex>
        </BoxWrapper>
      </LayoutGreffier>
    </>
  );
}

export default Mandataires;
