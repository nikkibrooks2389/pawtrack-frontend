import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";
import { createPet, getPetById, updatePet } from "../features/pets/api";

const initialForm = {
  name: "",
  type: "",
  age: "",
  ownerName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  notes: "",
};

const setRequiredMessage = (message) => (e) =>
  e.target.setCustomValidity(message);

const clearValidationMessage = (e) => e.target.setCustomValidity("");

export default function PetFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isEditMode = Boolean(id);
  const backPath = location.state?.from || "/pets";

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;

    const loadPet = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getPetById(id);
        const pet = res.data;

        setForm({
          name: pet.name || "",
          type: pet.type || "",
          age: pet.age ?? "",
          ownerName: pet.ownerName || "",
          phone: pet.phone || "",
          address: pet.address || "",
          city: pet.city || "",
          state: pet.state || "",
          zip: pet.zip || "",
          notes: pet.notes || "",
        });
      } catch (err) {
        console.error("Failed to load pet:", err);
        setError("Could not load pet.");
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [id, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "state" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ageNumber = Number(form.age);

    try {
      setSaving(true);
      setError("");

      const payload = {
        id: isEditMode ? Number(id) : 0,
        name: form.name.trim(),
        type: form.type.trim(),
        age: ageNumber,
        ownerName: form.ownerName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        zip: form.zip.trim(),
        notes: form.notes.trim(),
      };

      if (isEditMode) {
        await updatePet(Number(id), payload);
      } else {
        await createPet(payload);
      }

      navigate(backPath);
    } catch (err) {
      console.error("Failed to save pet:", err);
      setError("Could not save pet.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper title="Edit Pet">
        <PageSection>
          <PageIntro backPath={backPath} subtitle="Loading..." />
        </PageSection>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={isEditMode ? "Edit Pet" : "Add Pet"}>
      <PageSection>
        <PageIntro
          backPath={backPath}
          subtitle={isEditMode ? "Update this pet" : "Create a new pet"}
        />

        {error && (
          <p style={{ color: "red", marginTop: 0, marginBottom: 16 }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <h3>Pet Info</h3>

          <Grid container spacing={3} style={{ marginBottom: 32 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                onInvalid={setRequiredMessage("Name is required")}
                onInput={clearValidationMessage}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Type"
                name="type"
                value={form.type}
                onChange={handleInputChange}
                onInvalid={setRequiredMessage("Type is required")}
                onInput={clearValidationMessage}
                inputProps={{ maxLength: 30 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                type="number"
                label="Age"
                name="age"
                value={form.age}
                onChange={handleInputChange}
                onInvalid={setRequiredMessage("Age is required")}
                onInput={clearValidationMessage}
              />
            </Grid>
          </Grid>

          <h3>Owner Info</h3>

          <Grid container spacing={3} style={{ marginBottom: 32 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Owner Name"
                name="ownerName"
                value={form.ownerName}
                onChange={handleInputChange}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                inputProps={{ maxLength: 15 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                inputProps={{ maxLength: 100 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={form.city}
                onChange={handleInputChange}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>

            <Grid item xs={6} md={2}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={form.state}
                onChange={handleInputChange}
                onInvalid={setRequiredMessage("Use a 2-letter state code")}
                onInput={clearValidationMessage}
                inputProps={{
                  maxLength: 2,
                  pattern: "[A-Za-z]{2}",
                }}
              />
            </Grid>

            <Grid item xs={6} md={2}>
              <TextField
                fullWidth
                label="Zip"
                name="zip"
                value={form.zip}
                onChange={handleInputChange}
                inputProps={{ maxLength: 10 }}
              />
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
            onChange={handleInputChange}
            inputProps={{ maxLength: 250 }}
            style={{ marginBottom: 24 }}
          />

          <div style={{ display: "flex", gap: 12 }}>
            <Button variant="outlined" onClick={() => navigate(backPath)}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </PageSection>
    </PageWrapper>
  );
}