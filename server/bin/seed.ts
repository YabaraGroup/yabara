import 'dotenv/config';
import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';
import argon2 from 'argon2';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function seed() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT as number | undefined,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    multipleStatements: true,
  });

  console.log('🌱 Seeding database...');

  // --- Helper functions ---
  const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

  // --- Constants ---
  const NUM_COMPANIES = 10;
  const NUM_CONTACTS = 10;
  const NUM_OFFERS = 10;
  const NUM_TALENTS = 10;

  // --- Fetch IDs from static tables ---
  const [roles] = await connection.query('SELECT id, name FROM role');
  const [sectors] = await connection.query('SELECT id FROM company_sector');
  const [jobFamilies] = await connection.query('SELECT id FROM job_family');

  const roleUser = (roles as any[]).find(r => r.name === 'user')?.id;
  const roleCompany = (roles as any[]).find(r => r.name === 'company')?.id;

  if (!roleUser || !roleCompany) {
    console.error('❌ Missing role IDs. Make sure roles are seeded first.');
    process.exit(1);
  }

  // --- COMPANY ---
  console.log('🏢 Inserting companies...');
  const companyIds: number[] = [];
  for (let i = 0; i < NUM_COMPANIES; i++) {
    const name = faker.company.name();
    const rccm = faker.string.alphanumeric({ length: 8 }).toUpperCase();
    const headcount = faker.number.int({ min: 5, max: 500 });
    const logo = faker.image.url();
    const year = faker.number.int({ min: 1980, max: 2024 });
    const address = faker.location.streetAddress();
    const website = faker.internet.url();
    const id_sector = getRandom(sectors as any[]).id;
    const id_role = roleCompany;

    const [result]: any = await connection.query(
      `INSERT INTO company (name, rccm_number, headcount, logo_url, founded_year, address, website_url, id_sector, id_role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, rccm, headcount, logo, year, address, website, id_sector, id_role],
    );
    companyIds.push(result.insertId);
  }

  // --- COMPANY CONTACT ---
  console.log('👤 Inserting company contacts...');
  const contactIds: number[] = [];
  for (let i = 0; i < NUM_CONTACTS; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = faker.internet.email({ firstName: firstname, lastName: lastname });
    const phone = faker.phone.number({ style: 'international' });
    const id_company = getRandom(companyIds);

    const [result]: any = await connection.query(
      `INSERT INTO company_contact (firstname, lastname, email, password, phone, id_company)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        email,
        await argon2.hash('Azerty.123'), // Default password
        phone,
        id_company,
      ],
    );
    contactIds.push(result.insertId);
  }

  // --- JOB OFFER ---
  console.log('💼 Inserting job offers...');
  for (let i = 0; i < NUM_OFFERS; i++) {
    const title = faker.person.jobTitle();
    const description = faker.lorem.paragraphs(2);
    const time_commitment = getRandom(['fullTime', 'partTime']);
    const contract_type = getRandom(['CDI', 'CDD', 'Stage', 'Alternance', 'Freelance']);
    const delay_contract = faker.number.int({ min: 1, max: 60 }) + ' mois';
    const salary_min = faker.number.int({ min: 500, max: 1500 });
    const salary_max = salary_min + faker.number.int({ min: 200, max: 1000 });
    const recurring_salary = getRandom(['mois', 'an']);
    const location = faker.location.city();
    const reference = faker.string.alphanumeric({ length: 10 }).toUpperCase();
    const id_company = getRandom(companyIds);

    await connection.query(
      `INSERT INTO job_offer (title, description, time_commitment, contract_type, delay_contract, salary_min, salary_max, recurring_salary, location, reference_number, id_company)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        time_commitment,
        contract_type,
        delay_contract,
        salary_min,
        salary_max,
        recurring_salary,
        location,
        reference,
        id_company,
      ],
    );
  }

  // --- TALENT ---
  console.log('🧑‍🎓 Inserting talents...');
  const talentIds: number[] = [];
  for (let i = 0; i < NUM_TALENTS; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = faker.internet.email({ firstName: firstname, lastName: lastname });
    const phone = faker.phone.number({ style: 'international' });
    const identification = faker.string.alphanumeric({ length: 10 }).toUpperCase();
    const education_level = getRandom(['Licence', 'Master', 'Doctorat', 'Bac', 'Autre']);
    const avatar_url = faker.image.avatar();
    const referral_link = faker.internet.url();
    const id_job_family = getRandom(jobFamilies as any[]).id;
    const id_role = roleUser;

    const [result]: any = await connection.query(
      `INSERT INTO talent (firstname, lastname, email, password, phone, identification, education_level, avatar_url, referral_link, id_job_family, id_role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstname,
        lastname,
        email,
        await argon2.hash('Azerty.123'), // Default password
        phone,
        identification,
        education_level,
        avatar_url,
        referral_link,
        id_job_family,
        id_role,
      ],
    );
    talentIds.push(result.insertId);
  }

  // --- TEST ACCOUNTS ---
  console.log('🧩 Inserting test accounts...');

  // Company + Contact
  const [companyResult]: any = await connection.query(
    `INSERT INTO company (name, rccm_number, headcount, logo_url, founded_year, address, website_url, id_sector, id_role)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'Yabara Company Test',
      'YAB12345',
      50,
      'https://placehold.co/200x200',
      2020,
      '123 Rue du Code, Paris',
      'https://yabara.co',
      3,
      roleCompany,
    ],
  );
  const companyId = companyResult.insertId;

  await connection.query(
    `INSERT INTO company_contact (firstname, lastname, email, password, phone, id_company)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      'John',
      'Manager',
      'company@yabara.co',
      await argon2.hash('company123'),
      '+33123456789',
      companyId,
    ],
  );

  // --- 10 Job Offers for Yabara Company Test ---
  console.log('💼 Inserting 10 job offers for Yabara Company Test...');
  for (let i = 0; i < 10; i++) {
    await connection.query(
      `INSERT INTO job_offer (title, description, time_commitment, contract_type, delay_contract, salary_min, salary_max, recurring_salary, location, reference_number, id_company)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        faker.person.jobTitle(),
        faker.lorem.paragraphs(2),
        getRandom(['fullTime', 'partTime']),
        getRandom(['CDI', 'CDD', 'Stage', 'Alternance', 'Freelance']),
        faker.number.int({ min: 1, max: 60 }) + ' mois',
        faker.number.int({ min: 1000, max: 2000 }),
        faker.number.int({ min: 2000, max: 4000 }),
        getRandom(['mois', 'an']),
        faker.location.city(),
        'YAB-OFF-' + faker.string.alphanumeric({ length: 6 }).toUpperCase(),
        companyId,
      ],
    );
  }

  // Talent test
  await connection.query(
    `INSERT INTO talent (firstname, lastname, email, password, phone, identification, education_level, avatar_url, referral_link, id_job_family, id_role)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'Anthony',
      'Talent',
      'talent@yabara.co',
      await argon2.hash('talent123'),
      '+33698765432',
      'TAL12345',
      'Master',
      'https://placehold.co/200x200',
      'https://yabara.co',
      getRandom(jobFamilies as any[]).id,
      1,
    ],
  );

  // Admin test
  await connection.query(
    `INSERT INTO talent (firstname, lastname, email, password, phone, identification, education_level, avatar_url, referral_link, id_job_family, id_role)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'Admin',
      'Yabara',
      'admin@yabara.co',
      await argon2.hash('admin123'),
      '+33111222333',
      'ADM001',
      'N/A',
      'https://placehold.co/200x200',
      'https://yabara.co/admin',
      getRandom(jobFamilies as any[]).id,
      1,
    ],
  );

  console.log('✅ Done seeding database.');
  await connection.end();
}

seed().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
