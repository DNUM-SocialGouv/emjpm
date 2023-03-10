import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { signupSchema } from "~/validation-schemas";
import { Button, Heading, Text, SrOnly } from "~/components";
import { GENDER_OPTIONS } from "~/constants/user";

export function SignupServiceInvitationForm(props) {
  const { handleSubmit, invitation } = props;

  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      email: invitation.email,
      nom: "",
      password: "",
      prenom: "",
      type: "service",
    },
    onSubmit: handleSubmit,
    validationSchema: signupSchema,
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex role="group" aria-labelledby="informations_personnelles">
        <FormGrayBox>
          <Heading size={4} id="informations_personnelles">
            {"Information personnelle"}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            Ces informations permettent de vous identifier.
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            formik={formik}
            value={formik.values.nom}
            id="nom"
            placeholder="Nom"
            validationSchema={signupSchema}
            autoComplete="family-name"
            aria-label="Votre nom de famille"
          />
          <FormGroupInput
            formik={formik}
            value={formik.values.prenom}
            id="prenom"
            placeholder="Prénom"
            validationSchema={signupSchema}
            autoComplete="given-name"
            ariaLabel="Votre prénom"
          />
        </FormInputBox>
      </Flex>
      <Flex role="group" aria-labelledby="indetifiants">
        <FormGrayBox>
          <Heading size={4} id="indetifiants">
            {"Identifiants de connexion"}
          </Heading>
          <Text
            lineHeight="1.5"
            color="textSecondary"
            id="identifiants_de_connexion_heading"
          >
            {`Ces informations permettront de vous connecter à votre compte. L'adresse email
                renseignée sera votre identifiant.`}
          </Text>
        </FormGrayBox>
        <FormInputBox
          role="group"
          aria-labelledby="identifiants_de_connexion_heading"
        >
          <FormGroupInput
            formik={formik}
            disabled
            value={formik.values.email}
            id="email"
            placeholder="Email"
            validationSchema={signupSchema}
            autoComplete="email"
            ariaLabel="Votre email"
            ariaDescribedBy="email_format"
          />
          <SrOnly id="email_format">format attendu : nom@justice.fr </SrOnly>
          <FormGroupSelect
            id="genre"
            options={GENDER_OPTIONS}
            placeholder="Civilité"
            value={formik.values.genre}
            formik={formik}
            validationSchema={signupSchema}
            autoComplete="sex"
            aria-label="Votre civilité"
          />
          <FormGroupInput
            formik={formik}
            value={formik.values.password}
            type="password"
            id="password"
            placeholder="Mot de passe"
            validationSchema={signupSchema}
            autoComplete="new-password"
            ariaLabel="Votre nouveau mot de passe"
          />
          <FormGroupInput
            formik={formik}
            value={formik.values.confirmPassword}
            type="password"
            id="confirmPassword"
            placeholder="Confirmation du mot de passe"
            validationSchema={signupSchema}
            autoComplete="new-password"
            ariaLabel="Confirmation de votre nouveau mot de passe"
          />
        </FormInputBox>
      </Flex>
      <Flex justifyContent="flex-end" p={1}>
        <Box>
          <Button
            mr="2"
            variant="outline"
            aria-label="Annuler la création de votre compte"
            title="Annuler la création de votre compte"
            href="/"
            type={null}
            as="a"
          >
            Annuler
          </Button>
        </Box>
        <Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
            aria-label="Aller à la page suivante"
            title="Aller à la page suivante"
          >
            Suivant
          </Button>
        </Box>
      </Flex>
    </form>
  );
}
