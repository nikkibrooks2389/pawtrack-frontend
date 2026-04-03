import { useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";

export default function ServiceDetailsPage() {
  const location = useLocation();
  const backPath = location.state?.from || "/services";

  return (
    <PageWrapper title="Service Details">
      <PageSection>
        <PageIntro
          backPath={backPath}
          subtitle="View this service’s information."
        />

        <p>Service details go here.</p>
      </PageSection>
    </PageWrapper>
  );
}