import { Box } from "rebass";

import { Footer } from "../Footer";
import { Header } from "~/components";

function LayoutPublic(props) {
  const { children } = props;

  return (
    <>
      <Box
        sx={{ height: "120px", position: "relative", "z-index": "1000" }}
        bg="cardPrimary"
      >
        <Header isPublicLayout />
      </Box>{" "}
      <Box> {children} </Box> <Footer isPublicLayout />
    </>
  );
}

export { LayoutPublic };
