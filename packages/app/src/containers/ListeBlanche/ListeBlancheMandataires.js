import { useQuery } from "@apollo/client";
import { useContext, useEffect, useMemo, useState } from "react";

import useQueryReady from "~/hooks/useQueryReady";
import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { PaginatedList } from "~/containers/PaginatedList";

import { ListeBlancheIndividuelItem } from "./ListeBlancheIndividuel";
import { ListeBlanchePreposeItem } from "./ListeBlanchePrepose";
import { LB_USERS } from "./queries";

function getRequestFilters(filters) {
  const requestFilters = {
    type: { _in: ["individuel", "prepose"] },
  };

  if (filters.departement) {
    const departementCode = filters.departement;
    requestFilters._or = [
      {
        lb_user_etablissements: {
          etablissement: {
            departement: { id: { _eq: departementCode } },
          },
        },
      },
      {
        lb_departements: {
          departement_code: {
            _eq: departementCode,
          },
        },
      },
    ];
  }

  if (filters.departementFinanceur) {
    requestFilters.lb_departements = {
      ...requestFilters.lb_departements,
      departement_financeur: { _eq: filters.departementFinanceur === true },
    };
  }

  if (filters.siret) {
    requestFilters.siret = { _ilike: `%${filters.siret}%` };
  }

  return requestFilters;
}

export function ListeBlancheMandataires(props) {
  const { getHref, onRowClick } = props;
  const { filters, debounceFilters } = useContext(FiltersContextSerializable);

  const resultPerPage = 10;
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    setCurrentOffset(0);
  }, [filters]);

  const { search } = debounceFilters;

  const { data, error, loading } = useQuery(LB_USERS, {
    fetchPolicy: "cache-and-network",
    variables: {
      search: search && search !== "" ? `%${search}%` : null,
      filters: getRequestFilters(debounceFilters),
      limit: resultPerPage,
      offset: currentOffset,
    },
  });

  const { count, users } = useMemo(() => {
    if (data) {
      const { count } = data.lb_users_aggregate.aggregate;
      const users = data.lb_users;
      return {
        count,
        users,
      };
    }
    return {
      count: 0,
      users: [],
    };
  }, [data]);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <PaginatedList
      entries={users}
      RowItem={ListeBlancheItem}
      getHref={getHref}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
      onRowClick={onRowClick}
    />
  );
}

function ListeBlancheItem(props) {
  if (props.item) {
    const { type } = props.item;
    if (type === "individuel") {
      return <ListeBlancheIndividuelItem {...props} />;
    } else if (type === "prepose") {
      return <ListeBlanchePreposeItem {...props} />;
    }
  }
  return null;
}

export default ListeBlancheMandataires;
