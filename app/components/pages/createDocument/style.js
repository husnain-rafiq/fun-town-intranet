import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../theme/colors';

export const useStyles = makeStyles(() => ({
  documentUpload: {
    cursor: 'pointer',
    border: `1px solid ${colors.silver}`,
    borderRadius: '4px',
  },
  fileName: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));
