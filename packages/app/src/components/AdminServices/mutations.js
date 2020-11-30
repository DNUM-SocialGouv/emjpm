import gql from "graphql-tag";

export const DELETE_MESURES = gql`
  mutation admin_delete_service_mesures($ids: [Int!]) {
    delete_mesure_etat(where: { mesure_id: { _in: $ids } }) {
      affected_rows
    }
    delete_mesure_ressources(where: { mesure_id: { _in: $ids } }) {
      affected_rows
    }
    delete_mesures(where: { id: { _in: $ids } }) {
      affected_rows
    }
  }
`;

export const CALCULATE_MESURES = gql`
  mutation calculateMesures($mandataireId: Int, $serviceId: Int) {
    calculate_mesures(mandataireId: $mandataireId, serviceId: $serviceId) {
      en_cours
      en_attente
    }
  }
`;
