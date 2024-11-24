import Test from '@/models/Test';
import { connectDB } from '@/app/database';

export const GET = async (request: any, { params }: any) => {
  try {
    await connectDB();
    const { id } = params; // Extract the task ID from the URL params
    const task = await Test.findById(id);
    if (!task) {
      return new Response('Task not found', { status: 404 });
    }
    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.error('Error fetching task:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};