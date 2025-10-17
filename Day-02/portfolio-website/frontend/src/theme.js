import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#673ab7' },
    secondary: { main: '#ff4081' },
    background: { default: '#f3f4f6' },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default theme;
