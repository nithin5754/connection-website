import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

function genderFunc() {
  const sexArray = ["male", "female"];
  const number = Math.random();
  const sex = number > 0.5 ? sexArray[0] : sexArray[1];

  return sex;
}

function getRandomAge(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateFirstNameWithLength(minLength, maxLength,sex) {
  let firstName = "";
  do {
    firstName = faker.name.firstName(sex);
  } while (firstName.length < minLength || firstName.length > maxLength);
  return firstName;
}

export async function fakerProfiles() {
  const profiles = [];

  for (let i = 0; i < 100; i++) {
    const sex = genderFunc();

    const firstName = generateFirstNameWithLength(4, 50,sex);

    const lastName = faker.person.lastName(sex);
    const emailId = faker.internet.email({ firstName });
    const passwordHash = 'Nithin@12345';
    const age = getRandomAge(20, 55);
    const photoUrl =faker.image.url()
    const gender = sex;

    profiles.push({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      photoUrl
    });
  }

  return profiles;
}
