import Paper from '@mui/material/Paper';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const TimeLine = () => {
  return (
    <div className="w-full px-24 w-full mt-20">
      <Paper className="shadow rounded-2xl overflow-hidden p-24">
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              9:30 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" sx={{ py: '7px', px: '12px' }}>
                1
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea className="cursor-default">
                  <CardContent>
                    <div className="flex">
                      <Typography gutterBottom variant="h5" component="div">
                        Session Title
                      </Typography>
                      <FuseSvgIcon
                        size={20}
                        color="action"
                        className="inline ml-auto cursor-pointer"
                      >
                        heroicons-solid:pencil-alt
                      </FuseSvgIcon>
                    </div>

                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                      ranging across all continents except Antarctica
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mt-12">
                      State :{' '}
                      <span className="inline text-12 font-semibold py-4 px-8 rounded-full truncate bg-green-500 text-white">
                        Signed
                      </span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              9:30 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" sx={{ py: '7px', px: '12px' }}>
                2
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Card sx={{ maxWidth: 345 }} className="ml-auto">
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                      ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Paper>
    </div>
  );
};

export default TimeLine;
