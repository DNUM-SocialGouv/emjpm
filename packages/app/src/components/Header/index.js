import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "rebass";
import { LogoEtat, LogoPublicEtat, LoggedMenu } from "~/components";
import { useCallback } from "react";
import { BoxWrapper } from "~/components/Grid";

function Header(props) {
  const { dropDownLinks, isPublicLayout } = props;

  const history = useHistory();

  const goToHome = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <BoxWrapper>
      <Flex
        alignItems="center"
        flexWrap="wrap"
        justifyContent="space-between"
        height="115px"
      >
        <Box>
          <Flex flexWrap="wrap" justifyContent="left">
            <Box>{!isPublicLayout ? <LogoEtat /> : <LogoPublicEtat />}</Box>
            <Box alignItems="center" display="flex" ml={2}>
              <button
                onClick={goToHome}
                title="Aller à l'accueil"
                aria-label="Aller à l'acceuil"
              >
                <Text
                  color="primary"
                  fontWeight="100"
                  fontSize="5"
                  style={{ display: "inline" }}
                >
                  e
                </Text>
                <Text
                  color="#404040"
                  fontWeight="100"
                  fontSize="5"
                  style={{ display: "inline" }}
                >
                  MJPM
                </Text>
              </button>
            </Box>
          </Flex>
        </Box>

        {!isPublicLayout && <LoggedMenu dropDownLinks={dropDownLinks} />}
      </Flex>
    </BoxWrapper>
  );
}

export default Header;
