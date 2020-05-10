# Deployment Pipeline

This is a basic implementation of [React Flow Chart](https://github.com/MrBlenny/react-flow-chart)

## What this solution does

A graphical interface to design deployment pipelines

## Usage

Clone the project and type

```bash
npm start
```

## Handling

To create nodes, drag and drop them on the canvas.

To delete nodes or links, select them and press 'Delete' on your keyboard.

To view the properties of a node, select it, and a menu will appear on the right. You may alter the attributes here.

## Problem

In this implementation we will assume a client setup with multiple environments.

Traditional:

- Development
- Test
- Acceptance
- Production

Scenario:

- Development: Dev1, Dev2, ..., Dev16
- Test: Test1, Test2
- Acceptance: Acc1, Acc2, Acc3
- Production: Prod,
- Production-Clones: HardwareAnalysis, Bugfixing, BusinessIntelligence, ...

In the traditional setup, the pipeline may look very simple:

Dev -> Test -> Acc -> Production

In our the scenario, the pipeline may look like this:

Dev1 -> Test2 -> Dev5+Dev8+Dev14 -> Test1 -> Acc1+Acc2+Acc3 -> Prod + HA + Bug + BI

## Implementation

The react-flow-chart is encapuslated, and accessed with a usePipeline hook.

Business relevant information is passed onto the redux-store and is accessible from the application with the useSelector hooks.

When adding a new pipeline in the interface, a basic skeleton is generated in the redux-store. This skeleton is used by dedicated generators to create a react-flow-chart JSON.

Custom callbacks are used providing relevant synchronization.
