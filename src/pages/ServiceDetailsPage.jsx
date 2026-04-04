import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";
import {
  formatServiceType,
  formatServiceDuration,
} from "../features/services/utils";
import { getServiceById, deleteService } from "../features/services/api";
import { breakpoint } from "../styles/themeHelpers";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;

  @media ${breakpoint("mobile")} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ServiceName = styled.h2`
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media ${breakpoint("tablet")} {
    grid-template-columns: 1fr;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BlockTitle = styled.h3`
  margin-bottom: 8px;
`;

const Text = styled.p`
  margin: 0;
`;



export default function ServiceDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const backPath = location.state?.from || "/services";

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getServiceById(id);
        setService(res.data);
      } catch (err) {
        console.error("Error loading service:", err);
        setError("Could not load service.");
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await deleteService(id);
      navigate("/services");
    } catch (err) {
      console.error("Error deleting service:", err);
      setError(err?.response?.data || "Could not delete service.");
    }
  };

  if (loading) {
    return <PageWrapper title="Service Details">Loading...</PageWrapper>;
  }

  if (error) {
    return <PageWrapper title="Service Details">{error}</PageWrapper>;
  }

  if (!service) {
    return <PageWrapper title="Service Details">Not found</PageWrapper>;
  }

  return (
    <PageWrapper title="Service Details">
      <PageSection>
        <PageIntro
          backPath={backPath}
          subtitle="View this service’s information."
        />

        <Header>
          <ServiceName>{service.name}</ServiceName>

          <Actions>
            <Button
              variant="outlined"
              onClick={() =>
                navigate(`/services/${id}/edit`, {
                  state: { from: `/services/${id}` },
                })
              }
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Actions>
        </Header>

        <DetailsGrid>
          <InfoBlock>
            <BlockTitle>Service Information</BlockTitle>
           <Text>Type: {formatServiceType(service.serviceType)}</Text>
<Text>Price: ${service.price}</Text>
<Text>Duration: {formatServiceDuration(service)}</Text>
          </InfoBlock>

          <InfoBlock>
            <BlockTitle>Description</BlockTitle>
            <Text>{service.summary}</Text>
          </InfoBlock>
        </DetailsGrid>
      </PageSection>
    </PageWrapper>
  );
}