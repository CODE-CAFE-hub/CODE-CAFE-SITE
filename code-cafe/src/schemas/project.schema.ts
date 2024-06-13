import { z } from 'zod';

export const ProjectSchema = z.object({
    name: z.string().min(3).max(50), // Adjust max length as needed
    description: z.string().min(3).max(500), // Adjust max length as needed
    ownerId: z.string(), // Example of adding an owner field
    createdAt: z.date().optional(), // Example of adding a creation date field
    status: z.enum(['active', 'inactive']).optional(), // Example of adding a status field with specific values
});
