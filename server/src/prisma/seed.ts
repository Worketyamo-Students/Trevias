import { prisma, AgencyType } from "../config/db";
import { PrismaClient, AgencyType as PrismaAgencyType } from '@prisma/client';

async function main() {
  // Création d'agences (nous allons créer toutes les agences ici)
  const agencies = [
    { name: "Touristique Express", type: PrismaAgencyType.BUS },
    { name: "General Express", type: PrismaAgencyType.BUS },
    { name: "Men Travel", type: PrismaAgencyType.BUS },
    { name: "Camrail", type: PrismaAgencyType.TRAIN },
  ];

  for (const agency of agencies) {
    const existingAgency = await prisma.agency.findFirst({
      where: { name: agency.name },
    });

    if (existingAgency) {
      const a = await prisma.agency.update({
        where: { id: existingAgency.id },
        data: {
            name: agency.name,
            type: agency.type as PrismaAgencyType | undefined,
        },
      });
      console.log(`Agence Mise à jour: ${a.name}`);
    } else {
        const a = await prisma.agency.create({
            data: {
                name: agency.name,
                type: agency.type,
            },
        });
        console.log(`Agence Crée: ${a.name}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
