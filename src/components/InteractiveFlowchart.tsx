import { makeStyles, Theme } from "@material-ui/core";
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import React from "react";
import chartSimple from "../utils/chartSimple.json";
import { setSelectedPipeline } from "../utils/store/actions/pipeline";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../utils/store";
import { PipelineNodeInner } from "./PipelineInnerNode";

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    width: "100%",
    display: "flex",
  },
  sidebar: {
    width: 300,
    background: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  },
}));

interface InteractiveFlowchart {
  title: string;
}

export const InteractiveFlowchart = ({ title }: InteractiveFlowchart) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedPipeline = useSelector(
    (state: RootState) => state.pipeline.selectedPipeline
  );

  const handleMouseEnter = () => {
    if (title !== selectedPipeline) {
      dispatch(setSelectedPipeline(title));
    }
  };

  return (
    <div onMouseEnter={handleMouseEnter} className={classes.container}>
      <FlowChartWithState 
      initialValue={chartSimple}
      Components={{
          NodeInner: PipelineNodeInner
      }}
       />
    </div>
  );
};
