import React from 'react';

export default function Navbar(){
  return (
    <div className="navbar">
      <div style={{fontWeight:700}}>Dhanunjaya</div>
      <div>
        <a href="#projects" style={{marginRight:16,color:'white',textDecoration:'none'}}>Projects</a>
        <a href="#about" style={{marginRight:16,color:'white',textDecoration:'none'}}>About</a>
        <a href="#contact" style={{color:'white',textDecoration:'none'}}>Contact</a>
      </div>
    </div>
  );
}
