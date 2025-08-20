import { makeStyles, tokens, Tooltip } from '@fluentui/react-components';

// Definir estilos sin anotaciones de tipo
const useStyles = makeStyles({
  tooltip: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
  },
});

const TooltipCustom = ({ children, content, ...props }) => {
  const styles = useStyles();
  return (
    <Tooltip
      withArrow
      content={{ children: content, className: styles.tooltip }}
      positioning={'below'}
      relationship='label'
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipCustom;
