import prismaClient from 'src/main/prisma';

class DetailUserService {
  async execute() {
    return { ok: true };
  }
}

export { DetailUserService };
