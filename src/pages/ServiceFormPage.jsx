import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";
import {
  createPetSittingService,
  createPetTrainingService,
  createPetWalkingService,
  getServiceById,
  updatePetSittingService,
  updatePetTrainingService,
  updatePetWalkingService,
} from "../features/services/api";

const initialForm = {
  serviceType: "PetWalkingService",
  name: "",
  price: "",
  durationMinutes: "",
  numberOfDays: "",
  visitsPerDay: "",
  careType: "DropIn",
  overnightLocation: "",
  skillFocus: "",
};

function formatServiceTypeLabel(type) {
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

export default function ServiceFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isEditMode = Boolean(id);
  const backPath = location.state?.from || "/services";

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;

    const loadService = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getServiceById(id);
        const service = res.data;

        setForm({
          serviceType: service.serviceType || "PetWalkingService",
          name: service.name || "",
          price: service.price ?? "",
          durationMinutes: service.durationMinutes ?? "",
          numberOfDays: service.numberOfDays ?? "",
          visitsPerDay:
            service.serviceType === "PetSittingService" &&
            service.includesOvernightCare
              ? ""
              : service.visitsPerDay ?? "",
          careType: service.includesOvernightCare ? "Overnight" : "DropIn",
          overnightLocation: service.overnightLocation || "",
          skillFocus: service.skillFocus || "",
        });
      } catch (err) {
        console.error("Failed to load service:", err);
        setError("Could not load service.");
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (name === "careType") {
        return {
          ...prev,
          careType: value,
          visitsPerDay: value === "Overnight" ? "" : prev.visitsPerDay,
          overnightLocation:
            value === "Overnight" ? prev.overnightLocation : "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleServiceTypeChange = (e) => {
    const selectedType = e.target.value;

    setForm({
      ...initialForm,
      serviceType: selectedType,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const basePayload = {
        id: isEditMode ? Number(id) : 0,
        name: form.name.trim(),
        price: Number(form.price),
        durationMinutes: Number(form.durationMinutes),
      };

      if (form.serviceType === "PetWalkingService") {
        if (isEditMode) {
          await updatePetWalkingService(Number(id), basePayload);
        } else {
          await createPetWalkingService(basePayload);
        }
      }

      if (form.serviceType === "PetSittingService") {
        const daysNumber = Number(form.numberOfDays);
        const isOvernight = form.careType === "Overnight";

        const payload = {
          ...basePayload,
          durationMinutes: daysNumber * 1440,
          numberOfDays: daysNumber,
          visitsPerDay: isOvernight ? 0 : Number(form.visitsPerDay),
          includesOvernightCare: isOvernight,
          overnightLocation: isOvernight
            ? form.overnightLocation.trim()
            : "",
        };

        if (isEditMode) {
          await updatePetSittingService(Number(id), payload);
        } else {
          await createPetSittingService(payload);
        }
      }

      if (form.serviceType === "PetTrainingService") {
        const payload = {
          ...basePayload,
          skillFocus: form.skillFocus.trim(),
        };

        if (isEditMode) {
          await updatePetTrainingService(Number(id), payload);
        } else {
          await createPetTrainingService(payload);
        }
      }

      navigate(backPath);
    } catch (err) {
      console.error("Failed to save service:", err);
      setError("Could not save service.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Edit Service">
        <PageSection>
          <PageIntro backPath={backPath} subtitle="Loading..." />
        </PageSection>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={isEditMode ? "Edit Service" : "Add Service"}>
      <PageSection>
        <PageIntro
          backPath={backPath}
          subtitle={
            isEditMode ? "Update this service" : "Create a new service"
          }
        />

        {error && (
          <p style={{ color: "red", marginTop: 0, marginBottom: 16 }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <h3>Service Type</h3>

          <FormControl fullWidth style={{ marginBottom: 32 }}>
            <InputLabel id="service-type-label">Service Type</InputLabel>
            <Select
              labelId="service-type-label"
              label="Service Type"
              name="serviceType"
              value={form.serviceType}
              onChange={handleServiceTypeChange}
              disabled={isEditMode}
            >
              <MenuItem value="PetWalkingService">Pet Walking</MenuItem>
              <MenuItem value="PetSittingService">Pet Sitting</MenuItem>
              <MenuItem value="PetTrainingService">Pet Training</MenuItem>
            </Select>
          </FormControl>

          <h3>{formatServiceTypeLabel(form.serviceType)}</h3>

          <Grid container spacing={3} style={{ marginBottom: 32 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                inputProps={{ maxLength: 50 }}
                helperText={
                  form.serviceType === "PetWalkingService"
                    ? "Example: 15 Minute Walk"
                    : form.serviceType === "PetSittingService"
                    ? "Example: 3-Day Overnight Sitting"
                    : "Example: Basic Obedience Training"
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                type="number"
                label="Price"
                name="price"
                value={form.price}
                onChange={handleChange}
                inputProps={{ min: 0.01, step: 0.01 }}
              />
            </Grid>

            {form.serviceType !== "PetSittingService" && (
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Duration (minutes)"
                  name="durationMinutes"
                  value={form.durationMinutes}
                  onChange={handleChange}
                  inputProps={{ min: 1 }}
                />
              </Grid>
            )}
          </Grid>

          {form.serviceType === "PetSittingService" && (
            <>
              <h3>Pet Sitting Details</h3>

              <Grid container spacing={3} style={{ marginBottom: 32 }}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="Number of Days"
                    name="numberOfDays"
                    value={form.numberOfDays}
                    onChange={handleChange}
                    inputProps={{ min: 1 }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="care-type-label">Care Type</InputLabel>
                    <Select
                      labelId="care-type-label"
                      label="Care Type"
                      name="careType"
                      value={form.careType}
                      onChange={handleChange}
                    >
                      <MenuItem value="DropIn">Drop-in Visits</MenuItem>
                      <MenuItem value="Overnight">Overnight Care</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {form.careType === "DropIn" && (
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      required
                      type="number"
                      label="Visits Per Day"
                      name="visitsPerDay"
                      value={form.visitsPerDay}
                      onChange={handleChange}
                      inputProps={{ min: 1 }}
                    />
                  </Grid>
                )}

                {form.careType === "Overnight" && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Overnight Location"
                      name="overnightLocation"
                      value={form.overnightLocation}
                      onChange={handleChange}
                      helperText="Example: Client's Home or Sitter's Home"
                      inputProps={{ maxLength: 50 }}
                    />
                  </Grid>
                )}
              </Grid>
            </>
          )}

          {form.serviceType === "PetTrainingService" && (
            <>
              <h3>Pet Training Details</h3>

              <Grid container spacing={3} style={{ marginBottom: 32 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Skill Focus"
                    name="skillFocus"
                    value={form.skillFocus}
                    onChange={handleChange}
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid>
              </Grid>
            </>
          )}

          <div style={{ display: "flex", gap: 12 }}>
            <Button variant="outlined" onClick={() => navigate(backPath)}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? "Saving..." : "Save Service"}
            </Button>
          </div>
        </form>
      </PageSection>
    </PageWrapper>
  );
}