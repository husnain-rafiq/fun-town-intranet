import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  bannerGridSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.3',
    marginBlock: '0.2rem',
    position: 'relative',
  },
  bannerGridSectionWHover: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.3',
    marginBlock: '0.2rem',
    position: 'relative',
    '&:hover': {
      '& $bannerImage': {
        opacity: 0.7,
      },
      '& $editBox': { opacity: 1 },
    },
  },
  statsSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.7',
    marginBlock: '0.2rem',
  },
  bannerImage: {
    flex: 1,
    opacity: 1,
    display: 'block',
    width: '100%',
    height: 'auto',
    transition: '.5s ease',
    'backface-visibility': 'hidden',
  },
  editBox: {
    transition: '.5s ease',
    opacity: 0,
    position: 'absolute',
    top: '92%',
    [theme.breakpoints.down('sm')]: {
      top: '85%',
    },
    left: '50%',
    transform: 'translate(-50%,  -50%)',
    '-ms-transform': 'translate(-50%,  -50%)',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
}));
