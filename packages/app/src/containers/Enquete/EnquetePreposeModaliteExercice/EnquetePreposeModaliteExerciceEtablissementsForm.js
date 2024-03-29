/* eslint-disable no-unused-vars */
import { SquaredCross } from "@styled-icons/entypo/SquaredCross";
import { FieldArray, FormikProvider } from "formik";

import { Box, Flex } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import yup from "~/validation-schemas/yup";
import { Button, Card, Heading } from "~/components";
import { formatFormInput } from "~/utils/form";

import { STATUTS, TYPES } from "../constants";
import {
  EnqueteFormInputField,
  EnqueteFormSelectField,
  EnqueteFormYesNoField,
} from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object().shape({
  actions_information_tuteurs_familiaux: yup.boolean().required(),
  etablissements: yup.array().of(
    yup.object().shape({
      finess: yup.string().required(),
      nombre_journees_esms: yup.number().min(0).required(),
      nombre_journees_hospitalisation: yup.number().min(0).required(),
      nombre_lits: yup.number().min(0).required(),
      nombre_mesures: yup.number().min(0).required(),
      raison_sociale: yup.string().required(),
      statut: yup.string().required(),
      type: yup.string().required(),
    })
  ),
});

function dataToForm(data) {
  const result = {
    actions_information_tuteurs_familiaux:
      data.actions_information_tuteurs_familiaux || false,
  };

  if (!data.nombre_lits_journee_hospitalisation) {
    return {
      ...result,
      etablissements: [
        {
          finess: "",
          nombre_journees_esms: "",
          nombre_journees_hospitalisation: "",
          nombre_lits: "",
          nombre_mesures: "",
          raison_sociale: "",
          statut: "",
          type: "",
        },
      ],
    };
  } else {
    const items = data.nombre_lits_journee_hospitalisation;
    return {
      ...result,
      etablissements: items.map((item) => {
        return {
          finess: formatFormInput(item.finess),
          nombre_journees_esms: formatFormInput(item.nombre_journees_esms),
          nombre_journees_hospitalisation: formatFormInput(
            item.nombre_journees_hospitalisation
          ),
          nombre_lits: formatFormInput(item.nombre_lits),
          nombre_mesures: formatFormInput(item.nombre_mesures),
          raison_sociale: formatFormInput(item.raison_sociale),
          statut: formatFormInput(item.statut),
          type: formatFormInput(item.type),
        };
      }),
    };
  }
}

// nested arrays: https://jaredpalmer.com/formik/docs/guides/arrays
export function EnquetePreposeModaliteExerciceEtablissementsForm(props) {
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
    loading,
    onSubmit,
    step,
    validationSchema,
  });
  const { submitForm, readOnly, values, errors, submit, formik } = enqueteForm;

  return (
    <FormikProvider value={formik}>
      <form noValidate onSubmit={submitForm}>
        <HeadingTitle textAlign="center" mb={"50px"}>
          {`Modalité d'exercice en ${enquete.annee - 1}`}
        </HeadingTitle>
        <Box mb={4}>
          <EnqueteFormYesNoField
            id={"actions_information_tuteurs_familiaux"}
            label="Vous menez des actions d'information des tuteurs familiaux"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Box>
        <FieldArray
          name="etablissements"
          render={(arrayHelpers) => (
            <Box>
              <Flex mb={4} alignItems="center" justifyContent="space-between">
                <Heading size={3}>{`${
                  values.etablissements.length
                } établissement${
                  values.etablissements.length > 1 ? "s" : ""
                }`}</Heading>

                {!readOnly && (
                  <Box>
                    <Button
                      type="button"
                      onClick={() => {
                        arrayHelpers.push({
                          finess: "",
                          nombre_journees_esms: "",
                          nombre_journees_hospitalisation: "",
                          nombre_lits: "",
                          nombre_mesures: "",
                          raison_sociale: "",
                          statut: "",
                          type: "",
                        });
                      }}
                      title="Ajouter un établissement"
                      aria-label="Ajouter un établissement"
                    >
                      Ajouter un établissement
                    </Button>
                  </Box>
                )}
              </Flex>
              {values.etablissements.map((etablissement, index) => {
                const value = etablissement ? etablissement : {};
                const error = errors.etablissements
                  ? errors.etablissements[index] || {}
                  : {};

                return (
                  <Card
                    mb={4}
                    key={`etablissement-${index}`}
                    sx={{ position: "relative" }}
                  >
                    {!readOnly && (
                      <Box
                        sx={{
                          cursor: "pointer",
                          position: "absolute",
                          right: 2,
                        }}
                      >
                        <SquaredCross
                          width={"20px"}
                          onClick={() => arrayHelpers.remove(index)}
                        />
                      </Box>
                    )}
                    <Flex mt={4} mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].finess`}
                          label="N° FINESS"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.finess}
                          error={error.finess}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].raison_sociale`}
                          label="Raison sociale"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.raison_sociale}
                          error={error.raison_sociale}
                        />
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <EnqueteFormSelectField
                          id={`etablissements[${index}].statut`}
                          label="Statut de l'établissement"
                          required={true}
                          options={STATUTS.byKey}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.statut}
                          error={error.statut}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <EnqueteFormSelectField
                          id={`etablissements[${index}].type`}
                          label="Type d'établissement"
                          required={true}
                          options={TYPES.byKey}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.type}
                          error={error.type}
                        />
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].nombre_lits`}
                          label="Nombre de lits ou de places"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.nombre_lits}
                          error={error.nombre_lits}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].nombre_journees_hospitalisation`}
                          label="Nombre de journées d'hospitalisation complètes"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.nombre_journees_hospitalisation}
                          error={error.nombre_journees_hospitalisation}
                        />
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].nombre_mesures`}
                          label="Nombre de mesures au 31/12"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.nombre_mesures}
                          error={error.nombre_mesures}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].nombre_journees_esms`}
                          label="Nombre de journées pour les ESMS"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.nombre_journees_esms}
                          error={error.nombre_journees_esms}
                        />
                      </Box>
                    </Flex>
                  </Card>
                );
              })}
            </Box>
          )}
        />
        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </form>
    </FormikProvider>
  );
}

export default EnquetePreposeModaliteExerciceEtablissementsForm;
