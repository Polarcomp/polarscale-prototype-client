import './App.css';
import Dashboard from './views/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  spacing: 2,
  container: {
    minHeight: "100vh",
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard/>
    </ThemeProvider>
  );
}

export default App;
