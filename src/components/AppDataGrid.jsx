import { DataGrid } from "@mui/x-data-grid";

export default function AppDataGrid({
  rows,
  columns,
  onRowClick,
  height = 360,
  pageSize = 5,
}) {
  return (
    <div style={{ width: "100%", height }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[pageSize]}
        initialState={{
          pagination: {
            paginationModel: { pageSize, page: 0 },
          },
        }}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        onRowClick={onRowClick}
        sx={{
          cursor: onRowClick ? "pointer" : "default",
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f9fafb",
          },
        }}
      />
    </div>
  );
}