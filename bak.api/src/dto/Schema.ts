import { z, ZodError } from 'zod';

const isRequired = (param: string) => `${param} is required.`;
const isNotValid = (param: string) => `${param} is not valid.`;
const mustBeLong = (param: string, length: number) =>
    `${param} must be ${length} characters long.`;

const usenameParam = z
    .string({ required_error: isRequired('Username') })
    .min(4, mustBeLong('Username', 4));

const emailParam = z.string().email(isNotValid('Email')).optional();

const passwordParam = z
    .string({ required_error: isRequired('Password') })
    .min(4, mustBeLong('Password', 4));

export const userDataSchema = z.object({
    username: usenameParam,
    email: emailParam,
    password: passwordParam,
    name: z.string().optional(),
    lastname: z.string().optional(),
});

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
