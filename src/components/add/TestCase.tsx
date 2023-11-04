import { useState } from "react";
import { Box, Button, Input, Label, Select, Text } from "theme-ui";
import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {
  formData: {
    name: string;
    type: string;
  }[];
};

export default function add() {
  const [modal, setModal] = useState(false);

  const [showInputFields, setShowInputFields] = useState(false);

  const selectOptions = ["decimal", "number", "string"];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // defaultValues: {
    //   formData: [{ name: "", type: "" }],
    // },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "formData",
    control,
  })

  console.log(fields);
  
  const onSubmit = (data: FormValues) => console.log(data);

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
          { !showInputFields 
          ? 
          (
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
          ) 
          :
          (
            <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "16px 32px",
            }}
          >
            {fields.map((field, index) => (
              <>
                <Box
                  key={field.id}
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Label>Name</Label>
                    <Input
                      {...register(`formData.${index}.name` as const, {
                        required: true,
                      })}
                      className={
                        errors?.formData?.[index]?.name ? "error" : ""
                      }
                      defaultValue={field.name}
                    ></Input>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Label>Type</Label>
                    <Select
                      {...register(`formData.${index}.type` as const, {
                        required: true,
                      })}
                      className={
                        errors?.formData?.[index]?.type ? "error" : ""
                      }
                      defaultValue={field.type}
                    >
                      {selectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                    </Select>
                  </Box>
                </Box>
                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </>
            ))}
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
            <Button
              onClick={() => {
                  append({
                    name: "",
                    type: "",
                  });
                setShowInputFields(true);
                // console.log(fields);
                
              }}
            >
              add field
            </Button>
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