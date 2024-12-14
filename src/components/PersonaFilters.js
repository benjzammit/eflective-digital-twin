import React from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Paper,
  OutlinedInput
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

const ageGroups = [
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+'
];

const incomeGroups = [
  'Low',
  'Middle',
  'High'
];

const genders = [
  'Male',
  'Female',
  'Other'
];

const countries = [
  { code: 'MT', name: 'Malta' },
  { code: 'UK', name: 'United Kingdom' }
];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
    },
  },
};

const PersonaFilters = ({ filters, onFilterChange }) => {
  const handleChange = (filterName, value) => {
    onFilterChange({
      ...filters,
      [filterName]: value
    });
  };

  const handleClearSearch = () => {
    handleChange('location', '');
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        mb: 3, 
        p: 2, 
        backgroundColor: 'primary.main',
        borderRadius: 2
      }}
    >
      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ 
          flexWrap: 'wrap', 
          gap: 2,
          alignItems: 'center'
        }}
      >
        {/* Age Group Filter */}
        <FormControl sx={{ width: 110, bgcolor: 'white', borderRadius: 1 }}>
          <Select
            value={filters.ageGroup || ''}
            onChange={(e) => handleChange('ageGroup', e.target.value)}
            displayEmpty
            input={<OutlinedInput />}
          >
            <MenuItem value="">
              <em>Age</em>
            </MenuItem>
            {ageGroups.map((age) => (
              <MenuItem key={age} value={age}>
                {age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Income Filter */}
        <FormControl sx={{ width: 120, bgcolor: 'white', borderRadius: 1 }}>
          <Select
            value={filters.income || ''}
            onChange={(e) => handleChange('income', e.target.value)}
            displayEmpty
            input={<OutlinedInput />}
          >
            <MenuItem value="">
              <em>Income</em>
            </MenuItem>
            {incomeGroups.map((income) => (
              <MenuItem key={income} value={income}>
                {income}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Gender Filter */}
        <FormControl sx={{ width: 100, bgcolor: 'white', borderRadius: 1 }}>
          <Select
            value={filters.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
            displayEmpty
            input={<OutlinedInput />}
          >
            <MenuItem value="">
              <em>Gender</em>
            </MenuItem>
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Country Filter */}
        <FormControl sx={{ width: 130, bgcolor: 'white', borderRadius: 1 }}>
          <Select
            value={filters.countryCode || ''}
            onChange={(e) => handleChange('countryCode', e.target.value)}
            displayEmpty
            input={<OutlinedInput />}
          >
            <MenuItem value="">
              <em>Country</em>
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search Field */}
        <TextField
          placeholder="Search location..."
          value={filters.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          sx={{
            flex: 1,
            minWidth: 180,
            maxWidth: 300,
            bgcolor: 'white',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: filters.location ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  onClick={handleClearSearch}
                  edge="end"
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </Stack>
    </Paper>
  );
};

export default PersonaFilters;