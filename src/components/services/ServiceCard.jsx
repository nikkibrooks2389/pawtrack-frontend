import styled from "styled-components";
import { Button } from "@mui/material";
import Card from "../Card";
import {
  formatServiceType,
  formatServiceDuration,
} from "../../features/services/utils";

const Title = styled.h3`
  margin: 0 0 8px 0;
  text-align: center;
`;

const Text = styled.p`
  margin: 4px 0;
  text-align: center;
`;

const Actions = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
`;

export default function ServiceCard({ service, onView }) {
  return (
    <Card>
      <Title>{service.name}</Title>

     <Text>Type: {formatServiceType(service.serviceType)}</Text>
<Text>Price: ${service.price}</Text>
<Text>Duration: {formatServiceDuration(service)}</Text>
      <Actions>
        <Button variant="outlined" onClick={() => onView(service.id)}>
          View
        </Button>
      </Actions>
    </Card>
  );
}