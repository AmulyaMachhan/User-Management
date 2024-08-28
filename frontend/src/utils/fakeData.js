import { faker } from "@faker-js/faker";

const generateUser = () => {
  const teams = ["Design", "Product", "Marketing", "Support"];

  const selectedTeams = faker.helpers.arrayElements(
    teams,
    faker.number.int({ min: 1, max: teams.length })
  );

  const sortedTeams = selectedTeams.sort((a, b) => {
    return teams.indexOf(a) - teams.indexOf(b);
  });

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    dob: faker.date.birthdate({ min: 18, max: 65 }).toISOString().split("T")[0], // Date of Birth as YYYY-MM-DD
    gender: faker.person.sex(),
    nationality: faker.location.country(),
    contactNo: faker.phone.number(),
    email: faker.internet.email(),
    workEmailAddress: faker.internet.email(),
    status: faker.datatype.boolean(),
    profileImage: faker.image.urlPicsumPhotos(),
    role: faker.helpers.arrayElement([
      "Product Designer",
      "Product Developer",
      "Frontend Engineer",
      "Backend Engineer",
    ]),
    teams: sortedTeams,
  };
};

// Generate an array of users
const generateUsers = (numUsers) => {
  return Array.from({ length: numUsers }, generateUser);
};
export { generateUsers };
