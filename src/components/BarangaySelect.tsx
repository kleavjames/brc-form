import { useCallback } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { barangays } from "../constants/barangay";

function BarangaySelect() {
  const renderBarangays = useCallback(() => {
    return barangays['poblacion'].map(barangay => (
      <MenuItem key={barangay.key} value={barangay.value}>{barangay.value}</MenuItem>
    ))
  }, [])

  return (
    <>
      <FormControl fullWidth>
        <InputLabel sx={{ ml: -2 }} id="barangay-select-label">
          Barangay
        </InputLabel>
        <Select
          labelId="barangay-select-label"
          id="barangay"
          name="barangay"
          label="Barangay"
          defaultValue={barangays['poblacion'][0].value}
          onChange={() => {}}
          variant="standard"
        >
          {renderBarangays()}
        </Select>
      </FormControl>
    </>
  );
}

export default BarangaySelect;
