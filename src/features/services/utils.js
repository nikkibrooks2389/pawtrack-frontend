export function formatServiceType(type) {
  switch (type) {
    case "PetWalkingService":
      return "Pet Walking";
    case "PetSittingService":
      return "Pet Sitting";
    case "PetTrainingService":
      return "Pet Training";
    default:
      return type;
  }
}

export function formatServiceDuration(service) {
  if (service.serviceType === "PetSittingService") {
    const days = Math.round(Number(service.durationMinutes) / 1440);

    return `${days} day${days === 1 ? "" : "s"}`;
  }

  return `${service.durationMinutes} min`;
}