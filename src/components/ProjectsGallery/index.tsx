import {useCallback} from "react";
import { useNavigate } from 'react-router-dom';
import {Notes} from "@mui/icons-material";
import {CircularProgress, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography} from "@mui/material";
import {STATUS} from "../../const/enum";
import {Gallery, Main} from "./style";

export default function ProjectsGallery({ projects = [], title, Icon }: { projects : Array<Projects>, title: string, Icon: any }) {
  const navigate = useNavigate();

  const handlePressProject = useCallback((selectedProject: Projects) => {
    if (navigate && selectedProject.status === STATUS.DONE) {
      navigate(`/project/${selectedProject.id}`) 
    }
  }, [navigate]);

  return (
    <Main>
      <Gallery>
        <div style={{ marginTop: 5, display: 'flex', alignItems: 'center' }}>
          <Icon color="primary" sx={{ marginX: 1.5, fontSize: 25 }} />
          <Typography variant="h5" fontWeight={700} color="primary">
            {title}
          </Typography>
        </div>
        <ImageList cols={3} gap={8}>
          {projects.map((item: Projects) => (
            <ImageListItem key={item.img} sx={item.status === STATUS.DONE ? { cursor: 'pointer' } : {}} onClick={() => handlePressProject(item)}>
              <img
                src={`${item.img}`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.desc}
                actionIcon={
                  <IconButton
                    onClick={() => handlePressProject(item)}
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                    {item.status === STATUS.DONE ? <Notes /> : <CircularProgress sx={{ color: '#9d9d9d' }} />}
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Gallery>
    </Main>
  );
};

