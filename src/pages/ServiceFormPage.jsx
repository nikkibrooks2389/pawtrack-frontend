import { useLocation, useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";

export default function ServiceFormPage() {
  const { id } = useParams();
  const location = useLocation();

  const isEditMode = Boolean(id);
  const backPath = location.state?.from || "/services";

  return (
    <PageWrapper title={isEditMode ? "Edit Service" : "Add Service"}>
      <PageSection>
        <PageIntro
          backPath={backPath}
          subtitle={
            isEditMode
              ? "Update this service."
              : "Create a new service."
          }
        />

        <p>Service form goes here.</p>
      </PageSection>
    </PageWrapper>
  );
}