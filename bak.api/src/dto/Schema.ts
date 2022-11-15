import { z, ZodError } from 'zod';

/**
 * Custom errors.
 */

const isRequired = (param: string) => `${param} is required.`;
const isNotValid = (param: string) => `${param} is not valid.`;
const mustBeLong = (param: string, length: number) =>
    `${param} must be ${length} characters long.`;

/**
 * Parameters
 */

const usenameParam = z
    .string({ required_error: isRequired('Username') })
    .min(4, mustBeLong('Username', 4));

const emailParam = z.string().email(isNotValid('Email')).optional();

const passwordParam = z
    .string({ required_error: isRequired('Password') })
    .min(4, mustBeLong('Password', 4));

const entityIdParam = z.number({ required_error: isRequired('Id') }).positive();

/**
 * Schemas
 */

export const userLoginFormSchema = z.object({
    username: usenameParam,
    password: passwordParam,
});

export const userDataSchema = z.object({
    username: usenameParam,
    email: emailParam,
    password: passwordParam,
    name: z.string().optional(),
    lastname: z.string().optional(),
});

export const changePasswordFormSchema = z.object({
    userId: entityIdParam,
    password: passwordParam,
});

export const deleteFormSchema = z.object({
    id: entityIdParam,
});

/**
 * Schema object parser.
 * @param schema Schema definition.
 * @param objToValidate Object that will be validated.
 * @returns Errors if there are any.
 */

export async function parseSchema<T extends z.AnyZodObject>(
    schema: T,
    objToValidate: any
) {
    try {
        await schema.parseAsync(objToValidate);
    } catch (e: any) {
        if (e instanceof ZodError) {
            let err: { field: string; error: string }[] = [];
            for (let index = 0; index < e.errors.length; index++) {
                err.push({
                    field: e.errors[index].path[0].toString(),
                    error: e.errors[index].message,
                });
            }

            return err;
        }
    }
}
