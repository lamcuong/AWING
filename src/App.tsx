import React, { useState } from "react";
import "./App.css";
import { Box, Button, Tabs, Tab, Paper } from "@mui/material";
import TabPanel from "./components/TabPanel";
import Information from "./components/information";
import SubCampaign from "./components/subCampaigns";
const initialValues: Campaign = {
  information: {
    name: "",

    describe: "",
  },

  subCampaigns: [
    {
      name: "Chiến dịch con 1",

      status: true,

      ads: [
        {
          name: "Quảng cáo 1",

          quantity: 0,
        },
      ],
    },
  ],
};
function App() {
  const [tabValue, setTabValue] = useState<number>(0);
  const [values, setValues] = useState<Campaign>(initialValues);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValues = { ...values };

    const nameParts = name.split(".");
    let temp: any = newValues;

    for (let i = 0; i < nameParts.length - 1; i++) {
      const part = nameParts[i];

      if (/\[(\d+)]$/.test(part)) {
        // Nếu name có cấu trúc mảng "[index]", tách tên mảng và chỉ số ra.

        const [arrayName, indexStr] = part.split("[");
        const index = parseInt(indexStr.replace("]", ""), 10);

        if (!temp[arrayName]) {
          temp[arrayName] = [];
        }

        temp = temp[arrayName][index];
      } else {
        if (!temp[part]) {
          temp[part] = {};
        }
        temp = temp[part];
      }
    }

    // Gán giá trị cho phần cuối cùng của name.
    temp[nameParts[nameParts.length - 1]] = value;

    setValues(newValues);
  };
  const validate = () => {
    let valid = true;
    if (!values.information.name) valid = false;
    values.subCampaigns.forEach((sub) => {
      if (!sub.name) valid = false;

      if (sub.ads.length) {
        sub.ads.forEach((item) => {
          if (!item.name || !item.quantity) valid = false;
        });
      } else {
        valid = false;
      }
    });
    return valid;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    window.alert(validate() ? JSON.stringify(values) : "Vui lòng điền đúng và đầy đủ thông tin");
  };
  return (
    <div className="App">
      <div style={{ padding: "20px", borderBottom: "1px solid black", textAlign: "right" }}>
        <Button size="small" onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </div>
      <div style={{ padding: 20 }}>
        <Paper>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Thông tin" />
              <Tab label="Chiến dịch con" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <Information handleChange={handleChange} isSubmitted={isSubmitted} values={values} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <SubCampaign isSubmitted={isSubmitted} values={values} setValues={setValues} handleChange={handleChange} />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
}

export default App;
