import { darken, lighten } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import _ from '@lodash';

function FreelancerCategory({ title }) {
  return <Chip className='font-semibold text-12' label={title} size='small' />;
}

export default FreelancerCategory;
