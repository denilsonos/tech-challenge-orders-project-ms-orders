import { FastifyReply, FastifyRequest } from "fastify";
import { AuthorizationServiceAdapter } from "../../adapters/external-services/authorization-service/authorization-service-adapter";
import axios from "axios";

export class AuthorizationService implements AuthorizationServiceAdapter {

    public async authenticate(request: FastifyRequest, reply: FastifyReply): Promise<any> {
        
        const token = request.headers['authorization'];
        if (!token) {
            return reply.status(400).send({ message: "Authorization is required!"})
        }

        await axios.post(`${process.env.AWS_URL_COGNITO}`, { accessToken: token })
        .then((res) => {
            console.log('Authentication Response status: ', res.status);
        })
        .catch((_error) => {
            return reply.status(401).send({ message: "Unauthorized access!"})
        })
    }
}