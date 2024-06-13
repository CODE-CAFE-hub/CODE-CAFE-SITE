import { z } from "zod";

export const InquirySchema = z.object({
    userId: z.string().uuid(),
    projectId: z.string().uuid(),
    subject: z.string().min(3).max(100),
    message: z.string().min(10).max(1000),
    status: z.enum(['open', 'closed']),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});
