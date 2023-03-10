import { withRouter } from "react-router-dom";
import { Box, Flex } from "rebass";

import { LinkButton } from "~/containers/Commons";

import { MandatairesSubNavigationStyle } from "./style";

function MandatairesSubNavigation(props) {
  return (
    <Flex sx={MandatairesSubNavigationStyle} {...props}>
      <Flex>
        <LinkButton
          to="/direction/stats"
          aria-label="Vue globale"
          title="Vue globale"
          disabled={location.pathname === "/direction/stats"}
        >
          Vue globale
        </LinkButton>
        <Box ml="1">
          <LinkButton
            to="/direction/mandataires/list"
            aria-label="Vue détaillée"
            title="Vue détaillée"
            disabled={location.pathname === "/direction/mandataires/list"}
          >
            Vue détaillée
          </LinkButton>
        </Box>
      </Flex>
    </Flex>
  );
}

export default withRouter(MandatairesSubNavigation);
