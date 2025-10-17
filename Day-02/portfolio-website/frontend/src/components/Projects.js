import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const Projects = ({ projects }) => (
  <Grid container spacing={3} sx={{ p: 4 }}>
    {projects.map((project, idx) => (
      <Grid item xs={12} md={6} lg={4} key={idx}>
        <Card sx={{ borderRadius: 3, boxShadow: 5 }}>
          <CardContent>
            <Typography variant="h6">{project.title}</Typography>
            <Typography variant="body2" sx={{ my: 2 }}>
              {project.description}
            </Typography>
            <Button
              href={project.link}
              target="_blank"
              variant="contained"
              color="primary"
            >
              View Project
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default Projects;
