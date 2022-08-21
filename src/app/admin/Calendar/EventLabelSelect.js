import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { forwardRef } from 'react';
import { Box } from '@mui/system';
import { selectLabelById, selectLabels } from './store/labelsSlice';

const EventLabelSelect = forwardRef((props, ref) => {
  const { value, onChange, className } = props;
  const labels = useSelector(selectLabels);
  const selectedLabel = useSelector((state) => selectLabelById(state, value));

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth className={className}>
      <InputLabel id="select-label">Label</InputLabel>
      <Select
        labelId="select-label"
        id="label-select"
        value={value}
        label="Label"
        onChange={handleChange}
        ref={ref}
        classes={{ select: 'flex items-center space-x-12' }}
      >
        {[
          {
            id: '0',
            title: 'Project 1',
            color: '#419388',
          },
          {
            id: '1',
            title: 'Project 2',
            color: '#4151B0',
          },
          {
            id: '2',
            title: 'Project 3',
            color: '#D63E63',
          },
        ].map((label) => (
          <MenuItem value={label.id} key={label.id} className="space-x-12">
            <Box
              className="w-12 h-12 shrink-0 rounded-full"
              sx={{ backgroundColor: label.color }}
            />
            <span>{label.title}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default EventLabelSelect;
