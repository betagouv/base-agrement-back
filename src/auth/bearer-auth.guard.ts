import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

/**
 * Authentification par secret (compte technique).
 *
 * Les utilisateurs (PMI) s'identifient via leur secret dans l'en-tête :
 *   Authorization: Bearer 3f93d0b9-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 *
 * Le secret est attaché à la requête (`req.userToken`) pour permettre, en aval,
 * de rattacher le dépôt à l'utilisateur et d'envoyer le rapport par mail.
 *
 * TODO : valider le secret contre la table des comptes techniques.
 * Cette table n'existe pas encore dans le schéma Prisma ; pour l'instant on ne
 * vérifie que la présence et le format du jeton.
 */
@Injectable()
export class BearerAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const header = request.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'En-tête Authorization manquant ou invalide (attendu : Bearer <secret>).',
      );
    }

    const token = header.slice('Bearer '.length).trim();
    if (!token) {
      throw new UnauthorizedException('Secret manquant.');
    }

    (request as Request & { userToken?: string }).userToken = token;
    return true;
  }
}
