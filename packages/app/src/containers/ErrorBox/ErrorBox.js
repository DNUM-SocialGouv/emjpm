import { Box, Button, Text } from "rebass";

// TODO(remiroyc): create error box into emjpm-ui
function ErrorBox(props) {
  const { title, message, onClick, buttonText, isLoading } = props;
  return (
    <Box
      mb={3}
      display="flex"
      justifyContent="space-between"
      color="white"
      variant="sideCard"
      p={2}
      alignItems="center"
      bg="error"
    >
      <Box>
        <Text fontWeight="bold">{title}</Text>
        <Text mt={1}>{message}</Text>
      </Box>
      <Button
        isLoading={isLoading}
        onClick={onClick}
        title={buttonText}
        aria-label={buttonText}
      >
        {buttonText}
      </Button>
    </Box>
  );
}

export default ErrorBox;
