import { Heading1, Heading3, Heading5 } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";
import { enquetePreposePersonnelFormationMjpmFormMapper } from "./EnquetePreposePersonnelFormationMjpmFormMapper";
import { enquetePreposePersonnelFormationMjpmFormSchema as validationSchema } from "./EnquetePreposePersonnelFormationMjpmFormSchema";

export const EnquetePreposePersonnelFormationMjpmForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const enqueteForm = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm: enquetePreposePersonnelFormationMjpmFormMapper.dataToForm,
    loading,
  });

  const { submitForm, values, errors, submit } = enqueteForm;

  return (
    <Box>
      <form onSubmit={submitForm}>
        <Heading1 textAlign="center" mb={"80px"}>
          {"Personnel et formation"}
        </Heading1>
        <Heading3>{"Informations relatives aux préposés MJPM"}</Heading3>

        <Box mt={1}>
          <Heading5 mt={1} mb="2">
            Nombre de préposés MJPM au 31/12/2019
          </Heading5>
          <Flex alignItems="start">
            <Box mr={1} flex={1 / 2}>
              <EnqueteFormInputField
                id="nb_preposes_mjpm"
                label="Nombre de préposés"
                enqueteContext={enqueteContext}
                enqueteForm={enqueteForm}
              />
            </Box>
            <Box ml={1} flex={1 / 2}>
              <EnqueteFormInputField
                id="nb_preposes_mjpm_etp"
                label="Nombre de préposés en ETP"
                enqueteContext={enqueteContext}
                enqueteForm={enqueteForm}
              />
            </Box>
          </Flex>
        </Box>
        <Box mt={1}>
          <Heading3>{"Formation des préposés MJPM au CNC"}</Heading3>
          <Box>
            {renderFormationPreposeBox({
              prefix: "en_poste_cnc",
              label: "Préposés CNC en poste au 01/01/2020",
            })}
          </Box>
          <Box>
            {renderFormationPreposeBox({
              prefix: "embauches_cnc",
              label: "Préposés CNC embauchés depuis le 01/01/2020",
            })}
          </Box>
          <Box>
            {renderFormationPreposeBox({
              prefix: "formation_non_cnc",
              label: "Préposés en cours de formation",
            })}
          </Box>
        </Box>

        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </form>
    </Box>
  );

  // prefix: 'en_poste_cnc' || 'embauches_cnc' || 'formation_non_cnc'
  function renderFormationPreposeBox({ prefix, label }) {
    return (
      <Fragment>
        <Heading5 mt={1} mb="2">
          {label}
        </Heading5>
        <Flex alignItems="start">
          <Box mr={1} flex={1 / 2}>
            <EnqueteFormInputField
              id={`formation_preposes_mjpm.${prefix}.nb_preposes`}
              value={values.formation_preposes_mjpm[prefix].nb_preposes}
              error={
                errors.formation_preposes_mjpm && errors.formation_preposes_mjpm[prefix]
                  ? errors.formation_preposes_mjpm[prefix].nb_preposes
                  : ""
              }
              label="Nombre de préposés"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
          <Box ml={1} flex={1 / 2}>
            <EnqueteFormInputField
              id={`formation_preposes_mjpm.${prefix}.heures_formation`}
              value={values.formation_preposes_mjpm[prefix].heures_formation}
              error={
                errors.formation_preposes_mjpm && errors.formation_preposes_mjpm[prefix]
                  ? errors.formation_preposes_mjpm[prefix].heures_formation
                  : ""
              }
              label="Total heures de formation effectuées/prévues"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
        </Flex>
      </Fragment>
    );
  }
};

export default EnquetePreposePersonnelFormationMjpmForm;