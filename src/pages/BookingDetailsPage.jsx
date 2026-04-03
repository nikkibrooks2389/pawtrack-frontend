import { useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";

export default function BookingDetailsPage() {
  const location = useLocation();
  const backPath = location.state?.from || "/bookings";

  return (
    <PageWrapper title="Booking Details">
      <PageSection>
        <PageIntro
          backPath={backPath}
          subtitle="View this booking’s information."
        />

        <p>Booking details go here.</p>
      </PageSection>
    </PageWrapper>
  );
}