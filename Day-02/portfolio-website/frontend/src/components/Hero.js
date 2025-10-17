import React from 'react';

export default function Hero({name, role}){
  return (
    <div className="hero">
      <h1 style={{fontSize:48, margin:6}}>{name}</h1>
      <h3 style={{fontWeight:500, margin:6}}>{role}</h3>
      <p style={{maxWidth:700}}>I build clean, colourful, and accessible web applications — focusing on performance and great UX.</p>
    </div>
  );
}
