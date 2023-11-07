import { Card, CardContent, CardHeader, Grid, Tooltip, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { CheckCircle } from "@mui/icons-material";
type SubCampaignProps = {
  values: Campaign;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  activeIndex: number;
  isSubmitted: boolean;
};

const SubCampaignList: React.FC<SubCampaignProps> = ({ values, index, setActiveIndex, activeIndex, isSubmitted }) => {
  const maxLength = 30;
  const adsTotal = useMemo(() => {
    return values.subCampaigns[index].ads.reduce((accumulator, ad) => Number(accumulator) + Number(ad.quantity), 0);
  }, [index, values]);

  const isValid = () => {
    let valid = true;
    if (values.subCampaigns[index].ads.length) {
      values.subCampaigns[index].ads.forEach((item) => {
        if (!item.name || !item.quantity) {
          valid = false;
        }
      });
    } else {
      valid = false;
    }
    return valid;
  };
  return (
    <Grid>
      <Card
        onClick={() => setActiveIndex(index)}
        style={{
          width: 210,
          height: 120,
          border: `2px solid ${activeIndex === index ? "rgb(33, 150, 243)" : " white"}`,
          cursor: "pointer",
        }}
      >
        <CardHeader
          style={{ padding: "8px 8px 4px" }}
          title={
            <Tooltip title={values.subCampaigns[index].name}>
              <Typography
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-all",
                  color: `${isSubmitted && !isValid() ? "red" : ""}`,
                }}
                variant="h6"
              >
                {values.subCampaigns[index].name.length <= maxLength
                  ? values.subCampaigns[index].name
                  : `${values.subCampaigns[index].name.slice(0, maxLength)}...`}
                <CheckCircle
                  sx={{
                    fontSize: 14,
                    color: `${
                      JSON.parse(`${values.subCampaigns[index].status}`) ? "rgb(0, 128, 0)" : "rgb(141, 141, 141)"
                    }`,
                    paddingLeft: "8px",
                  }}
                />
              </Typography>
            </Tooltip>
          }
        />
        <CardContent style={{ padding: "0px 8px" }}>
          <Tooltip title="Số lượng">
            <Typography variant="h5">{Number(adsTotal)}</Typography>
          </Tooltip>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SubCampaignList;
