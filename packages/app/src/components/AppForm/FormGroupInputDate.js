import { Box, Flex } from "rebass";

import { Field, InputDate } from "~/components";

import AppFormFieldErrorMessage from "./AppFormFieldErrorMessage";
import useAppFieldIsRequired from "./useAppFieldIsRequired";

export default function FormGroupInputDate({
  id,
  value,
  placeholder,
  error,
  children,
  readOnly,
  formik,
  hideErrors,
  validationSchema,
  onChange,
  required,
  title,
  ...props
}) {
  const { handleBlur, values } = formik;

  if (value === undefined) {
    value = values[id];
  }

  required = useAppFieldIsRequired({ id, required, validationSchema });

  const hasError =
    formik.errors[id] && (formik.touched[id] || formik.submitCount > 0);

  return (
    <Field className={hasError ? "has-error" : ""}>
      <Flex alignItems="center" title={title}>
        <InputDate
          placeholderText={placeholder}
          readOnly={readOnly}
          id={id}
          ariaDescribedBy={
            props?.ariaDescribedBy && !hasError
              ? props.ariaDescribedBy
              : `msg-${id}`
          }
          name={id}
          value={value}
          onBlur={handleBlur}
          onChange={
            onChange ? onChange : (value) => formik.setFieldValue(id, value)
          }
          required={required}
          {...props}
        />
        {children ? <Box>{children}</Box> : null}
      </Flex>

      <div id={`msg-${id}`}>
        <AppFormFieldErrorMessage
          id={id}
          error={error}
          formik={formik}
          hideErrors={hideErrors}
        />
      </div>
    </Field>
  );
}
