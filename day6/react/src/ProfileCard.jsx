function ProfileCard({ name, age, course, imgUrl }) {
  return (
    <div style={{
      border: "2px solid #333",
      borderRadius: "12px",
      padding: "16px",
      width: "250px",
      textAlign: "center",
      boxShadow: "2px 2px 12px rgba(0,0,0,0.1)"
    }}>
      <img
        src={imgUrl}
        alt={`${name}'s profile`}
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Course: {course}</p>
    </div>
  );
}

export default ProfileCard;
