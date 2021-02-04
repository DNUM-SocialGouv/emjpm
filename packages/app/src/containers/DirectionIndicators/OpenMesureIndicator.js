import { useQuery } from "@apollo/client";
import { useContext } from "react";

import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { Indicator } from "~/components";

import { GET_OPEN_MESURE_NUMBER } from "./queries";

function OpenMesureIndicator() {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_OPEN_MESURE_NUMBER, {
    variables: {
      departementCode: filters.departement
        ? parseInt(filters.departement)
        : undefined,
      end: filters.endDate,
      regionId: filters.region ? parseInt(filters.region) : undefined,
      start: filters.startDate,
    },
  });

  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }

  const {
    stat_opened_mesures: { opened_mesures_nb },
  } = data;

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Mesures en cours"
      indicator={opened_mesures_nb ? Number(opened_mesures_nb) : 0}
    />
  );
}

export { OpenMesureIndicator };
