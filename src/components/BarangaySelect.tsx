/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { barangays } from "../constants/barangay";
import { Barangays } from "../types/information";

type Props = {
  onSelect: (e: SelectChangeEvent<string>) => void;
  districtValue: string;
  selectedValue: any;
}

const BarangaySelect: FC<Props> = ({onSelect, selectedValue, districtValue = 'poblacion'}) => {
  const renderBarangays = useCallback(() => {
    return (barangays as unknown as Barangays)[districtValue].map((barangay: any) => (
      <MenuItem key={barangay.key} value={barangay.value}>{barangay.value}</MenuItem>
    ))
  }, [districtValue])

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
          value={selectedValue}
          defaultValue={''}
          onChange={onSelect}
          variant="standard"
        >
          <MenuItem value=''>-</MenuItem>
          {renderBarangays()}
        </Select>
      </FormControl>
    </>
  );
}

export default BarangaySelect;
