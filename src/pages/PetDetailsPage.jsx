import { useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";

export default function PetDetailsPage() {
  const location = useLocation();
  const backPath = location.state?.from || "/pets";

  return (
    <PageWrapper title="Pet Details">
      <PageSection>
        <PageIntro
          backPath={backPath}
          subtitle="View this pet’s information."
        />

        <p>Pet details go here.</p>
      </PageSection>
    </PageWrapper>
  );
}

{/* <button
  onClick={() =>
    navigate(`/pets/${id}/edit`, {
      state: { from: `/pets/${id}` }
    })
  }
>
  Edit
</button> */}