import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

const StyledIcon = styled(Icon)(({ theme, type }) => ({
  '&:before': {
    ...(type === 'folder' && {
      content: "'folder'",
      color: '#FFB300',
    }),
    ...(type === 'document' && {
      content: "'insert_drive_file'",
      color: '#1565C0',
    }),
    ...(type === 'spreadsheet' && {
      content: "'insert_chart'",
      color: '#4CAF50',
    }),
    ...((type === 'jpeg' || type === 'jpg') && {
      content: "'photo'",
      color: '#d63113',
    }),
    ...(type === 'pdf' && {
      content: "'picture_as_pdf'",
      color: '#b600c7',
    }),
    ...(type === 'text' && {
      content: "'text_snippet'",
      color: '#1565C0',
    }),
    ...(type === 'zip' && {
      content: "'local_offer'",
      color: '#FFB300',
    }),
    ...((type === 'webm' || type === 'mp4') && {
      content: "'movie'",
      color: '#ed8c05',
    }),
    ...((type === 'x-wav' || type === 'mp3') && {
      content: "'audiotrack'",
      color: '#3e9c6a',
    }),
    ...(type === 'file' && {
      content: "'text_snippet'",
      color: '#1565C0',
    }),
  },
}));

export default StyledIcon;
