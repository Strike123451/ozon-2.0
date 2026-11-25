import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';

export default function Profile() {
  const user = useAppSelector((s) => s.auth.user);
  if (!user) return null;
  return (
    <Paper sx={{ p: 3, maxWidth: 480 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={user.image} sx={{ width: 72, height: 72 }} />
        <div>
          <Typography variant="h5">{user.firstName} {user.lastName}</Typography>
          <Typography color="text.secondary">@{user.username}</Typography>
          <Typography>{user.email}</Typography>
        </div>
      </Stack>
    </Paper>
  );
}
