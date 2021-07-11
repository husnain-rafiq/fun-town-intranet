import BorderColorIcon from '@material-ui/icons/BorderColor';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { ROLES } from 'utils/constants';

export const menuItems = [
  {
    name: 'members',
    icon: PeopleIcon,
    children: [
      { name: 'Directory', link: '/directory' },
      {
        name: 'Message from CEO',
        link: '/ceo-message',
      },
    ],
  },
  {
    name: 'blog',
    link: '/blogs',
    icon: BorderColorIcon,
  },
  {
    name: 'education',
    link: 'https://funtownrv.trainualapp.com/',
    icon: QuestionAnswerIcon,
    externalLink: true,
  },
  {
    name: 'links',
    link: '/link-categories',
    icon: LinkIcon,
  },
  {
    name: 'events',
    link: '/events',
    icon: CalendarTodayIcon,
    role: [ROLES.USER],
  },
  {
    name: 'settings',
    icon: BorderColorIcon,
    role: [ROLES.ADMIN],
    children: [
      { name: 'Quote', link: '/quote' },
      { name: 'events', link: '/events' },
      // { name: 'polls', link: '/polls' },
      {
        name: 'Announcement',
        link: '/announcement',
      },
      {
        name: 'configuration',
        link: '/',
        children: [
          { name: 'Location', link: '/locations' },
          { name: 'Department', link: '/departments' },
        ],
      },
    ],
  },
];
