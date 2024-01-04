import { FC, useCallback } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { networkHeads } from "../constants/networks";

type Props = {
  onSelect: (e: SelectChangeEvent<string>) => void;
  selectedValue: string;
  disabled?: boolean;
};

const NetworkHeadsSelect: FC<Props> = ({
  onSelect,
  selectedValue,
  disabled = false,
}) => {
  const renderNetworkHeads = useCallback(() => {
    return networkHeads.map((heads) => (
      <MenuItem key={heads.name} value={heads.name}>
        {heads.name}
      </MenuItem>
    ));
  }, []);

  return (
    <>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel sx={{ ml: -2 }} id="networkHead-select-label">
          Network Head
        </InputLabel>
        <Select
          labelId="networkHead-select-label"
          id="networkHead"
          name="networkHead"
          label="Network Head"
          defaultValue={""}
          value={selectedValue}
          onChange={onSelect}
          variant="standard"
        >
          <MenuItem value="">-</MenuItem>
          {renderNetworkHeads()}
        </Select>
      </FormControl>
    </>
  );
};

export default NetworkHeadsSelect;
