import { useState } from "react";
import { Box, Button, Input, Label, Text } from "theme-ui";

export default function add() {
  interface DataItem {
    name: string;
    type: string;
  }

  const [modal, setModal] = useState(false);

  const [data, setData] = useState<DataItem[]>([]);

  const [showInputFields, setShowInputFields] = useState(false);

  console.log(data);

  const handleClick = () => {
    setData([...data, { name: "", type: "" }]);
    setShowInputFields(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    const newData = data.map((item, index) =>
      index === i ? { ...item, [name]: value } : item
    );

    setData(newData);
  };

  return (
    <>
      {modal && (
        <Box
          sx={{
            width: "50rem",
            height: "15rem",
            margin: "auto",
            background: "#e4e9ef",
            position: "absolute",
            top: 3,
            bottom: 3,
            left: 3,
            right: 3,
          }}
          as="form"
          onSubmit={(e) => e.preventDefault()}
        >
          <Box
            sx={{
              background: "orange",
              paddingTop: "20px",
              paddingBottom: "20px",
              paddingLeft: 3,
            }}
          >
            <Text
              sx={{
                color: "black",
              }}
            >
              Manage fields
            </Text>
          </Box>
          {showInputFields ? (
            <Box
            sx={{
              display:'flex',
              flexDirection:'column',
              padding:'16px 32px'
            }}
            >
              {data.map((val, i) => (
                <Box
                sx={{
                  display:'flex'
                }}
                >
                  <Box
                  sx={{
                    display:'flex',
                    flexDirection:'column'
                  }}
                  >
                    <Label>Name</Label>
                    <Input
                      name="name"
                      value={val.name}
                      onChange={(e) => handleChange(e, i)}
                    ></Input>
                  </Box>
                  <Box
                  sx={{
                    display:'flex',
                    flexDirection:'column'
                  }}
                  >
                    <Label>Type</Label>
                    <Input
                      name="type"
                      value={val.type}
                      onChange={(e) => handleChange(e, i)}
                    ></Input>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: "25px",
                paddingTop: "25px",
                paddingLeft: 3,
                background: "#e4e9ef",
              }}
            >
              <Text
                sx={{
                  fontWeight: "bold",
                }}
              >
                Empty State
              </Text>
              <Text>
                You have no fields added, start adding fields to `field` up your
                Variant
              </Text>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              paddingLeft: 3,
              background: "#e4e9ef",
            }}
          >
            <Button onClick={handleClick}>add field</Button>
            <Button onClick={() => setModal(!modal)}>Close</Button>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginRight: 2,
          marginTop: 2,
          gap: 2,
        }}
      >
        <Text
          sx={{
            fontSize: 2,
            fontWeight: "bold",
          }}
        >
          Fields
        </Text>
        <Button
          sx={{
            background: "muted",
            color: "text",
            cursor: "pointer",
          }}
          onClick={() => setModal(!modal)}
        >
          Add Fields
        </Button>
      </Box>
    </>
  );
}
