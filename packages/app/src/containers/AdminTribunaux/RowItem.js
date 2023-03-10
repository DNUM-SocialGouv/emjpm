import { Lock } from "@styled-icons/boxicons-solid/Lock";
import { useState } from "react";
import { Box, Flex } from "rebass";

import { Card, Text } from "~/components";

import { AdminEditTribunal } from "./AdminEditTribunal";
import { AdminTribunalMagistrats } from "./AdminTribunalMagistrats";
import { AdminTribunalGreffiers } from "./AdminTribunalGreffiers";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

function RowItem({ item }) {
  const {
    id,
    etablissement,
    code_postal,
    ville,
    siret,
    immutable,
    actual_tribunal,
    magistrats_aggregate: {
      aggregate: { count },
    },
    magistrats,
    greffiers,
  } = item;
  const [editMode, setEditMode] = useState(false);

  const toogleEditMode = () => {
    const selection = window.getSelection().toString();
    if (selection.length > 0) {
      return;
    }
    setEditMode(!editMode);
  };

  return (
    <>
      <Card
        sx={cardStyle}
        width="100%"
        onClick={toogleEditMode}
        style={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(33,82,139,.16)",
          marginBottom: "1px",
        }}
      >
        <Flex justifyContent="space-between">
          <Box>
            <Flex justifyContent="space-start">
              <Flex width="50px" flexDirection="column">
                <Text sx={labelStyle}>id</Text>
                <Text sx={descriptionStyle}>{id}</Text>
              </Flex>
              <Flex width="350px" flexDirection="column">
                <Text sx={labelStyle}>Nom</Text>
                <Flex>
                  {immutable && <Lock size="16" />}
                  <Text sx={descriptionStyle}>{etablissement}</Text>
                </Flex>
              </Flex>
              <Flex width="300px" flexDirection="column">
                <Text sx={labelStyle}>Ville</Text>
                <Text sx={descriptionStyle}>
                  {ville} ({code_postal})
                </Text>
              </Flex>
              <Flex width="150px" flexDirection="column">
                <Text sx={labelStyle}>SIRET</Text>
                <Text sx={descriptionStyle}>{siret}</Text>
              </Flex>
              <Flex width="100px" flexDirection="column">
                <Text sx={labelStyle}>Magistrats</Text>
                <Text sx={descriptionStyle}>{count}</Text>
              </Flex>
              <Flex width="250px" flexDirection="column">
                {!immutable && (
                  <>
                    <Text sx={labelStyle}>Tribunal correspondant</Text>
                    <Text sx={descriptionStyle}>
                      {actual_tribunal && (
                        <>
                          <Lock size="14" />
                          <Text display="inline">
                            {actual_tribunal.etablissement}
                          </Text>
                        </>
                      )}
                    </Text>
                  </>
                )}
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Card>
      {editMode && (
        <Card
          style={{
            borderRadius: 0,
            boxShadow: "0 3px 1px rgba(33,82,139,.16)",
            marginBottom: "3px",
          }}
        >
          <AdminTribunalMagistrats magistrats={magistrats} />
          <AdminTribunalGreffiers greffiers={greffiers} />
          {!immutable && (
            <AdminEditTribunal tribunal={item} closePanel={toogleEditMode} />
          )}
        </Card>
      )}
    </>
  );
}

export default RowItem;
