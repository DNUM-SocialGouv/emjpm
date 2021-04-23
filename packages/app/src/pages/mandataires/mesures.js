import { Flex } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutMandataire } from "~/containers/Layout";
import { MesureList } from "~/containers/MesureList";
import { MesureListButtonBar } from "~/containers/MesureListButtonBar";
import { MesureListFilters } from "~/containers/MesureListFilters";
import { FiltersContextProvider } from "~/containers/MesureListFilters/context";
import {
  DEFAULT_MESURE_NATURE,
  MESURE_STATUS_LABEL_VALUE,
} from "~/constants/mesures";
import { BoxWrapper } from "~/components/Grid";

function MesuresListView() {
  return (
    <FiltersContextProvider
      initialValues={{
        mesureStatus: MESURE_STATUS_LABEL_VALUE[0],
        natureMesure: DEFAULT_MESURE_NATURE,
      }}
    >
      <LayoutMandataire>
        <BoxWrapper mt={3} px="1">
          <Flex flexDirection="row" justifyContent="space-between">
            <HeadingTitle>Toutes vos mesures</HeadingTitle>
            <MesureListButtonBar />
          </Flex>
          <MesureListFilters />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <MesureList />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </FiltersContextProvider>
  );
}

function MandataireMesuresList() {
  return <MesuresListView />;
}

export default MandataireMesuresList;
