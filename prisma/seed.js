const prisma = require('../prismaClient');

async function main() {
  await prisma.movie.create({
    data: {
      title: 'Inception',
      description: 'A mind-bending thriller by Christopher Nolan.',
    },
  });

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
