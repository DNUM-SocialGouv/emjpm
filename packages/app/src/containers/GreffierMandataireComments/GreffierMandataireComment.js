import { useMutation } from "@apollo/client";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";

import { Box, Flex, Text } from "rebass";

import { GreffierMandataireCommentForm } from "./GreffierMandataireCommentForm";
import { REMOVE_COMMENT } from "./mutations";
import { topTextStyle } from "./style";
import useQueryReady from "~/hooks/useQueryReady";

function GreffierMandataireComment(props) {
  const {
    setCurrentComment,
    currentComment,
    id,
    comment,
    isEditOpen,
    toggleEditCommentForm,
    toggleCommentForm,
  } = props;
  const [RemoveComment, { loading, error }] = useMutation(REMOVE_COMMENT);
  useQueryReady(loading, error);

  return (
    <>
      {isEditOpen && currentComment === id ? (
        <GreffierMandataireCommentForm
          toggleEditCommentForm={toggleEditCommentForm}
          id={id}
          isEditing
          comment={comment}
        />
      ) : (
        <Text sx={topTextStyle} key={id}>
          <Flex>
            <Box
              sx={{
                flexBasis: 256,
                flexGrow: 1,
              }}
            >
              {`- ${comment}`}
            </Box>
            <Box
              sx={{ cursor: "pointer", mr: "1", width: "16px" }}
              onClick={() => {
                toggleCommentForm(false);
                toggleEditCommentForm(true);
                setCurrentComment(id);
              }}
            >
              <Edit size="16" />
            </Box>
            <Box
              sx={{ cursor: "pointer", width: "16px" }}
              onClick={() => {
                RemoveComment({
                  refetchQueries: ["MandataireComments"],
                  variables: { id: id },
                });
              }}
            >
              <XCircle size="16" />
            </Box>
          </Flex>
        </Text>
      )}
    </>
  );
}

export { GreffierMandataireComment };
