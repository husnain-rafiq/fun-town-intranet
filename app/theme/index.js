import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { colors } from './colors';

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: '$labelcolor',
        },
      },
    },
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
      },
    },
    MuiRadio: {
      root: {
        color: colors.grey,
      },
      colorSecondary: {
        '&$checked': {
          color: colors.grey,
        },
      },
    },
  },
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    bgColor: colors.bgColor,
    text: colors.textColor,
    iconColor: colors.iconColor,
    menuColor: colors.menuColor,
    checkbox: {
      main: colors.checkbox.main,
      secondary: colors.checkbox.secondary,
    },
    modalColors: {
      confirm: colors.red,
      cancel: colors.modalColors.cancel,
    },
  },
  defaultHeights: {
    header: '5rem',
    sideMenuItem: '3rem',
  },
  defaultWidths: {},
  spacing: (factor) => `${0.25 * factor}rem`,
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    h1: {
      fontSize: '3rem',
      color: colors.textColor.secondary,
      fontWeight: 800,
    },
    h2: {
      fontSize: '2.5rem',
      color: colors.textColor.secondary,
      fontWeight: 700,
    },
    h3: {
      fontSize: '2.0rem',
      color: colors.textColor.secondary,
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.7rem',
      color: colors.textColor.secondary,
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.3rem',
      color: colors.textColor.secondary,
      fontWeight: 500,
    },
    h6: {
      fontSize: '0.9rem',
    },

    body1: {
      fontWeight: 300,
      fontSize: '0.9rem',
      color: colors.textColor.dark,
    },
    body2: {
      fontWeight: 300,
      fontSize: '0.75rem',
      color: colors.textColor.dark,
    },
    button: {
      textTransform: 'capitalize',
      fontWeight: 300,
      fontSize: '0.8rem',
      color: colors.textColor.light,
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: '1rem',
      color: colors.textColor.dark,
    },
  },
});
const updatedTheme = responsiveFontSizes(theme);
export default updatedTheme;
