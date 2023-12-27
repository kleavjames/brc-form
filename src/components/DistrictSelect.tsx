import React, { useCallback } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ListSubHeader from "@mui/material/ListSubheader";
import { districts } from "../constants/district";
import { Districts } from "../types/information";

function DistrictSelect() {
  const renderDistricts = useCallback((district: Districts) => {
    const subdistricts = district.subdistrict.map((sub) => {
      return (
        <MenuItem key={sub.key} value={sub.key}>
          {sub.value}
        </MenuItem>
      );
    });

    return [<ListSubHeader>{district.name}</ListSubHeader>, subdistricts];
  }, []);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel sx={{ ml: -2 }} id="district-select-label">
          District
        </InputLabel>
        <Select
          labelId="district-select-label"
          id="district"
          name="district"
          label="District"
          onChange={() => {}}
          variant="standard"
        >
          {districts.map((dist) => renderDistricts(dist))}
        </Select>
      </FormControl>
    </>
  );
}

export default DistrictSelect;
