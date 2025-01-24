import { faker } from "@faker-js/faker";

function genderFunc() {
  const sexArray = ["male", "female"];
  const number = Math.random();
  const sex = number > 0.5 ? sexArray[0] : sexArray[1];

  return sex;
}

function getRandomAge(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function fakerProfiles() {
  const profiles = [];

  for (let i = 0; i < 100; i++) {
    const sex = genderFunc();

    const firstName = faker.person.firstName(sex);

    const lastName = faker.person.lastName(sex);
    const emailId = faker.internet.email({ firstName, lastName });
    const password = faker.internet.password();
    const age = getRandomAge(20, 55);
    const gender = sex;

    profiles.push({
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
    });
  }

  return profiles;
}
