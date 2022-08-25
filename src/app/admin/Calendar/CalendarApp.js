import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import clsx from 'clsx';
import { Box } from '@mui/system';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import CalendarHeader from './CalendarHeader';
import EventDialog from './dialogs/event/EventDialog';
import reducer from './store';
import { openNewEventDialog, selectFilteredEvents } from './store/eventsSlice';
import { selectLabels } from './store/labelsSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& a': {
    color: `${theme.palette.text.primary}!important`,
    textDecoration: 'none!important',
  },
  '&  .fc-media-screen': {
    minHeight: '100%',
    width: '100%',
  },
  '& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th': {
    borderColor: `${theme.palette.divider}!important`,
  },
  '&  .fc-scrollgrid-section > td': {
    border: 0,
  },
  '& .fc-daygrid-day': {
    '&:last-child': {
      borderRight: 0,
    },
  },
  '& .fc-col-header-cell': {
    borderWidth: '0 1px 0 1px',
    padding: '8px 0 0 0',
    '& .fc-col-header-cell-cushion': {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: 12,
      textTransform: 'uppercase',
    },
  },
  '& .fc-view ': {
    '& > .fc-scrollgrid': {
      border: 0,
    },
  },
  '& .fc-daygrid-day.fc-day-today': {
    backgroundColor: 'transparent!important',
    '& .fc-daygrid-day-number': {
      borderRadius: '100%',
      backgroundColor: `${theme.palette.secondary.main}!important`,
      color: `${theme.palette.secondary.contrastText}!important`,
    },
  },
  '& .fc-daygrid-day-top': {
    justifyContent: 'center',

    '& .fc-daygrid-day-number': {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: 12,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 26,
      height: 26,
      margin: '4px 0',
      borderRadius: '50%',
      float: 'none',
      lineHeight: 1,
    },
  },
  '& .fc-h-event': {
    background: 'initial',
  },
  '& .fc-event': {
    border: 0,
    padding: '0 ',
    fontSize: 12,
    margin: '0 6px 4px 6px!important',
  },
}));

function CalendarApp(props) {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState();
  const dispatch = useDispatch();
  const events = useSelector(selectFilteredEvents);
  const calendarRef = useRef();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const theme = useTheme();
  const labels = useSelector(selectLabels);

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    // Correct calendar dimentions after sidebar toggles
    setTimeout(() => {
      calendarRef.current?.getApi()?.updateSize();
    }, 300);
  }, [leftSidebarOpen]);

  const handleDateSelect = (selectInfo) => {
    const { start, end } = selectInfo;
    dispatch(openNewEventDialog(selectInfo));
  };

  const handleEventClick = (clickInfo) => {
    // dispatch(openEditEventDialog(clickInfo));
    console.log(clickInfo.event);
    navigate(`/project-details/${clickInfo.event._id}`);
  };

  function renderEventContent(eventInfo) {
    return (
      <Box
        sx={{
          backgroundColor: '#4151B0',
          color: '#4151B0',
        }}
        className={clsx('flex items-center w-full rounded-4 px-8 py-2 h-22 text-white')}
      >
        <Typography className="text-12 font-semibold">{eventInfo.timeText}</Typography>
        <Typography className="text-12 px-4 truncate">{eventInfo.event.title}</Typography>
      </Box>
    );
  }

  const handleDates = (rangeInfo) => {
    setCurrentDate(rangeInfo);
  };

  const handleEventAdd = (addInfo) => {};

  const handleEventChange = (changeInfo) => {};

  const handleEventRemove = (removeInfo) => {};

  return (
    <>
      <Root
        header={<CalendarHeader calendarRef={calendarRef} currentDate={currentDate} />}
        content={
          <>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={false}
              initialView="dayGridMonth"
              editable
              selectable
              selectMirror
              dayMaxEvents
              weekends
              datesSet={handleDates}
              select={handleDateSelect}
              events={[
                {
                  _id: '0',
                  title: 'Session Title Session Title',
                  start: '2022-08-06T00:00:00+03:00',
                  end: '2022-08-06T00:00:00+06:00',
                },
              ]}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              eventAdd={handleEventAdd}
              eventChange={handleEventChange}
              eventRemove={handleEventRemove}
              initialDate={new Date()}
              ref={calendarRef}
            />
          </>
        }
        scroll="content"
      />
    </>
  );
}

export default withReducer('calendarApp', reducer)(CalendarApp);
