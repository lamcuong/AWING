import { TextField } from "@mui/material";
import React from "react";

type InformationProps = {
  values: Campaign;
  isSubmitted: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Information: React.FC<InformationProps> = ({ values, isSubmitted, handleChange }) => {
  return (
    <div>
      <TextField
        name="information.name"
        value={values.information.name}
        style={{ margin: "8px 0px" }}
        label="Tên chiến dịch"
        variant="standard"
        fullWidth
        required
        error={isSubmitted && !values.information.name}
        helperText={isSubmitted && !values.information.name ? "Dữ liệu không hợp lệ" : ""}
        onChange={handleChange}
      />

      <TextField
        name="information.describe"
        style={{ margin: "8px 0px" }}
        label="Mô tả"
        variant="standard"
        fullWidth
        value={values.information.describe}
        onChange={handleChange}
      />
    </div>
  );
};

export default Information;
