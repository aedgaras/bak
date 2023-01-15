import { z } from 'zod';

// Schemas

const baseDto = z.object({
    id: z.number().positive(),
});

export const organizationSchema = baseDto.extend({ name: z.string().min(4) });

export const userSchema = baseDto.extend({});

// Types

export type BaseDto = z.infer<typeof baseDto>;

export type OrganizationDto = z.infer<typeof organizationSchema>;
