export function getBookingsTodayCount(bookings) {
  const today = new Date();

  return bookings.filter((booking) => {
    const date = new Date(booking.appointmentDate);

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }).length;
}

export function getUpcomingBookings(bookings, limit = 5) {
  const now = new Date();

  return bookings
    .filter((booking) => new Date(booking.appointmentDate) >= now)
    .sort(
      (a, b) =>
        new Date(a.appointmentDate).getTime() -
        new Date(b.appointmentDate).getTime()
    )
    .slice(0, limit);
}

export function mapBookingRows(bookings) {
  return bookings.map((booking) => ({
    id: booking.id,
    pet: booking.pet?.name || "N/A",
    service: booking.service?.name || "N/A",
    date: new Date(booking.appointmentDate).toLocaleDateString(),
    time: new Date(booking.appointmentDate).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
    status: booking.status,
  }));
}