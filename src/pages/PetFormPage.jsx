import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";
import { createPet, getPetById, updatePet } from "../services/api";

export default function PetFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isEditMode = Boolean(id);
  const backPath = location.state?.from || "/pets";

  const [form, setForm] = useState({
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
  });

  const [isLoadingPet, setIsLoadingPet] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    const run = async () => {
      try {
        setIsLoadingPet(true);

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
      } finally {
        setIsLoadingPet(false);
      }
    };

    run();
  }, [id, isEditMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate(backPath);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);

      const payload = {
        ...form,
        age: form.age === "" ? "" : Number(form.age),
      };

      if (isEditMode) {
        await updatePet(id, payload);
      } else {
        await createPet(payload);
      }

      navigate("/pets");
    } catch (err) {
      console.error("Failed to save pet:", err);
      alert("Failed to save pet.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingPet) {
    return (
      <PageWrapper title="Edit Pet">
        <PageSection>
          <PageIntro
            backPath={backPath}
            subtitle="Loading pet information..."
          />
        </PageSection>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={isEditMode ? "Edit Pet" : "Add Pet"}>
      <PageSection>
        <PageIntro
          backPath={backPath}
          subtitle={
            isEditMode
              ? "Update this pet’s information."
              : "Create a new pet profile."
          }
        />

        <form onSubmit={handleSubmit}>
          <h3 style={{ marginTop: 0, marginBottom: "16px" }}>
            Pet Information
          </h3>

          <Grid container spacing={3} style={{ marginBottom: "32px" }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Pet Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Pet Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
                <MenuItem value="Bird">Bird</MenuItem>
                <MenuItem value="Rabbit">Rabbit</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Age"
                name="age"
                value={form.age}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <h3 style={{ marginTop: 0, marginBottom: "16px" }}>
            Owner Information
          </h3>

          <Grid container spacing={3} style={{ marginBottom: "32px" }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Owner Name"
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Street Address"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zip"
                value={form.zip}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Notes</h3>

          <div style={{ marginBottom: "32px" }}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="outlined" type="button" onClick={handleCancel}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={isSaving}>
              {isSaving
                ? "Saving..."
                : isEditMode
                ? "Update Pet"
                : "Save Pet"}
            </Button>
          </div>
        </form>
      </PageSection>
    </PageWrapper>
  );
}