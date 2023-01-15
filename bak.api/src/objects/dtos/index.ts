import { z } from 'zod';

// Schemas

const baseDto = z.object({
    id: z.number().positive(),
});

export const organizationSchema = baseDto.extend({ name: z.string().min(4) });

export const userSchema = baseDto.extend({
    username: z.string(),
    role: z.enum(['admin', 'user']),
    name: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().email(),
    avatar: z.string().optional(),
    organizationId: z.number().optional(),
});

// Types

export type BaseDto = z.infer<typeof baseDto>;

export type OrganizationDto = z.infer<typeof organizationSchema>;

export type UserDto = z.infer<typeof userSchema>;
