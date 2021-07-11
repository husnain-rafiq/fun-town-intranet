import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tab: {
    backgroundColor: 'whitesmoke',
    minWidth: '40vw',
    minHeight: '70px',
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
      minHeight: 'auto',
    },
  },
  documentAction: {
    marginTop: '-7px',
  },
  indicator: {
    height: '15px !important',
    marginTop: theme.spacing(7),
    width: '15px',
    transform: `rotate(135deg)`,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      height: '2px !important',
      marginTop: 'auto',
      transform: `rotate(0deg)`,
    },
    transition: 'none',
  },
  selectedTab: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
    color: theme.palette.text.light,
  },
  documentList: {
    height: 450,
    overflowY: 'scroll',
  },
  description: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));
