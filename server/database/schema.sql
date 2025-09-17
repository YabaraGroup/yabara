-- ========================
-- COMING SOON
-- ========================
CREATE TABLE comingsoon (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- ========================
-- COMPANY SECTOR
-- ========================
CREATE TABLE company_sector (
    id_sector INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================
-- COMPANY
-- ========================
CREATE TABLE company (
    id_company INT AUTO_INCREMENT PRIMARY KEY,
    siren_number VARCHAR(20) NOT NULL UNIQUE,
    siret_number VARCHAR(20) NOT NULL UNIQUE,
    headcount INT,
    logo_url VARCHAR(255),
    founded_year YEAR,
    address VARCHAR(255),
    website_url VARCHAR(255),
    id_sector INT NOT NULL,
    CONSTRAINT fk_company_sector FOREIGN KEY (id_sector) REFERENCES company_sector(id_sector)
);

-- ========================
-- COMPANY CONTACT
-- ========================
CREATE TABLE company_contact (
    id_contact INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    id_company INT NOT NULL,
    CONSTRAINT fk_company_contact_company FOREIGN KEY (id_company) REFERENCES company(id_company)
);

-- ========================
-- JOB FAMILY
-- ========================
CREATE TABLE job_family (
    id_job_family INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================
-- JOB OFFER
-- ========================
CREATE TABLE job_offer (
    id_offer INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    contract_type VARCHAR(50),
    required_degree VARCHAR(100),
    required_experience VARCHAR(100),
    salary DECIMAL(10,2),
    location VARCHAR(150),
    deadline DATE,
    reference_number VARCHAR(50) NOT NULL UNIQUE,
    id_company INT NOT NULL,
    id_job_family INT NOT NULL,
    CONSTRAINT fk_job_offer_company FOREIGN KEY (id_company) REFERENCES company(id_company),
    CONSTRAINT fk_job_offer_job_family FOREIGN KEY (id_job_family) REFERENCES job_family(id_job_family)
);

-- ========================
-- TALENT
-- ========================
CREATE TABLE talent (
    id_talent INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    education_level VARCHAR(100),
    avatar_url VARCHAR(255),
    referral_link VARCHAR(255),
    id_job_family INT,
    CONSTRAINT fk_talent_job_family FOREIGN KEY (id_job_family) REFERENCES job_family(id_job_family)
);

-- ========================
-- apply (applies)
-- ========================
CREATE TABLE apply (
    id_talent INT NOT NULL,
    id_offer INT NOT NULL,
    apply_date DATE NOT NULL,
    status VARCHAR(50),
    PRIMARY KEY (id_talent, id_offer),
    CONSTRAINT fk_apply_talent FOREIGN KEY (id_talent) REFERENCES talent(id_talent),
    CONSTRAINT fk_apply_offer FOREIGN KEY (id_offer) REFERENCES job_offer(id_offer)
);

-- ========================
-- EXPERIENCE
-- ========================
CREATE TABLE experience (
    id_experience INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(150),
    position VARCHAR(100),
    start_date DATE,
    end_date DATE,
    description TEXT,
    id_talent INT NOT NULL,
    CONSTRAINT fk_experience_talent FOREIGN KEY (id_talent) REFERENCES talent(id_talent)
);

-- ========================
-- EDUCATION
-- ========================
CREATE TABLE education (
    id_education INT AUTO_INCREMENT PRIMARY KEY,
    school_name VARCHAR(150),
    degree VARCHAR(100),
    start_date DATE,
    end_date DATE,
    description TEXT,
    id_talent INT NOT NULL,
    CONSTRAINT fk_education_talent FOREIGN KEY (id_talent) REFERENCES talent(id_talent)
);

-- ========================
-- SKILL
-- ========================
CREATE TABLE skill (
    id_skill INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================
-- TALENT_SKILL (has_skill)
-- ========================
CREATE TABLE talent_skill (
    id_talent INT NOT NULL,
    id_skill INT NOT NULL,
    PRIMARY KEY (id_talent, id_skill),
    CONSTRAINT fk_talent_skill_talent FOREIGN KEY (id_talent) REFERENCES talent(id_talent),
    CONSTRAINT fk_talent_skill_skill FOREIGN KEY (id_skill) REFERENCES skill(id_skill)
);

-- ========================
-- LANGUAGE
-- ========================
CREATE TABLE language (
    id_language INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================
-- TALENT_LANGUAGE (speaks)
-- ========================
CREATE TABLE talent_language (
    id_talent INT NOT NULL,
    id_language INT NOT NULL,
    proficiency_level VARCHAR(50),
    PRIMARY KEY (id_talent, id_language),
    CONSTRAINT fk_talent_language_talent FOREIGN KEY (id_talent) REFERENCES talent(id_talent),
    CONSTRAINT fk_talent_language_language FOREIGN KEY (id_language) REFERENCES language(id_language)
);
