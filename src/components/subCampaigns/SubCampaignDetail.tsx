import { Add, Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

type SubCampaignDetailProps = {
  values: Campaign;
  setValues: (value: React.SetStateAction<Campaign>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  activeIndex: number;
  isSubmitted: boolean;
};

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  handleRemoveAd: (activeIndex: number, index?: number) => void;
  handleAddAd: (activeIndex: number) => void;
  activeIndex: number;
}

const SubCampaignDetail: React.FC<SubCampaignDetailProps> = ({
  values,
  setValues,
  handleChange,
  activeIndex,
  isSubmitted,
}) => {
  const [selected, setSelected] = React.useState<number[]>([]);
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelected = values.subCampaigns[activeIndex].ads.map((_, index) => index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  const handleRemoveAd = (activeIndex: number, adIndex?: number) => {
    const updatedData = { ...values };
    if (selected.length) {
      updatedData.subCampaigns[activeIndex].ads = values.subCampaigns[activeIndex].ads.filter(
        (_, index) => !selected.includes(index)
      );
    } else {
      updatedData.subCampaigns[activeIndex].ads.splice(adIndex!, 1);
    }
    setSelected([]);
    setValues(updatedData);
  };
  const handleAddAd = (activeIndex: number) => {
    const updatedData = { ...values };
    updatedData.subCampaigns[activeIndex].ads.push({
      name: `Quảng cáo ${updatedData.subCampaigns[activeIndex].ads.length + 1}`,
      quantity: 0,
    });
    setValues(updatedData);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <TextField
            name={`subCampaigns[${activeIndex}].name`}
            value={values.subCampaigns[activeIndex].name}
            variant="standard"
            fullWidth
            required
            error={isSubmitted && !values.subCampaigns[activeIndex].name}
            helperText={isSubmitted && !values.subCampaigns[activeIndex].name ? "Dữ liệu không hợp lệ" : ""}
            label="Tên chiến dịch con"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                name={`subCampaigns[${activeIndex}].status`}
                checked={JSON.parse(`${values.subCampaigns[activeIndex].status}`)}
                value={values.subCampaigns[activeIndex].status}
                onChange={(event) => {
                  const newEvent = { ...event };
                  newEvent.target.value = `${event.target.checked}`;
                  handleChange(newEvent);
                }}
              />
            }
            label="Đang hoạt động"
          />
        </Grid>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <EnhancedTableHead
              activeIndex={activeIndex}
              handleAddAd={handleAddAd}
              handleRemoveAd={handleRemoveAd}
              numSelected={selected.length}
              rowCount={values.subCampaigns[activeIndex].ads.length}
              onSelectAllClick={handleSelectAllClick}
            />

            <TableBody>
              {values.subCampaigns[activeIndex].ads.map((row, index) => {
                const isItemSelected = isSelected(index);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    role="checkbox"
                    aria-checked={isItemSelected}
                    hover
                    tabIndex={-1}
                    selected={isItemSelected}
                    key={index}
                    id={labelId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell style={{ cursor: "pointer" }} onClick={() => handleClick(index)} padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell scope="col">
                      <TextField
                        variant="standard"
                        fullWidth
                        required
                        error={isSubmitted && !row.name}
                        value={row.name}
                        name={`subCampaigns[${activeIndex}].ads[${index}].name`}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell scope="col">
                      <TextField
                        type="number"
                        variant="standard"
                        fullWidth
                        required
                        error={isSubmitted && !row.quantity}
                        value={row.quantity}
                        name={`subCampaigns[${activeIndex}].ads[${index}].quantity`}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell scope="col" align="right">
                      <IconButton
                        style={{ cursor: "pointer" }}
                        disabled={selected.length > 0}
                        onClick={() => {
                          handleRemoveAd(activeIndex, index);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount, handleRemoveAd, activeIndex, handleAddAd } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {numSelected <= 0 ? (
          <>
            <TableCell scope="col">
              <Typography>Tên quảng cáo*</Typography>
            </TableCell>
            <TableCell scope="col">
              <Typography>Số lượng*</Typography>
            </TableCell>
          </>
        ) : (
          <TableCell colSpan={2} align="left">
            <IconButton onClick={(e) => handleRemoveAd(activeIndex)}>
              <Delete />
            </IconButton>
          </TableCell>
        )}
        <TableCell align="right">
          <Button onClick={() => handleAddAd(activeIndex)} variant="outlined">
            <Add />
            Thêm
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
export default SubCampaignDetail;
