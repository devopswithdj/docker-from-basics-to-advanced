import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import "./styles.css";

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/profile")
      .then(res => setProfile(res.data))
      .catch(console.error);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        {profile && (
          <>
            <Hero name={profile.name} role={profile.role} />
            <About about={profile.about} skills={profile.skills} />
            <Projects projects={profile.projects} />
            <Contact />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
