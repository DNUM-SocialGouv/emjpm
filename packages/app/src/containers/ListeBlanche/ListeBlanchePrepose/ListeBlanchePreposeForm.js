import { XCircle } from "@styled-icons/boxicons-regular/XCircle";
import { useFormik } from "formik";

import { Box, Flex, Text } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
  FormGroupSelect,
} from "~/components/AppForm";
import useUser from "~/hooks/useUser";
import yup, {
  EMAIL_NOT_VALID,
  FORM_REQUIRED_MESSAGE,
  NOM_NOT_VALID,
  PRENOM_NOT_VALID,
} from "~/validation-schemas/yup";
import {
  Button,
  Heading,
  RadioGroup,
  InlineError,
  Input,
  AccessibleSelect,
  SrOnly,
} from "~/components";

import { GENDER_OPTIONS } from "~/constants/user";
import { normalizeFirstName, normalizeLastName } from "~/utils/normalizers";
import { useMemo } from "react";

import {
  readOnlyContainerStyle,
  readOnlyInputStyle,
} from "~/containers/ListeBlanche/style";

const lbSchema = ({ isCreate }) =>
  yup.object().shape({
    email: yup.string().required(EMAIL_NOT_VALID),
    prenom: yup.string().required(PRENOM_NOT_VALID),
    nom: yup.string().required(NOM_NOT_VALID),
    genre: yup.string().nullable().required(),
    telephone: yup.string().nullable(),
    etablissements: yup
      .array()
      .test(
        "required-oncreate-orif-present-onupdate",
        FORM_REQUIRED_MESSAGE,
        (value, { parent }) => {
          if (
            !isCreate &&
            (!parent.initialEtablissements ||
              parent.initialEtablissements.length === 0)
          ) {
            return true;
          }
          return value && value.length > 0;
        }
      )
      .test(
        "required-rattachement",
        "Veuillez sélectionner un établissement de rattachement",
        (value, { parent }) => {
          if (
            !isCreate &&
            (!parent.initialEtablissements ||
              parent.initialEtablissements.length === 0)
          ) {
            return true;
          }
          return (
            value &&
            value.length > 0 &&
            value.some((v) => v.etablissement_rattachement)
          );
        }
      ),
  });

async function updateEtablissementRattachement(formik, id) {
  if (formik.values.etablissements.length > 0) {
    const idx = formik.values.etablissements.findIndex((e) => e.id === id);
    if (idx !== -1) {
      const newEtablissements = formik.values.etablissements.map((e) => ({
        ...e,
        etablissement_rattachement: false,
      }));
      newEtablissements[idx].etablissement_rattachement = true;
      formik.setFieldValue("etablissements", newEtablissements);
    }
  }
}

