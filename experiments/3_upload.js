import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient({ log: ['query'] });


async function main() {
  const users = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
  for (const { id, address, company, ...user } of users) {
    delete address.geo;
    // const updateOrCreate = {
    //   ...user,
    //   companyId: {
    //     connectOrCreate: {
    //       where: { company },
    //       create: { company }
    //     }
    //   }
    // };

    const res = await prisma.user.upsert({
      where: { id },
      update: {
        ...user,
        company: {
          upsert: {
            create: { ...company },
            update: { ...company }
          }
        },
        address: {
          upsert: {
            create: { ...address },
            update: { ...address }
          },
        },
      },
      create: {
        id, ...user,
        company: {
          create: { ...company }
        },
        address: {
          create: { ...address }
        }
      },
      include: { company: true, address: true }
    });
    // console.log(res);
  }

  // console.log(res);
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })