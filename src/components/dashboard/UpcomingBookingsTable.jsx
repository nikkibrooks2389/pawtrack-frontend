import AppDataGrid from "../AppDataGrid";
import { bookingColumns } from "../../features/dashboard/constants";
import { mapBookingRows } from "../../features/dashboard/utils";

const UpcomingBookingsTable = ({ bookings, onRowClick }) => {
  const rows = mapBookingRows(bookings);

  return (
    <AppDataGrid
      rows={rows}
      columns={bookingColumns}
      onRowClick={(params) => onRowClick(params.row.id)}
    />
  );
}

export default UpcomingBookingsTable;