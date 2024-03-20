import React from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";

const TablePaginationCustom = ({
  page,
  rowsPerPage,
  onChangeRowsPerPage,
  pagination,
  onChangePagePagination,
  sx
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: "10px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body1">Rows per page:</Typography>
        <FormControl
          sx={{
            ...sx,
            m: 1,
            // minWidth: 160,
            "& .MuiInputBase-input": {
              p: "8px 10px",
            },
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
        >
          <Select
            value={rowsPerPage}
            onChange={onChangeRowsPerPage}
            defaultValue={rowsPerPage}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            // sx={{ "& .MuiSelect-icon": { color: "#212121", opacity: 0.6 } }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body1" sx={{ mr: "10px" }}>{`${
          page * pagination.pageSize + 1
        } - ${page * pagination.pageSize + pagination.pageSize} of ${
          pagination?.totalRecords
        }`}</Typography>
        <Pagination
          shape="rounded"
          count={pagination.totalPages}
          page={pagination?.page}
          onChange={onChangePagePagination}
        />
      </Box>
    </Box>
  );
};

export default TablePaginationCustom;
