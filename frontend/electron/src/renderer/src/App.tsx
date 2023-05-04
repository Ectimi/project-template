import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';

function App() {
  console.log('version', window.versions);

  return (
    <>
      <CssBaseline />
      <Button variant="contained">Hello World</Button>
    </>
  );
}

export default App;
