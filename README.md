# Deployment Pipeline

This is a basic implementation of [React Flow Chart](https://github.com/MrBlenny/react-flow-chart)

## What this solution does

It allows sysadmins to manage deployment pipelines with a graphical interface, and also allows to alter attributes of the respective servers.

Some additional benefits:

- the ability to visualize which version of an application is deployed currently in each environment

- alteration of environment variables

- (optional) self-service solution

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

Let's assume one of the product owners wishes to add a new acceptance server for his department. The operations team now must reconfigure all the scripts related to the pipeline to add the new server. A simple, but tedious task.

## Implementation

The react-flow-chart is encapuslated, and accessed with a usePipeline hook.

Business relevant information is passed onto the redux-store and is accessible from the application with the useSelector hooks.

When adding a new pipeline in the interface, a basic skeleton is generated in the redux-store. This skeleton is used by dedicated generators to create a react-flow-chart JSON.

Custom callbacks are used providing relevant synchronization.

## Usage

The assumption is that each user has access to different environments with different configurations, but can have multiple pipelines. (typically 1-3)

Before starting, make sure to either set up a REST server, or use a fake JSON server to provide the relevant REST endpoints.

[JSON Server](https://github.com/typicode/json-server)

A dummy file can be found in the ./src/utils/fakeRestServer.json

```bash
json-server --watch ./src/utils/fakeJsonServer.json
```

## Handling

To create nodes, drag and drop them on the canvas.

To delete nodes or links, select them and press 'Delete' on your keyboard.

To view the properties of a node, select it, and a menu will appear on the right. You may alter the attributes here.

When you are done, you may press 'Save' to submit the changes to the server.
