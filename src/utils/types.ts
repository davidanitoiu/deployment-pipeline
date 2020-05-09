
export interface PipelineLink {
    id: string;
    from: string;
    to: string;
}

export interface Environment {
    name: string;
    os: string;
    kernel: string;
    host: string;
    autoDeploy: boolean;
}

export interface PipelineNode extends Environment {
    position: {
        x: number;
        y: number;
    }
}

export interface PipelineChart {
    links: Array<PipelineLink>
    nodes: Array<PipelineNode>
}

export interface Pipeline {
    title: string;
    chart: PipelineChart;
}

export interface PipelineReducer {
    selectedPipeline: string;
    pipelines: Array<Pipeline>
}
