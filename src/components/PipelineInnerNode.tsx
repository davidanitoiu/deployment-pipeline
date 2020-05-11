import React from "react";
import { INodeInnerDefaultProps } from "@mrblenny/react-flow-chart";
import { makeStyles } from "@material-ui/styles";
import { Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles<Theme>((theme) => ({
  pipelineCard: {
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const PipelineNodeInner = ({ node }: INodeInnerDefaultProps) => {
  const classes = useStyles();
  const { name } = node.properties;

  return (
    <div className={classes.pipelineCard}>
      <Typography>{name}</Typography>
    </div>
  );
};
