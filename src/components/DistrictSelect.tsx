import { FC, useCallback } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListSubHeader from "@mui/material/ListSubheader";
import { districts } from "../constants/district";
import { Districts } from "../types/information";

type Props = {
  onSelect: (e: SelectChangeEvent<string>) => void;
  selectedValue: string;
  disabled?: boolean;
};

const DistrictSelect: FC<Props> = ({
  onSelect,
  selectedValue,
  disabled = false,
}) => {
  const renderDistricts = useCallback((district: Districts) => {
    const subdistricts = district.subdistrict.map((sub) => {
      return (
        <MenuItem key={sub.key} value={sub.key}>
          {sub.value}
        </MenuItem>
      );
    });

    return [
      <ListSubHeader color="primary">{district.name}</ListSubHeader>,
      subdistricts,
    ];
  }, []);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel
          disabled={disabled}
          sx={{ ml: -2 }}
          id="district-select-label"
        >
          District
        </InputLabel>
        <Select
          labelId="district-select-label"
          id="district"
          name="district"
          disabled={disabled}
          label="District"
          value={selectedValue}
          defaultValue={districts[0].subdistrict[0].key}
          onChange={onSelect}
          variant="standard"
        >
          {districts.map((dist) => renderDistricts(dist))}
        </Select>
      </FormControl>
    </>
  );
};

export default DistrictSelect;
