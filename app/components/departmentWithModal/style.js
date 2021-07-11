import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modelLink: {
    cursor: 'pointer',
    paddingTop: theme.spacing(1),
  },
  modalOverflow: {
    overflowY: 'hidden',
  },
}));
