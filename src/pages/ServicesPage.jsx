import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";
import AppDataGrid from "../components/AppDataGrid";
import CardList from "../components/CardList";
import ServiceCard from "../components/services/ServiceCard";
import {
  formatServiceType,
  formatServiceDuration,
} from "../features/services/utils";
import { getServices } from "../features/services/api";
import { DesktopOnly, MobileOnly } from "../components/Responsive";

const Actions = styled.div`
  margin: 20px 0;
`;

export default function ServicesPage() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getServices();
        setServices(res.data);
      } catch (err) {
        console.error("Error loading services:", err);
        setError("Could not load services.");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

 const rows = services.map((service) => ({
  id: service.id,
  name: service.name,
  serviceType: formatServiceType(service.serviceType),
  price: `$${service.price}`,
  duration: formatServiceDuration(service),
}));

 const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "serviceType", headerName: "Type", flex: 1 },
  { field: "price", headerName: "Price", flex: 1 },
  { field: "duration", headerName: "Duration", flex: 1 },
];

  return (
    <PageWrapper title="Services">
      <PageSection>
        <PageIntro subtitle="View and manage all services" />

        <Actions>
          <Button
            variant="contained"
            onClick={() =>
              navigate("/services/new", {
                state: { from: "/services" },
              })
            }
          >
            + Add Service
          </Button>
        </Actions>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && services.length === 0 && <p>No services found.</p>}

        {!loading && !error && services.length > 0 && (
          <>
            <DesktopOnly>
              <AppDataGrid
                rows={rows}
                columns={columns}
                onRowClick={(params) =>
                  navigate(`/services/${params.row.id}`, {
                    state: { from: "/services" },
                  })
                }
                height={400}
                pageSize={5}
              />
            </DesktopOnly>

            <MobileOnly>
              <CardList>
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onView={(id) =>
                      navigate(`/services/${id}`, {
                        state: { from: "/services" },
                      })
                    }
                  />
                ))}
              </CardList>
            </MobileOnly>
          </>
        )}
      </PageSection>
    </PageWrapper>
  );
}