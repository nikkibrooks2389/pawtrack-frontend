import { useLocation, useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";

export default function BookingFormPage() {
  const { id } = useParams();
  const location = useLocation();

  const isEditMode = Boolean(id);
  const backPath = location.state?.from || "/bookings";
  const selectedPetId = location.state?.petId || "";

  return (
    <PageWrapper title={isEditMode ? "Edit Booking" : "Create Booking"}>
      <PageSection>
        <PageIntro
          backPath={backPath}
          subtitle={
            isEditMode
              ? "Update this booking."
              : "Create a new booking."
          }
        />

        {!isEditMode && selectedPetId && (
          <p>Creating booking for pet ID: {selectedPetId}</p>
        )}

        <p>Booking form goes here.</p>
      </PageSection>
    </PageWrapper>
  );
}