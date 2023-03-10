import { MESURE_PROTECTION } from "@emjpm/biz";
import { useContext } from "react";
import { Box, Flex } from "rebass";

import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { Card, Input, AccessibleSelect } from "~/components";
import { findOption } from "~/utils/form";

import { FiltersContext } from "./context";

const etatMesuresOptions = [
  {
    label: "Toutes",
    value: null,
  },
  {
    label: "En attente",
    value: "en_attente",
  },
  {
    label: "En cours",
    value: "en_cours",
  },
  {
    label: "Clôturée",
    value: "eteinte",
  },
];

function MagistratFilters() {
  const {
    natureMesure,
    changeNatureMesure,
    etatMesure,
    changeEtatMesure,
    searchText,
    changeSearchText,
    cabinet,
    changeCabinet,
  } = useContext(FiltersContext);

  return (
    <Card mt="3">
      <Flex
        justifyContent={"space-between"}
        flexWrap="wrap"
        id="magistrats_filter"
        tabIndex="-1"
      >
        <Box>
          <Flex>
            <Box width="200px" mr={1}>
              <AccessibleSelect
                size="small"
                options={[DEFAULT_MESURE_NATURE].concat(
                  MESURE_PROTECTION.NATURE_MESURE.options
                )}
                placeholder={"Nature de la mesure"}
                value={natureMesure}
                onChange={(option) => changeNatureMesure(option)}
                id="nature_de_la_mesure"
              />
            </Box>
            <Box width="200px" mr={1}>
              <AccessibleSelect
                size="small"
                options={etatMesuresOptions}
                placeholder={"État de la mesure"}
                value={findOption(etatMesuresOptions, etatMesure)}
                onChange={(option) => changeEtatMesure(option.value)}
                id="etat_de_la_mesure"
              />
            </Box>
            <Box width="320px" mr={1}>
              <Input
                id="search"
                value={searchText}
                spellCheck="false"
                autoComplete="false"
                onChange={(event) => changeSearchText(event.target.value)}
                name="search"
                size="small"
                placeholder="Numéro RG, Dossier, Ville, Code Postal..."
                label="Rechercher"
                forceActive
                ariaLabel="Rechercher par Numéro RG, Dossier, Ville, Code Postal"
                ariaDescribedBy="none"
              />
            </Box>
            <Box width="160px" mr={1}>
              <Input
                id="search2"
                value={cabinet}
                spellCheck="false"
                onChange={(event) => changeCabinet(event.target.value)}
                name="search2"
                size="small"
                placeholder="Cabinet"
                label="Préciser un cabinet"
                forceActive
                autoComplete="organization"
                ariaDescribedBy="none"
                ariaLabel="Rechercher cabinet"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
export { MagistratFilters };
