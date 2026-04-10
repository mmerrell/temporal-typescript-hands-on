// starter.ts - connects to Temporal and kicks off a workflow execution

import { Client, Connection } from '@temporalio/client';
import { rfiWorkflow } from './workflow';
import { RFIRequest } from './types';

async function run() {
  const connection = await Connection.connect({ address: 'localhost:7233' });
  const client = new Client({ connection });

  const request: RFIRequest = {
    rfiId: 'RFI-1002',
    projectId: 'PROJ-DOWNTOWN-42',
    submittedBy: 'alex.chen@procore.com',
    description: 'Clarification needed on load-bearing wall specifications for level 3',
  };

  const handle = await client.workflow.start(rfiWorkflow, {
    taskQueue: 'rfi-task-queue',
    workflowId: `rfi-${request.rfiId}`,
    args: [request],
  });

  console.log(`Started workflow: ${handle.workflowId}`);
  const result = await handle.result();
  console.log('RFI result:', JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
