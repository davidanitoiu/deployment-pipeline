import { createReducer } from "@reduxjs/toolkit";
import { PipelineReducer } from "../../types";
import { addLink, addNode, addPipeline, removeLink, removeNode, setAutoDeploy, setSelectedPipeline, setNodePosition } from "../actions/pipeline";
import { find, remove } from "lodash";

const initialState:PipelineReducer = {
    selectedPipeline: "",
    pipelines: [{
        title: 'Pipeline',
        chart: {
          links: [
            {
              id: 'Dev_Test',
              from: 'Dev',
              to: 'Test'
            }
          ],
          nodes: [
            {
              name: 'Dev',
              os: 'RHEL 7.6',
              kernel: '3.10.0-957',
              host: 'CTRDFLWC',
              autoDeploy: false,
              position: {
                x: 25,
                y: 50
              }
            },
            {
              name: 'Test',
              os: 'RHEL 7.6',
              kernel: '3.10.0-957',
              host: 'CTRTFLWC',
              autoDeploy: false,
              position: {
                x: 175,
                y: 50
              }
            }
          ]
        }
      }]
}

export const pipeline = createReducer(initialState, {
    [addPipeline.type]: (state, { payload }) => {
        state.pipelines = [
            ...state.pipelines,
            {
                title: payload.title,
                chart: {
                    links: [],
                    nodes: []
                }
            }
        ]
    },
    [setSelectedPipeline.type]: (state, { payload }) => {
        state.selectedPipeline = payload.title;
    },
    [setNodePosition.type]: (state, {payload}) => {
        const pipeline = find(state.pipelines, { title: state.selectedPipeline })!.chart;
        const node = find(pipeline.nodes,{name: payload.name})!;
        node.position = payload.position;

    },
    [removeNode.type]: (state, { payload }) => {
        const pipeline = find(state.pipelines, { title: state.selectedPipeline })!.chart
        remove(pipeline.nodes, { name: payload.name });
        remove(pipeline.links, (link) => link.to === payload.name || link.from === payload.name);
    },
    [removeLink.type]: (state, { payload }) => {
        const pipeline = find(state.pipelines, { title: state.selectedPipeline })!.chart
        remove(pipeline.links, { id: payload.id });
    },
    [addNode.type]: (state, { payload }) => {
        const pipeline = find(state.pipelines, { title: state.selectedPipeline })!.chart
        pipeline.nodes.push(payload)
    },
    [addLink.type]: (state, { payload }) => {
        const pipeline = find(state.pipelines, { title: state.selectedPipeline })!.chart
        pipeline.links.push(payload)
    },
    [setAutoDeploy.type]: (state, { payload }) => {
        const pipeline = find(state.pipelines, { title: state.selectedPipeline })!.chart
        const node = find(pipeline.nodes, { name: payload.selectedNodeName });
        node!.autoDeploy = payload.checked
    },
})
