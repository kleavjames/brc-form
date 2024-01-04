import { FC, useCallback } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListSubHeader from "@mui/material/ListSubheader";
import { districts } from "../constants/district";
import { Districts } from "../redux/profiles/types";

type Props = {
  onSelect: (e: SelectChangeEvent<string>) => void;
  selectedValue: string;
  disabled?: boolean;
  forVoter?: boolean;
  outsideDavao?: boolean;
};

const DistrictSelect: FC<Props> = ({
  onSelect,
  selectedValue,
  disabled = false,
  forVoter = false,
  outsideDavao = false,
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
          id={forVoter ? "votingDistrict" : "district"}
          name={forVoter ? "votingDistrict" : "district"}
          disabled={disabled}
          label="District"
          value={selectedValue}
          defaultValue={
            outsideDavao ? "outside" : districts[0].subdistrict[0].key
          }
          onChange={onSelect}
          variant="standard"
        >
          {outsideDavao ? (
            <MenuItem value="outside">Outside Davao</MenuItem>
          ) : (
            districts.map((dist) => renderDistricts(dist))
          )}
        </Select>
      </FormControl>
    </>
  );
};

export default DistrictSelect;
