import { proxyActivities } from '@temporalio/workflow';

const { updateCrudCrud } = proxyActivities<{
    updateCrudCrud(profile: any): Promise<void>;
}>({
    startToCloseTimeout: '60 seconds',
});

export async function profileUpdateWorkflow(profile: any) {
    // Wait 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Only call crudcrud.com (profile is already saved in Next.js API)
    console.log('Starting crudcrud activity...');
    await updateCrudCrud(profile);
    console.log('Crudcrud activity completed');
} 