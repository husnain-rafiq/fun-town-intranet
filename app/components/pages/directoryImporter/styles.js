import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
  },
  contentGrid: { display: 'flex', flex: 0.3 },
  headingGrid: {
    display: 'flex',
    [theme.breakpoints.down('xl')]: {
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  templateDownloadGrid: {
    display: 'flex',
    [theme.breakpoints.down('xl')]: {
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  templateDownloadBtn: {
    paddingLeft: 0,
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  templateBtnIcon: {
    color: theme.palette.iconColor.secondary,
  },
  uploadFileGrid: {
    display: 'flex',
    [theme.breakpoints.down('xl')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  uploadBtnBox: {
    display: 'flex',
    [theme.breakpoints.down('xl')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  fileLabelBox: {
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '2rem',
    },
  },
  circularProgress: {
    marginInline: '1rem',
  },
}));
