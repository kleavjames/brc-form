import { useCallback } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { networkHeads } from "../constants/networks";

function NetworkHeadsSelect() {
  const renderNetworkHeads = useCallback(() => {
    return networkHeads.map(heads => (
      <MenuItem key={heads.name} value={heads.name}>{heads.name}</MenuItem>
    ))
  }, [])

  return (
    <>
      <FormControl fullWidth>
        <InputLabel sx={{ ml: -2 }} id="networkHeads-select-label">
          Network Heads
        </InputLabel>
        <Select
          labelId="networkHeads-select-label"
          id="networkHeads"
          name="networkHeads"
          label="Network Heads"
          defaultValue={''}
          onChange={() => {}}
          variant="standard"
        >
          <MenuItem value=''>-</MenuItem>
          {renderNetworkHeads()}
        </Select>
      </FormControl>
    </>
  );
}

export default NetworkHeadsSelect;
