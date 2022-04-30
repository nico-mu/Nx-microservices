import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: {
      email: 'alice@mail.com',
    },
    update: {},
    create: {
      email: 'alice@mail.com',
      name: 'Alice',
      password_hash: "alice's password",
      posts: {
        create: {
          title: 'Hello World!',
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@mail.com' },
    update: {},
    create: {
      email: 'bob@mail.com',
      name: 'Bob',
      password_hash: "bob's password",
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

  const nico = await prisma.user.upsert({
    where: {
      email: 'nico@mail.com',
    },
    update: {},
    create: {
      email: 'nico@mail.com',
      name: 'Nico',
      password_hash: 'wadawubfdawf1234$$%\\//',
      role: Role.ADMIN,
    },
  });

  console.log({ alice, bob, nico });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
