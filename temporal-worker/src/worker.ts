import { Worker } from '@temporalio/worker';
import * as activities from './activities';
import { fileURLToPath } from 'url';
import path from 'path';

async function run() {
    const workflowsPath = fileURLToPath(new URL('./workflows.ts', import.meta.url));
    const worker = await Worker.create({
        workflowsPath,
        activities,
        taskQueue: 'profile-updates',
    });
    await worker.run();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
}); 