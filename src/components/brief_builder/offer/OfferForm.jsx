"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Card, Tab, Tabs } from "@mui/material";
import GiftPage from "./gift/GiftPage";
import Button from "@mui/material/Button";
import { CgArrowRight, CgArrowLeft } from "react-icons/cg";
import { BiPlus } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import PaidForm from "./paid/PaidForm";
import { useOfferForm } from "../hook";
import { yupResolver } from "@hookform/resolvers/yup";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ width: "100%" }}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mt: "30px" }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const OfferForm = () => {
  const hasAppended = useRef(false);
  const { initialValues, schema, submit } = useOfferForm();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "gifts",
  });

  const handleAddGiftCard = () => {
    append({});
  };

  useEffect(() => {
    if (!hasAppended.current) {
      handleAddGiftCard();
      hasAppended.current = true;
    }
  }, [fields, append]);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
    <form onSubmit={submit}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <Box
          as="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.8rem",
          }}
        >
          <Typography sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            Show us the money maker
          </Typography>
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: "600",
            }}
          >
            creators will be able to choose one of the products you upload
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
            width: "14rem",
            height: "5rem",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "3rem",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            sx={{
              "& .MuiTab-root": {
                color: "text.primary",
              },
              "& .Mui-selected": {
                backgroundColor: "#FFCC33",
                borderRadius: "50px",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab label="Gifting" {...a11yProps(0)} />
            <Tab label="Paid" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>

      <TabPanel value={value} index={0}>
        {/* <form onSubmit={submit}> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              padding: "1rem",
            }}
          >
            <Button
              sx={{
                background: "#FFCC33",
                color: "#212121",
                padding: "0.8rem",
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "none",

                "&:hover": {
                  background: "#FFCC33",
                },
              }}
              variant="contained"
              startIcon={<BiPlus />}
              onClick={() => handleAddGiftCard()}
            >
              Add Another
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {fields.map((item, index) => (
              <div key={index}>
                <GiftPage />
              </div>
            ))}
          </Box>
          <Button type="submit">
            Submit
          </Button>
        </Box>
        {/* </form> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PaidForm />
      </TabPanel>
      </form>
    </>
  );
};

export default OfferForm;
