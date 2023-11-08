import { useState } from "react";
import { Box, Button, Input, Label, Select, Text } from "theme-ui";
import { useForm, useFieldArray } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { produce } from "immer";
import { type } from "os";

type FormValues = {
  fields: {
    name: string;
    type: string;
  }[];
};

export default function Add() {

  const [modal, setModal] = useState(false);

  const [showInputFields, setShowInputFields] = useState(false);

  const selectOptions = ["decimal", "number", "string"];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "fields",
    control,
  });

  const [formData, setFormData] = useState<FormValues>({
    fields: [],
  });

  const onSubmit = (data: FormValues) => {
    const newState = produce(fields, (draftState) => {
      const APIdata = draftState.map((field) => ({
        name: field.name,
        type: field.type,
        id: field.id
      }));
      draftState = APIdata
    });        
    console.log("newState",newState);
    
    setFormData(data);
    setShowInputFields(false);
    setModal(false);
  }

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
            borderRadius: "12px",
            zIndex: "999",
          }}
          as="form"
          onSubmit={(e) => e.preventDefault()}
        >
          <Box
            sx={{
              background: "#f0ecec",
              padding: "16px 32px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderColor: "red",
            }}
          >
            <Text
              sx={{
                color: "black",
                fontSize: "14px",
              }}
            >
              Manage fields
            </Text>
          </Box>
          {!showInputFields ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "25px 32px 16px",
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
              <Text
                sx={{
                  fontSize: "12px",
                  color: "#515b66",
                }}
              >
                You have no fields added, start adding fields to `field` up your
                Variant
              </Text>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                background: "white",
              }}
            >
              {fields.map((field, index) => (
                <>
                  <Box
                    key={field.id}
                    sx={{
                      display: "flex",
                      gap: "20px",
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                      padding: "16px 32px 24px",
                      borderColor: "#e4e9ef",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: "1",
                      }}
                    >
                      <Label
                        sx={{
                          fontSize: "10px",
                          paddingBottom: "4px",
                        }}
                      >
                        Field Name
                      </Label>
                      <Input
                        sx={{
                          padding: "4px 8px",
                          width: "100%",
                          borderColor: "#e4e9ef",
                          fontSize: "16px",
                          fontWeight: 400,
                          border: "1px solid",
                        }}
                        {...register(`fields.${index}.name` as const, {
                          required: "Name required",
                        })}
                        className={errors?.fields?.[index]?.name ? "error" : ""}
                        defaultValue={field.name}
                      ></Input>
                      <ErrorMessage
                        errors={errors}
                        name={`fields.${index}.name`}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: "1",
                      }}
                    >
                      <Label
                        sx={{
                          fontSize: "10px",
                          paddingBottom: "4px",
                        }}
                      >
                        TYPE
                      </Label>
                      <Select
                        sx={{
                          padding: "4px 8px",
                        }}
                        {...register(`fields.${index}.type` as const, {
                          required: "Tye is required",
                        })}
                        defaultValue={field.type}
                      >
                        {selectOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                      <ErrorMessage
                        errors={errors}
                        name={`fields.${index}.type`}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Label
                        sx={{
                          fontSize: "10px",
                          paddingBottom: "4px",
                        }}
                      >
                        Action
                      </Label>
                      <Box
                        sx={{
                          display: "flex",
                          border: "1px solid #e4e9ef",
                          width: "33px",
                          height: "35px",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "6px",
                        }}
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <svg
                          height="1.25rem"
                          width="1.25rem"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          data-color="red"
                        >
                          <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                          <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                        </svg>
                      </Box>
                    </Box>
                  </Box>
                </>
              ))}
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              padding: "32px",
              background: "#e4e9ef",
            }}
          >
            <Button
              sx={{
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "14px",
                border: "1px solid",
                padding: "8px 16px",
                background: "#00471a",
                margin: "0px",
                borderRadius: "6px",
              }}
              onClick={() => {
                append({
                  name: "",
                  type: "",
                });
                setShowInputFields(true);
              }}
            >
              Add Field
            </Button>
          </Box>
          {showInputFields && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "end",
                padding: "16px 32px",
                background: "#f0ecec",
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
              }}
            >
              <Button
                sx={{
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: "12px",
                  border: "1px solid",
                  padding: "8px 16px",
                  background: "#00471a",
                  margin: "0px",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                sx={{
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: "12px",
                  border: "1px solid",
                  padding: "8px 16px",
                  background: "#00471a",
                  margin: "0px",
                  borderRadius: "6px",
                }}
              >
                Save
              </Button>
            </Box>
          )}
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          position: "absolute",
          left: "1150px",
          width: "250px",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid black",
            paddingLeft: "10px",
          }}
        >
          <Text>Fields</Text>
        </Box>
        {formData.fields.map((field, index) => {
          return (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  border: "1px solid",
                  marginTop: "10px",
                }}
              >
                <Text>{field.name}</Text>
                <Text>{field.type}</Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
