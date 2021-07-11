import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: (props) => theme.typography[props.fontWeight],
    fontSize: (props) =>
      `${
        props.fontSize && theme.typography.pxToRem(props.fontSize)
      } !important`,
    textTransform: (props) => `${props.textTransform} !important`,
    color: (props) =>
      `${props.color ? theme.palette.text[props.color] : null} !important`,
  },
}));

const AttachPrefixToFontWeight = (props) => {
  let value = props;
  if (props.light) {
    value = { ...props, fontWeight: 'fontWeightLight' };
  } else if (props.medium) {
    value = { ...props, fontWeight: 'fontWeightMedium' };
  } else if (props.regular) {
    value = { ...props, fontWeight: 'fontWeightRegular' };
  } else if (props.bold) {
    value = { ...props, fontWeight: 'fontWeightBold' };
  }

  return value;
};

export const H1 = (props) => {
  const { root } = useStyles(AttachPrefixToFontWeight(props));

  return (
    <Typography classes={{ root }} variant="h1" {...props}>
      {props.children}
    </Typography>
  );
};

export const H2 = (props) => {
  const { root } = useStyles(AttachPrefixToFontWeight(props));

  return (
    <Typography classes={{ root }} variant="h2" {...props}>
      {props.children}
    </Typography>
  );
};

export const H3 = (props) => {
  const { root } = useStyles(AttachPrefixToFontWeight(props));

  return (
    <Typography classes={{ root }} variant="h3" {...props}>
      {props.children}
    </Typography>
  );
};

export const H4 = (props) => {
  const { root } = useStyles(AttachPrefixToFontWeight(props));

  return <Typography classes={{ root }} variant="h4" {...props} />;
};

export const H5 = (props) => {
  const { root } = useStyles(AttachPrefixToFontWeight(props));

  return <Typography classes={{ root }} variant="h5" {...props} />;
};
export const H6 = (props) => {
  const { root } = useStyles(AttachPrefixToFontWeight(props));

  return <Typography classes={{ root }} variant="h6" {...props} />;
};

export const BodyText = (props) => {
  const { root } = useStyles(AttachPrefixToFontWeight(props));

  return <Typography classes={{ root }} variant="body2" {...props} />;
};
export const BodyTextLarge = (props) => {
  const { root } = useStyles(AttachPrefixToFontWeight(props));
  return <Typography classes={{ root }} variant="body1" {...props} />;
};
export const BodyTextSmall = (props) => {
  const { root } = useStyles(AttachPrefixToFontWeight(props));

  return <Typography classes={{ root }} variant="body2" {...props} />;
};
export const ButtonText = (props) => {
  const { root } = useStyles(AttachPrefixToFontWeight(props));

  return <Typography classes={{ root }} variant="button" {...props} />;
};
