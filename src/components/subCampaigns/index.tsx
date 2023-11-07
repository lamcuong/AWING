import React, { useState } from "react";
import { Add } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import SubCampaignList from "./SubCampaignList";
import SubCampaignDetail from "./SubCampaignDetail";

type SubCampaignProps = {
  values: Campaign;
  setValues: (value: React.SetStateAction<Campaign>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitted: boolean;
};

const SubCampaign: React.FC<SubCampaignProps> = ({ setValues, values, handleChange, isSubmitted }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <Box>
      <Grid container rowSpacing={2}>
        <Grid item xs={12} style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "2px" }}>
          <div>
            <IconButton
              onClick={() => {
                setValues((prevState) => {
                  const newValues = { ...prevState };
                  newValues.subCampaigns.push({
                    name: `Chiến dịch con ${newValues.subCampaigns.length + 1}`,
                    status: true,

                    ads: [
                      {
                        name: "Quảng cáo 1",

                        quantity: 0,
                      },
                    ],
                  });
                  return newValues;
                });
              }}
              style={{ alignItems: "flex-start", padding: 0 }}
            >
              <div
                style={{
                  backgroundColor: "rgb(237, 237, 237)",
                  width: 48,
                  height: 48,
                  display: "flex",
                  borderRadius: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Add sx={{ color: red[500] }} />
              </div>
            </IconButton>
          </div>
          {values.subCampaigns.map((_, index) => {
            return (
              <SubCampaignList
                isSubmitted={isSubmitted}
                activeIndex={activeIndex}
                values={values}
                key={index}
                index={index}
                setActiveIndex={setActiveIndex}
              />
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <SubCampaignDetail
            isSubmitted={isSubmitted}
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            activeIndex={activeIndex}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default SubCampaign;
