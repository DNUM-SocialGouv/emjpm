import { Box } from "rebass";

import { Header } from "~/components";
import { Navigation } from "~/containers/Navigation";
import { BoxWrapper } from "~/components/Grid";

const navigationLinks = [
  {
    title: "Vos mandataires",
    to: "/greffiers",
  },
  {
    title: "La carte des mandataires",
    to: "/greffiers/map",
  },
  {
    title: "Vos mesures",
    to: "/greffiers/mesures",
  },
];

function LayoutGreffierMap(props) {
  const { children } = props;
  return (
    <>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header
          {...props}
          dropDownLinks={[
            { title: "Vos informations", to: "/greffiers/informations" },
          ]}
        />
        <BoxWrapper>
          <Navigation links={navigationLinks} />
        </BoxWrapper>
      </Box>
      {children}
    </>
  );
}

export { LayoutGreffierMap };
