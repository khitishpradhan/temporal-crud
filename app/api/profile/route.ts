import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth0 } from '@/lib/auth0';
import { Client, Connection } from '@temporalio/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const session = await auth0.getSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } });
    return NextResponse.json(dbUser);
}

export async function POST(req: NextRequest) {
    const session = await auth0.getSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();

    // Save to database immediately
    const dbUser = await prisma.user.upsert({
        where: { email: session.user.email },
        update: data,
        create: {
            email: session.user.email,
            name: session.user.name,
            picture: session.user.picture,
            ...data,
        },
    });

    // Start Temporal workflow
    try {
        const connection = await Connection.connect({
            address: '127.0.0.1:7233', // Use IPv4 explicitly
        });

        const client = new Client({
            connection,
        });

        const workflowId = `profile-update-${session.user.email}-${Date.now()}`;

        await client.workflow.start('profileUpdateWorkflow', {
            taskQueue: 'profile-updates',
            workflowId,
            args: [dbUser],
        });

        console.log(`Started Temporal workflow: ${workflowId}`);
    } catch (error) {
        console.error('Failed to start Temporal workflow:', error);
        // Don't fail the request if Temporal is down
    }

    return NextResponse.json(dbUser);
}

export async function DELETE(req: NextRequest) {
    const session = await auth0.getSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await prisma.user.delete({ where: { email: session.user.email } });
    return NextResponse.json({ success: true });
}
