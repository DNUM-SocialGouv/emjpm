import { Box, Flex } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import yup from "~/validation-schemas/yup";
import { Heading } from "~/components";
import { formatFormInput, parseFormFloat } from "~/utils/form";

import {
  EnqueteFormFieldErrorMessage,
  EnqueteFormInputField,
} from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

function dataToForm(data) {
  return {
    aide_sociale_conseil_departemental: formatFormInput(
      data.aide_sociale_conseil_departemental
    ),
    autre_produits: formatFormInput(data.autre_produits),
    charges_fonctionnement: formatFormInput(data.charges_fonctionnement),
    charges_personnel: formatFormInput(data.charges_personnel),
    charges_preposes: formatFormInput(data.charges_preposes),
    financement_public: formatFormInput(data.financement_public),
    produits_bareme_prelevements: formatFormInput(
      data.produits_bareme_prelevements
    ),
  };
}

function formToData(values) {
  return {
    aide_sociale_conseil_departemental: parseFormFloat(
      values.aide_sociale_conseil_departemental
    ),
    autre_produits: parseFormFloat(values.autre_produits),
    charges_fonctionnement: parseFormFloat(values.charges_fonctionnement),
    charges_personnel: parseFormFloat(values.charges_personnel),
    charges_preposes: parseFormFloat(values.charges_preposes),
    financement_public: parseFormFloat(values.financement_public),
    produits_bareme_prelevements: parseFormFloat(
      values.produits_bareme_prelevements
    ),
  };
}

// schéma identique à enquetePreposeFinancementStatus côté hasura action
const validationSchema = yup.object().shape({
  aide_sociale_conseil_departemental: yup.number().min(0).nullable(),
  autre_produits: yup.number().min(0).nullable(),
  charges_fonctionnement: yup.number().min(0).nullable(),
  charges_personnel: yup.number().min(0).nullable(),
  charges_preposes: yup
    .number()
    .min(0)
    .nullable()
    .test(
      "charges-preposes-personnel",
      "La valeur de charges préposés ne peut être supérieure à la charge personnel total.",
      function (value) {
        const chargePersonnel = this.parent["charges_personnel"] | 0;
        return chargePersonnel >= (value | 0);
      }
    ),
  financement_public: yup.number().min(0).nullable(),
  produits_bareme_prelevements: yup.number().min(0).nullable(),
});

export function EnquetePreposeFinancementForm(props) {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    sections,
    enquete,
  } = props;

  const enqueteForm = useEnqueteForm({
    currentStep: props.currentStep,
    sections,
    data,
    dataToForm,
    dispatchEnqueteContextEvent,
    enqueteContext,
    formToData,
    loading,
    onSubmit,
    step,
    validationSchema,
  });

  const { submitForm, submit } = enqueteForm;

  return (
    <form noValidate onSubmit={submitForm}>
      <HeadingTitle textAlign="center" mb={"50px"}>
        {`Financement en ${enquete.annee - 1}`}
      </HeadingTitle>
      <Heading size={3} mb={2}>
        {"Charges"}
      </Heading>
      <Flex>
        <Box width={1 / 3}>
          <EnqueteFormInputField
            id="charges_personnel"
            label="Charges de personnel"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
            size="medium"
            disableErrorMessage={true} // error displayed below
            aria-describedby="msg-charges_personnel"
          />
        </Box>
        <Box width={1 / 3}>
          <EnqueteFormInputField
            id="charges_preposes"
            label="dont préposés"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
            size="medium"
            disableErrorMessage={true} // error displayed below
            aria-describedby="msg-charges_preposes"
          />
        </Box>
        <Box width={1 / 3}>
          <EnqueteFormInputField
            id="charges_fonctionnement"
            label="Charges de fonctionnement"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
            size="medium"
            disableErrorMessage={true} // error displayed below
            aria-describedby="msg-charges_fonctionnement"
          />
        </Box>
      </Flex>
      <Box>
        <EnqueteFormFieldErrorMessage
          enqueteForm={enqueteForm}
          id="charges_personnel"
        />
        <EnqueteFormFieldErrorMessage
          enqueteForm={enqueteForm}
          id="charges_preposes"
        />
        <EnqueteFormFieldErrorMessage
          enqueteForm={enqueteForm}
          id="charges_fonctionnement"
        />
      </Box>

      <Box mt={"50px"}>
        <Heading size={3} mb={2}>
          {"Produits"}
        </Heading>
        <Flex>
          <Box width={1 / 2}>
            <EnqueteFormInputField
              id="produits_bareme_prelevements"
              label="Issus de l'application du barème de prélèvements"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
              size="medium"
              disableErrorMessage={true} // error displayed below
              aria-describedby="msg-produits_bareme_prelevements"
            />
          </Box>
          <Box width={1 / 2}>
            <EnqueteFormInputField
              id="autre_produits"
              label="Issus de la participation des personnes (tarif hébergement)"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
              size="medium"
              disableErrorMessage={true} // error displayed below
              aria-describedby="msg-autre_produits"
            />
          </Box>
        </Flex>
        <Box>
          <EnqueteFormFieldErrorMessage
            enqueteForm={enqueteForm}
            id="produits_bareme_prelevements"
          />
          <EnqueteFormFieldErrorMessage
            enqueteForm={enqueteForm}
            id="autre_produits"
          />
        </Box>
        <Flex mt={4}>
          <Box width={1 / 2}>
            <EnqueteFormInputField
              id="financement"
              label="Financement public"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
              size="medium"
              disableErrorMessage={true} // error displayed below
            />
          </Box>
          <Box width={1 / 2}>
            <EnqueteFormInputField
              id="aide_sociale_conseil_departemental"
              label="dont aide sociale du conseil départemental"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
              size="medium"
              disableErrorMessage={true} // error displayed below
            />
          </Box>
        </Flex>
        <Box />
      </Box>

      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </form>
  );
}

export default EnquetePreposeFinancementForm;
