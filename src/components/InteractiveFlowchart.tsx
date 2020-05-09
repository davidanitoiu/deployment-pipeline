import { makeStyles, Theme } from "@material-ui/core";
import { FlowChart } from "@mrblenny/react-flow-chart";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PipelineContext, usePipeline, validateLink } from "../utils";
import { RootState } from "../utils/store";
import { setSelectedPipeline } from "../utils/store/actions/pipeline";
import AvailableEnvironments from "./AvailableEnvironments";
import EnvironmentProperties from "./EnvironmentProperties";
import { PipelineNodeInner } from "./PipelineInnerNode";

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    height: "60vh"
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
  const [chart, callbacks, chartDispatch] = usePipeline(title);
  const contextValue = useMemo(() => ({ chart, callbacks, chartDispatch }), [
    chart,
    callbacks,
    chartDispatch,
  ]);

  const handleMouseEnter = () => {
    if (title !== selectedPipeline) {
      dispatch(setSelectedPipeline(title));
    }
  };

  return (
    <PipelineContext.Provider value={contextValue}>
      <div onMouseEnter={handleMouseEnter} className={classes.container}>
        <FlowChart
          chart={chart}
          callbacks={callbacks}
          Components={{
            NodeInner: PipelineNodeInner,
          }}
          config={{
            snapToGrid: true,
            validateLink
          }}
        />
        <div className={classes.sidebar}>
          {chart.selected?.type === "node" ? (
            <EnvironmentProperties />
          ) : (
            <AvailableEnvironments title={title} />
          )}
        </div>
      </div>
    </PipelineContext.Provider>
  );
};
