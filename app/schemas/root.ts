

import { Type, Static } from "@sinclair/typebox";

export const BadRequestSchema = Type.Object({
	success: Type.Boolean(),
	message: Type.String(),
	code: Type.Number(),
	details: Type.Optional(Type.Any()),
});


export const ResponseSchema = Type.Object({
	success: Type.Boolean(),
	message: Type.String(),
	code: Type.Number(),
	data: Type.Optional(Type.Any()),
});


export type BadRequestType = Static<typeof BadRequestSchema>;
export type ResponseType = Static<typeof ResponseSchema>;


