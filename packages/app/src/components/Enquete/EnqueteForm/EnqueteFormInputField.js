import { Field, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { SmallInput } from "../../Commons/SmallInput";
import { EnqueteInlineError } from "./EnqueteInlineError";

export const EnqueteFormInputField = ({
  id,
  value,
  error,
  label,
  text,
  size,
  type,
  min,
  max,
  enqueteForm,
  children,
  disableErrorMessage,
}) => {
  const { readOnly, formik, showError } = enqueteForm;
  const { handleChange, handleBlur, values } = formik;

  if (!type || readOnly) {
    type = "text";
  }
  if (value === undefined) {
    value = values[id];
  }

  return (
    <Field>
      {label && (
        <Label mb={"5px"} htmlFor={id}>
          {label}
        </Label>
      )}
      {text && <Text mb={"5px"}>{text}</Text>}

      <Flex alignItems="center">
        {size === "small" || size === "medium" ? (
          <SmallInput
            placeholder=""
            readOnly={readOnly}
            id={id}
            name={id}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            hasError={showError && !!error}
            type={type}
            min={min}
            max={max}
            minWidth={size === "small" ? "60px" : "180px"}
          />
        ) : (
          <Input
            placeholder=""
            readOnly={readOnly}
            id={id}
            name={id}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            hasError={showError && !!error}
            type={type}
            min={min}
            max={max}
          />
        )}
        <Box>{children}</Box>
      </Flex>

      <EnqueteInlineError
        id={id}
        error={error}
        enqueteForm={enqueteForm}
        disableErrorMessage={disableErrorMessage}
      />
    </Field>
  );
};