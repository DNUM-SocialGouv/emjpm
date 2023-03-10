import { useQuery } from "@apollo/client";
import { DIRECTION } from "@emjpm/biz";
import { useFormik } from "formik";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { signupDirectionSchema } from "~/validation-schemas";
import { Button, Heading, Text, SrOnly } from "~/components";
import { useDepartementsOptions } from "~/utils/departements";
import { toOptions } from "~/utils/form";

import { SignupContext } from "./context";
import { REGIONS } from "./queries";
import signup from "./signup";
import { SignupGeneralError } from "./SignupGeneralError";

export function SignupDirection() {
  const history = useHistory();
  const { user, departement, direction, region, validateStepOne } =
    useContext(SignupContext);

  const formik = useFormik({
    initialValues: {
      departement: departement || "",
      directionType: direction?.directionType || "",
      region: region || "",
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const body = {
        direction: {
          departementCode: values.departement,
          directionType: values.directionType,
          regionId: values.region,
        },
        user: user,
      };

      signup({
        body,
        onComplete: () => setSubmitting(false),
        onError: (errors) => setErrors(errors),
        onSuccess: () => history.push("/signup/congratulation"),
      });
    },
    validationSchema: signupDirectionSchema,
  });

  const { departementsOptions } = useDepartementsOptions({ valueKey: "id" });
  const { data: dataRegions } = useQuery(REGIONS);

  const regionOptions = toOptions(dataRegions?.regions, "id", "nom");

  const { setFieldValue } = formik;

  return (
    <>
      <HeadingTitle p="1" m="1">
        {"Création d'un compte d'agent de l'état"}
      </HeadingTitle>
      <form noValidate onSubmit={formik.handleSubmit}>
        <SrOnly id="instructions">
          {"Tous les champs marqués d'un astérisque * sont obligatoires"}
        </SrOnly>
        <SignupGeneralError errors={formik.errors} />
        <Flex>
          <FormGrayBox>
            <Heading size={4} id="institution_heading">
              {"Institution"}
            </Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {"Pour quelle direction travaillez-vous?"}
            </Text>
          </FormGrayBox>
          <FormInputBox role="group" aria-labelledby="institution_heading">
            <FormGroupSelect
              id="directionType"
              placeholder="Type de direction"
              formik={formik}
              options={DIRECTION.DIRECTION_TYPE.options}
              validationSchema={signupDirectionSchema}
              onChange={({ value }) => {
                setFieldValue("directionType", value);
                switch (value) {
                  case "regional":
                    formik.setFieldValue("departement", null);
                    break;
                  case "departemental":
                    formik.setFieldValue("region", null);
                    break;
                  case "national":
                    formik.setFieldValue("departement", null);
                    formik.setFieldValue("region", null);
                    break;
                }
              }}
              aria-label="Type de direction"
            />
            {formik.values.directionType === "regional" && (
              <FormGroupSelect
                id="region"
                placeholder="Région"
                formik={formik}
                options={regionOptions}
                enableFilterByLabel
                validationSchema={signupDirectionSchema}
                aria-label="Région"
              />
            )}
            {formik.values.directionType === "departemental" && (
              <FormGroupSelect
                id="departement"
                placeholder="Département"
                formik={formik}
                options={departementsOptions}
                enableFilterByLabel
                validationSchema={signupDirectionSchema}
                aria-label="Département"
              />
            )}
          </FormInputBox>
        </Flex>

        <Flex justifyContent="flex-end" p={1}>
          <Box>
            <Button
              mr="2"
              variant="outline"
              aria-label="Annuler la création de votre compte"
              title="Annuler la création de votre compte"
              as="a"
              type={null}
              href="/"
            >
              Annuler
            </Button>
          </Box>
          <Box>
            <Button
              mr="2"
              variant="outline"
              onClick={() => {
                validateStepOne(false);
              }}
              aria-label="Retour à la page précédente"
              title="Retour à la page précédente"
            >
              Retour
            </Button>
          </Box>
          <Box>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              isLoading={formik.isSubmitting}
              aria-label="Enregistrer la création de votre compte"
              title="Enregistrer la création de votre compte"
            >
              Enregistrer
            </Button>
          </Box>
        </Flex>
      </form>
    </>
  );
}
