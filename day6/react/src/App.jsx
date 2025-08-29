import React from 'react'
import ProfileCard from './ProfileCard.jsx';

function App() {
  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "50px" }}>
      <ProfileCard
        name="Rehan"
        age={20}
        course="CSE"
        imgUrl="https://via.placeholder.com/100"
      />
      <ProfileCard
        name="Raunak"
        age={19}
        course="CSE"
        imgUrl="https://via.placeholder.com/100"
      />
        <ProfileCard
        name="Priyanshu"
        age={19}
        course="CSE"
        imgUrl="https://via.placeholder.com/100"
      />
    </div>
  );
}

export default App;

