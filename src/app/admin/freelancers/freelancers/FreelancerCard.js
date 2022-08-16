import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import FreelancerInfo from '../FreelancerInfo';

function FreelancerCard({ freelancer, handleSelectedUser }) {
  const handleOnClick = () => {
    handleSelectedUser(freelancer);
  };
  return (
    <Card className='flex flex-col h-384 shadow'>
      <CardContent className='flex flex-col flex-auto p-24'>
        <FreelancerInfo freelancer={freelancer} className='' />
      </CardContent>
      <CardActions
        className='items-center justify-end py-16 px-24'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? lighten(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.03),
        }}
      >
        <Button
          to={`/freelancers`}
          component={Link}
          className='px-16 min-w-128'
          color='secondary'
          variant='contained'
          onClick={handleOnClick}
          endIcon={
            <FuseSvgIcon className='' size={20}>
              heroicons-solid:arrow-sm-right
            </FuseSvgIcon>
          }
        >
          Update
        </Button>
      </CardActions>
    </Card>
  );
}

export default FreelancerCard;
