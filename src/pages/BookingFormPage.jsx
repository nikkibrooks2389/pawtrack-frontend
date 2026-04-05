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
import { getPets } from "../features/pets/api";
import { getServices } from "../features/services/api";
import {
  createBooking,
  getBookingById,
  updateBooking,
} from "../features/bookings/api";

const initialForm = {
  petId: "",
  serviceId: "",
  appointmentDate: "",
  status: "Scheduled",
  notes: "",
};

const statusOptions = ["Scheduled", "Completed", "Cancelled"];

function formatDateTimeLocal(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);

  return localDate.toISOString().slice(0, 16);
}

function getMinDateTimeLocal() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localNow = new Date(now.getTime() - offset * 60000);

  return localNow.toISOString().slice(0, 16);
}

function formatServiceType(type) {
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

export default function BookingFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isEditMode = Boolean(id);
  const backPath = location.state?.from || "/bookings";
  const preselectedPetId = location.state?.petId || "";
  const preselectedServiceId = location.state?.serviceId || "";

  const [form, setForm] = useState({
    ...initialForm,
    petId: preselectedPetId ? String(preselectedPetId) : "",
    serviceId: preselectedServiceId ? String(preselectedServiceId) : "",
  });

  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [petsRes, servicesRes] = await Promise.all([
          getPets(),
          getServices(),
        ]);

        setPets(petsRes.data);
        setServices(servicesRes.data);

        if (isEditMode) {
          const bookingRes = await getBookingById(id);
          const booking = bookingRes.data;

          setForm({
            petId: String(booking.petId || ""),
            serviceId: String(booking.serviceId || ""),
            appointmentDate: formatDateTimeLocal(booking.appointmentDate),
            status: booking.status || "Scheduled",
            notes: booking.notes || "",
          });
        }
      } catch (err) {
        console.error("Failed to load booking form data:", err);
        setError("Could not load booking form.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        id: isEditMode ? Number(id) : 0,
        petId: Number(form.petId),
        serviceId: Number(form.serviceId),
        appointmentDate: new Date(form.appointmentDate).toISOString(),
        status: form.status,
        notes: form.notes.trim(),
      };

      if (isEditMode) {
        await updateBooking(Number(id), payload);
      } else {
        await createBooking(payload);
      }

      navigate(backPath);
    } catch (err) {
      console.error("Failed to save booking:", err);
      setError("Could not save booking.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper title={isEditMode ? "Edit Booking" : "Add Booking"}>
        <PageSection>
          <PageIntro backPath={backPath} subtitle="Loading..." />
        </PageSection>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={isEditMode ? "Edit Booking" : "Add Booking"}>
      <PageSection>
        <PageIntro
          backPath={backPath}
          subtitle={
            isEditMode ? "Update this booking" : "Create a new booking"
          }
        />

        {error && (
          <p style={{ color: "red", marginTop: 0, marginBottom: 16 }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
  <h3>Booking Information</h3>

  <Grid container spacing={3} style={{ marginBottom: 32 }}>
    <Grid item xs={12} md={6}>
      <FormControl fullWidth required>
        <InputLabel id="pet-label">Pet</InputLabel>
        <Select
          labelId="pet-label"
          label="Pet"
          name="petId"
          value={form.petId}
          onChange={handleChange}
        >
          {pets.map((pet) => (
            <MenuItem key={pet.id} value={String(pet.id)}>
              {pet.name} ({pet.type})
              {pet.ownerName ? ` - ${pet.ownerName}` : ""}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12} md={6}>
      <FormControl fullWidth required>
        <InputLabel id="service-label">Service</InputLabel>
        <Select
          labelId="service-label"
          label="Service"
          name="serviceId"
          value={form.serviceId}
          onChange={handleChange}
        >
          {services.map((service) => (
            <MenuItem key={service.id} value={String(service.id)}>
              {service.name} - {formatServiceType(service.serviceType)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        required
        type="datetime-local"
        label="Appointment Date"
        name="appointmentDate"
        value={form.appointmentDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{
          min: getMinDateTimeLocal(),
        }}
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <FormControl fullWidth required>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>

  <h3>Notes</h3>

  <TextField
    fullWidth
    multiline
    minRows={4}
    label="Notes"
    name="notes"
    value={form.notes}
    onChange={handleChange}
    inputProps={{ maxLength: 250 }}
    style={{ marginBottom: 24 }}
  />

  <div style={{ display: "flex", gap: 12 }}>
    <Button variant="outlined" onClick={() => navigate(backPath)}>
      Cancel
    </Button>

    <Button type="submit" variant="contained" disabled={saving}>
      {saving ? "Saving..." : "Save Booking"}
    </Button>
  </div>
</form>
      </PageSection>
    </PageWrapper>
  );
}