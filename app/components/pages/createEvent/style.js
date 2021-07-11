import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.text.info,
  },
  dateColor: {
    color: theme.palette.text.dark,
  },
}));
