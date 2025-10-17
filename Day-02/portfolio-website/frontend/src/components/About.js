import React from 'react';

export default function About({about, skills}){
  return (
    <div id="about" className="section">
      <h2>About</h2>
      <p style={{maxWidth:800}}>{about}</p>
      <div style={{marginTop:12}} className="skills">
        {skills.map((s, i) => <div key={i} className="skill">{s}</div>)}
      </div>
    </div>
  );
}