export function ListeBlanchePreposeForm(props) {
  const { searchEtablissements, editMode, data = {}, handleSubmit } = props;

  const isCreate = !props.data;
  const validationSchema = useMemo(() => lbSchema({ isCreate }), [isCreate]);

  const etablissements = data.mandataire_prepose_etablissements
    ? data.mandataire_prepose_etablissements.map((e) => {
        return {
          etablissement_rattachement: e.etablissement_rattachement,
          id: e.etablissement.id,
          ligneacheminement: e.etablissement.ligneacheminement,
          rslongue: e.etablissement.rslongue,
        };
      })
    : [];
  const initialValues = {
    email: data.email || "",
    initialEtablissements: etablissements,
    etablissements,
    prenom: normalizeFirstName(data.prenom || ""),
    nom: normalizeLastName(data.nom || ""),
    genre: data.genre,
    telephone: data.telephone,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        if (handleSubmit) {
          await handleSubmit(values);
        }
      } catch (error) {
        if (error.message.includes("liste_blanche_email_unique")) {
          setFieldError(
            "email",
            "L'email renseigné est déja utilisé pour un autre enregistrement de la liste blanche"
          );
        }
      }
      setSubmitting(false);
    },
    validationSchema,
  });

  const etablissementIds = formik.values.etablissements.map((e) => e.id);
  const etablissementOptions = formik.values.etablissements.map((e) => {
    return {
      checked: e.etablissement_rattachement === true,
      disabled: false,
      label: `${e.rslongue} (${e.ligneacheminement})`,
      value: `${e.id}`, // !canModifyAgrement(user, d.id),
    };
  });

  const user = useUser();

  const mandataire = data?.mandataire;
  const isAdmin = user.type === "admin";

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1} id="informations_heading">
            {"Informations personnelles"}
          </Heading>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="informations_heading">
          <FormGroupSelect
            id="genre"
            options={GENDER_OPTIONS}
            placeholder="Civilité"
            value={formik.values.genre}
            formik={formik}
            validationSchema={validationSchema}
          />
          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={validationSchema}
            normalizers={[normalizeFirstName]}
            autoComplete="given-name"
            ariaLabel="Votre prénom"
          />
          <FormGroupInput
            placeholder="NOM"
            id="nom"
            formik={formik}
            validationSchema={validationSchema}
            normalizers={[normalizeLastName]}
            autoComplete="family-name"
            ariaLabel="Votre nom"
          />
          <FormGroupInput
            placeholder="Adresse e-mail"
            id="email"
            formik={formik}
            validationSchema={validationSchema}
            autoComplete="email"
            ariaLabel="Votre email"
            ariaDescribedBy="email_format_attendu"
          />
          <SrOnly id="email_format_attendu">
            format attendu : nom@justice.fr{" "}
          </SrOnly>
          <Box flex={1 / 2}>
            <FormGroupInput
              placeholder="Téléphone"
              id="telephone"
              formik={formik}
              validationSchema={validationSchema}
              ariaLabel="Votre téléphone"
              ariaDescribedBy="telephone_format_attendu"
            />
            <SrOnly id="telephone_format_attendu">
              format attendu : 0601020304
            </SrOnly>
          </Box>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1} id="liste_des_etablissements_heading">
            {"Liste des établissements"}
          </Heading>
          <Text mt={"20px"} mb={2}>
            {
              "Ajouter les établissements dans lesquels ce mandataire travaille, et sélectionner son établissement de rattachement."
            }
          </Text>
        </FormGrayBox>
        <FormInputBox
          role="group"
          aria-labelledby="liste_des_etablissements_heading"
        >
          <RadioGroup
            options={etablissementOptions}
            onValueChange={async (value) => {
              await updateEtablissementRattachement(formik, Number(value));
            }}
            renderRadioLabel={(etablissement) => {
              return (
                <>
                  <Text>{etablissement.label}</Text>
                  <Box
                    ml={2}
                    sx={{
                      ":hover": {
                        color: "#aa2d2d",
                      },
                      color: "#777",
                      cursor: "pointer",
                    }}
                  >
                    <XCircle
                      size={24}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        formik.setFieldValue(
                          "etablissements",
                          formik.values.etablissements.filter(
                            (value) => value.id !== Number(etablissement.id)
                          )
                        );
                      }}
                    />
                  </Box>
                </>
              );
            }}
          />

          <Box>
            <Box mt={2}>
              <div aria-describedby="msg-etablissements">
                <AccessibleSelect
                  isAsync
                  name="etablissement"
                  instanceId={`etablissement-${data.id || "new"}`}
                  cacheOptions
                  defaultOptions
                  label={"Ajouter un établissement"}
                  placeholder={"recherche par nom, finess, code postal, ville."}
                  required
                  loadOptions={async (inputValue) => {
                    const values = await searchEtablissements(inputValue);
                    return values.map((e) => {
                      return {
                        label: `${e.rslongue} (${e.ligneacheminement})`,
                        ligneacheminement: e.ligneacheminement,
                        rslongue: e.rslongue,
                        value: e.id,
                      };
                    });
                  }}
                  onChange={(option) => {
                    if (!etablissementIds.includes(option.value)) {
                      formik.setFieldValue(
                        "etablissements",
                        formik.values.etablissements.concat({
                          id: option.value,
                          ligneacheminement: option.ligneacheminement,
                          rslongue: option.rslongue,
                        })
                      );
                    }
                  }}
                  onBlur={() => {
                    formik.setTouched({
                      ...formik.touched,
                      ["etablissements"]: true,
                    });
                  }}
                  hasError={
                    formik.errors.etablissements &&
                    (formik.touched.etablissements || formik.submitCount > 0)
                  }
                  aria-label="Nom du service"
                />
              </div>
              <div id="msg-etablissements">
                {(formik.touched.etablissements || formik.submitCount > 0) && (
                  <InlineError
                    message={formik.errors.etablissements}
                    fieldId="etablissements"
                  />
                )}
              </div>
            </Box>
          </Box>
        </FormInputBox>
      </Flex>

      {!isCreate && (
        <Flex>
          <FormGrayBox>
            <Heading size={4} mb={1}>
              {"Informations données par le préposé"}
            </Heading>
            <Text mt={2} mb={1}>
              {"Ces informations sont modifables uniquement par le mandataire"}
            </Text>
            {isAdmin && mandataire && (
              <Button
                as="a"
                type={null}
                href={`/admin/users/${mandataire.user.id}`}
                title=" Profil de l'utilisateur"
                aria-label=" Profil de l'utilisateur"
              >
                <span role="img" aria-labelledby="user-profile-link">
                  🧑
                </span>
                <span id="user-profile-link"> Profil de l'utilisateur</span>
              </Button>
            )}
          </FormGrayBox>
          <FormInputBox>
            {!mandataire && <Text>Aucun utilisateur associé</Text>}
            {mandataire && (
              <>
                <Input
                  label="Civilité"
                  placeholder=""
                  value={
                    mandataire.user.genre
                      ? GENDER_OPTIONS.find(
                          ({ value }) => value === mandataire.user.genre
                        ).label
                      : ""
                  }
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                />
                <Input
                  label="Prénom"
                  placeholder=""
                  value={mandataire.user.prenom}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                />
                <Input
                  label="NOM"
                  placeholder=""
                  value={mandataire.user.nom}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                  ariaLabel="Votre nom"
                />
                <Input
                  label="Adresse e-mail"
                  placeholder=""
                  value={mandataire.user.email}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                  ariaLabel="Votre adresse e-mail"
                />
                <Input
                  placeholder="Téléphone"
                  value={mandataire.telephone}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                  ariaLabel="Votre téléphone"
                />
                <Input
                  placeholder="Adresse"
                  value={mandataire.adresse}
                  forceActive
                  readOnly
                  containerStyle={readOnlyContainerStyle}
                  style={readOnlyInputStyle}
                  ariaLabel="Votre adresse"
                />
              </>
            )}
          </FormInputBox>
        </Flex>
      )}

      <Flex justifyContent="flex-end" mt={4}>
        {editMode && isAdmin && (
          <Box>
            <Button
              mr="2"
              bg="red"
              href={`/admin/liste-blanche/${data.id}/delete`}
              as="a"
              type={null}
            >
              Supprimer
            </Button>
          </Box>
        )}
        <Box>
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            title={editMode ? "Mettre à jour" : "Ajouter"}
            aria-label={editMode ? "Mettre à jour" : "Ajouter"}
          >
            {editMode ? "Mettre à jour" : "Ajouter"}
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export default ListeBlanchePreposeForm;
