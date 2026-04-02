import CardList from "../CardList";
import BookingCard from "../BookingCard";

export default function UpcomingBookingsCards({ bookings, onView }) {
  return (
    <CardList>
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onView={onView}
        />
      ))}
    </CardList>
  );
}