import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import clsx from 'clsx';
import FreelancerCategory from './FreelancerCategory';
import Avatar from '@mui/material/Avatar';

function FreelancerInfo({ freelancer, className }) {
  if (!freelancer) {
    return null;
  }

  return (
    <div className={clsx('w-full', className)}>
      <div className='flex items-center justify-between mb-16'>
        <FreelancerCategory
          title={freelancer.category && freelancer.category}
        />

        <FuseSvgIcon className='text-green-600' size={20}>
          heroicons-solid:badge-check
        </FuseSvgIcon>
      </div>
      <div className='flex items-center justify-center mb-24'>
        <Avatar
          sx={{
            backgroundColor: 'background.paper',
            color: 'text.secondary',
          }}
          className='avatar text-32 font-bold w-96 h-96'
          src={freelancer.data.photoURL}
          alt='avatar'
        ></Avatar>
      </div>

      <Typography className='text-16 font-medium'>
        {freelancer.data.displayName}
      </Typography>

      {/* <Typography className="text-13 mt-2 line-clamp-2" color="text.secondary">
        {course.description}
      </Typography> */}

      <Divider className='w-48 my-24 border-1' light />

      <Typography
        className='flex items-center space-x-6 text-13'
        color='text.secondary'
      >
        <FuseSvgIcon color='disabled' size={20}>
          heroicons-solid:clock
        </FuseSvgIcon>
        <span className='whitespace-nowrap leading-none'>{`5 Finished Projects`}</span>
      </Typography>
    </div>
  );
}

export default FreelancerInfo;
