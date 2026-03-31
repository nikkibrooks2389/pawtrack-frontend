export default function PetCard({ pet }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{pet.name}</h3>
      <p>Type: {pet.type}</p>
      <p>Age: {pet.age}</p>
    </div>
  );
}