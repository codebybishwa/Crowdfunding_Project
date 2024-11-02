// src/components/ProjectDetail/ProjectDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./ProjectDetails.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const fetchCurrentUser = async () => {
        try {
          const response = await axios.get("http://localhost:3000/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserId(response.data._id);
        } catch (error) {
          console.error("Error fetching current user:", error);
          navigate("/login"); // Navigate to login on error
        }
      };
      fetchCurrentUser();
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`http://localhost:3000/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          alert("Failed to load the project. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete the project. Please try again.");
    }
  };

  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  const progress = (project.currentAmount / project.requiredAmount) * 100;
  const isCreator = userId === project.owner._id;
  const createdAtFormatted = formatDistanceToNow(new Date(project.createdAt), { addSuffix: true });

  return (
    <Card className="project-detail">
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          {project.name}
        </Typography>
        <img
          src={project.image}
          alt={project.name}
          className="project-detail-image"
          style={{ width: '100%', borderRadius: '8px' }}
        />
        <Typography variant="body1" className="project-description" gutterBottom>
          {project.description}
        </Typography>

        <Box className="project-info" marginTop={2}>
          <Typography variant="subtitle1">Created {createdAtFormatted}</Typography>
          <Typography variant="body2">Required Amount: ${project.requiredAmount}</Typography>
          <Typography variant="body2">Current Funding: ${project.currentAmount}</Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ margin: '10px 0' }} />
          <Typography variant="body2">{progress.toFixed(2)}% funded</Typography>
        </Box>

        <Box className="funders" marginTop={2}>
          <Typography variant="h6">Funders</Typography>
          <List>
            {project.funders?.map((funder) => (
              <ListItem key={funder._id}>
                <ListItemText primary={funder.username} />
              </ListItem>
            )) || <Typography>No funders yet.</Typography>}
          </List>
        </Box>

        <Box className="documentation" marginTop={2}>
          <Typography variant="h6">Official Documentation</Typography>
          <List>
            {project.documentation.map((doc, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <a
                      href={`path/to/${doc}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1a73e8', textDecoration: 'none' }}
                    >
                      {doc}
                    </a>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {isCreator && (
          <Box className="project-actions" display="flex" justifyContent="space-between" marginTop={2}>
            <Button variant="contained" color="primary" onClick={() => navigate(`/projects/${id}/edit`)}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={openDeleteDialog}>
              Delete
            </Button>
          </Box>
        )}
      </CardContent>

      <Button variant="contained" color="primary" className="fund-button" onClick={() => navigate(`/projects/${id}/fund`)}>
        Fund This Project
      </Button>

      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this project?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { handleDelete(); closeDeleteDialog(); }} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProjectDetail;
