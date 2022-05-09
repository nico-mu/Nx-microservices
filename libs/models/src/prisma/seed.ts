import { PrismaClient, Role } from '@prisma/client';
import * as bycrpt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const salt = await bycrpt.genSalt();
  const alicePw = await bycrpt.hash('alice', salt);
  const alice = await prisma.user.upsert({
    where: {
      email: 'alice@mail.com',
    },
    update: {},
    create: {
      email: 'alice@mail.com',
      username: 'alice',
      password: alicePw,
      posts: {
        create: {
          title: 'Hello World!',
        },
      },
    },
  });

  const bobPw = await bycrpt.hash('bob', salt);
  const bob = await prisma.user.upsert({
    where: { email: 'bob@mail.com' },
    update: {},
    create: {
      email: 'bob@mail.com',
      username: 'bob',
      password: bobPw,
      posts: {
        create: [
          {
            title: 'Nico is swagged out',
          },
          {
            title: ';))))',
          },
        ],
      },
    },
  });

  const nicoPw = await bycrpt.hash('nico', salt);
  const nico = await prisma.user.upsert({
    where: {
      email: 'nico@mail.com',
    },
    update: {},
    create: {
      email: 'nico@mail.com',
      username: 'nico',
      password: nicoPw,
      role: Role.ADMIN,
    },
  });

  const adminPw = await bycrpt.hash('admin', salt);
  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@admin.com',
    },
    update: {},
    create: {
      email: 'admin@admin.com',
      username: 'admin',
      password: adminPw,
      role: Role.ADMIN,
    },
  });

  console.log({ alice, bob, nico, admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
