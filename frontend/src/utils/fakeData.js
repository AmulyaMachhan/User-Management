import { faker } from "@faker-js/faker";

// Function to generate a single user
const generateUser = () => {
  const teams = ["Development", "Design", "Marketing", "Support"];

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
    teams: faker.helpers.arrayElements(
      teams,
      faker.number.int({ min: 1, max: teams.length })
    ),
  };
};

// Generate an array of users
const generateUsers = (numUsers) => {
  return Array.from({ length: numUsers }, generateUser);
};
export { generateUsers };
