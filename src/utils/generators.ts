import { reduce } from "lodash";
import { chartTemplate, nodeTemplate } from "./templates";
import { PipelineChart, PipelineLink, PipelineNode } from "./types";

const generateNodes = (nodes:Array<PipelineNode>) =>
    reduce(nodes, (prevNodes, node) => ({
        ...prevNodes,
        [node.name]: {
            ...nodeTemplate,
            id: node.name,
            position: node.position,
            properties: {
                name: node.name,
                os: node.os,
                kernel: node.kernel,
                host: node.host,
                autoDeploy: node.autoDeploy,
            }
        }
    }), {});


const generateLinks = (links:Array<PipelineLink>) =>
    reduce(links, (prevLinks, link) => ({
        ...prevLinks,
        [link.id]: ({
            id: link.id,
            from: {
                nodeId: link.from,
                portId: 'port2'
            },
            to: {
                nodeId: link.to,
                portId: 'port1'
            }
        })
    }), {})


export const generateChart = (pipeline:PipelineChart) => ({
    ...chartTemplate,
    nodes: generateNodes(pipeline.nodes),
    links: generateLinks(pipeline.links)
})
