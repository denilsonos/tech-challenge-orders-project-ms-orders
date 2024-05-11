import { FastifyReply, FastifyRequest } from "fastify";

export interface AuthorizationServiceAdapter {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<boolean>;
}