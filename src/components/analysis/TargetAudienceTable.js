import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

const TargetAudienceTable = ({ audiences }) => (
  <TableContainer component={Paper} sx={{ mt: 3, mb: 4 }}>
    <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      Target Audience Analysis
    </Typography>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow sx={{ bgcolor: 'background.default' }}>
          <TableCell sx={{ fontWeight: 'bold' }}>Audience Segment</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Barriers</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Triggers</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Key Messages</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {audiences.map((row, index) => (
          <TableRow
            key={index}
            sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}
          >
            <TableCell>{row.segment}</TableCell>
            <TableCell>{Array.isArray(row.barriers) ? row.barriers.join(', ') : row.barriers}</TableCell>
            <TableCell>{Array.isArray(row.triggers) ? row.triggers.join(', ') : row.triggers}</TableCell>
            <TableCell>{Array.isArray(row.messages) ? row.messages.join(', ') : row.messages}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TargetAudienceTable;