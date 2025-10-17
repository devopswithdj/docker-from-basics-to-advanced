import React from 'react';

export default function Projects({projects}){
  return (
    <div id="projects" className="section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div className="card" key={i}>
            <h3 style={{marginTop:0}}>{p.title}</h3>
            <p>{p.description}</p>
            <a href={p.link} target="_blank" rel="noreferrer">View Project</a>
          </div>
        ))}
      </div>
    </div>
  )
}
