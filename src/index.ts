import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  email: string
) {
  const res = await prisma.user.create({
    data: {
      username,
      password,
      firstname,
      lastname,
      email,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
    },
  });
  console.log(res);
}

insertUser(
  "sammy2",
  "Newpassword1",
  "Muhammad",
  "Shariq",
  "shariq45565@gmail.com"
);

interface UpdateParams {
  firstName: string;
  lastName: string;
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdateParams
) {
  return await prisma.user.update({
    where: { username },
    data: {
      firstname: firstName,
      lastname: lastName,
    },
  });
}

updateUser("sammy", {
  firstName: "Md",
  lastName: "Aarib",
})
  .then(() => {
    console.log("Updated");
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  })
  .finally(() => {
    prisma.$disconnect();
  });
