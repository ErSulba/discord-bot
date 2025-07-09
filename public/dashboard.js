const { useState, useEffect } = React;
const { TextField, Button, Container, Typography, Box } = MaterialUI;

function Dashboard() {
  const [prefix, setPrefix] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    async function loadConfig() {
      const res = await fetch('/api/config');
      const cfg = await res.json();
      setPrefix(cfg.prefix);
      setRole(cfg.role);
    }
    loadConfig();
  }, []);

  async function updatePrefix() {
    await fetch('/api/prefix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefix })
    });
  }

  async function updateRole() {
    await fetch('/api/permissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role })
    });
  }

  return React.createElement(
    Container,
    { maxWidth: 'sm', sx: { mt: 4 } },
    React.createElement(
      Typography,
      { variant: 'h4', gutterBottom: true },
      'Bot Dashboard'
    ),
    React.createElement(
      Box,
      { sx: { display: 'flex', gap: 2, mb: 2 } },
      React.createElement(TextField, {
        label: 'Command Prefix',
        value: prefix,
        onChange: e => setPrefix(e.target.value),
        fullWidth: true
      }),
      React.createElement(
        Button,
        { variant: 'contained', onClick: updatePrefix },
        'Save'
      )
    ),
    React.createElement(
      Box,
      { sx: { display: 'flex', gap: 2 } },
      React.createElement(TextField, {
        label: 'Role allowed to set prefix',
        value: role,
        onChange: e => setRole(e.target.value),
        fullWidth: true
      }),
      React.createElement(
        Button,
        { variant: 'contained', onClick: updateRole },
        'Save'
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(Dashboard)
);
