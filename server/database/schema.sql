-- ========================
-- COMING SOON
-- ========================
CREATE TABLE comingsoon (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- ========================
-- ROLE
-- ========================
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- ========================
-- COMPANY SECTOR
-- ========================
CREATE TABLE company_sector (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================
-- COMPANY
-- ========================
CREATE TABLE company (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  rccm_number VARCHAR(20) NOT NULL UNIQUE,
  headcount INT,
  logo_url VARCHAR(255),
  founded_year YEAR,
  address VARCHAR(255),
  website_url VARCHAR(255),
  id_sector INT NOT NULL,
  id_role INT NOT NULL,
  CONSTRAINT fk_company_sector FOREIGN KEY (id_sector) REFERENCES company_sector(id),
  CONSTRAINT fk_company_role FOREIGN KEY (id_role) REFERENCES role(id)
);

-- ========================
-- COMPANY CONTACT
-- ========================
CREATE TABLE company_contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  id_company INT NOT NULL,
  CONSTRAINT fk_company_contact_company FOREIGN KEY (id_company) REFERENCES company(id)
);

-- ========================
-- JOB FAMILY
-- ========================
CREATE TABLE job_family (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  id_sector INT NOT NULL,
  CONSTRAINT fk_job_family_sector FOREIGN KEY (id_sector) REFERENCES company_sector(id)
);

-- ========================
-- JOB OFFER
-- ========================
CREATE TABLE job_offer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  time_commitment VARCHAR(50),
  contract_type VARCHAR(50),
  delay_contract VARCHAR(50),
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  recurring_salary VARCHAR(50),
  location VARCHAR(150),
  reference_number VARCHAR(50) NOT NULL UNIQUE,
  id_company INT NOT NULL,
  CONSTRAINT fk_job_offer_company FOREIGN KEY (id_company) REFERENCES company(id)
);

-- ========================
-- TALENT
-- ========================
CREATE TABLE talent (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  identification VARCHAR(25) UNIQUE,
  education_level VARCHAR(100),
  avatar_url VARCHAR(255),
  referral_link VARCHAR(255),
  id_job_family INT,
  id_role INT NOT NULL,
  CONSTRAINT fk_talent_job_family FOREIGN KEY (id_job_family) REFERENCES job_family(id),
  CONSTRAINT fk_talent_role FOREIGN KEY (id_role) REFERENCES role(id)
);

CREATE TABLE permission (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE role_permission (
  id_role INT NOT NULL,
  id_permission INT NOT NULL,
  PRIMARY KEY (id_role, id_permission),
  CONSTRAINT fk_rp_role FOREIGN KEY (id_role) REFERENCES role(id),
  CONSTRAINT fk_rp_permission FOREIGN KEY (id_permission) REFERENCES permission(id)
);


ALTER TABLE company
  ADD CONSTRAINT chk_company_role CHECK (id_role IN (2)); -- 2 = "company"

ALTER TABLE talent
  ADD CONSTRAINT chk_talent_role CHECK (id_role IN (1)); -- 1 = "user"


-- ========================
-- APPLY
-- ========================
CREATE TABLE apply (
  id_talent INT NOT NULL,
  id_offer INT NOT NULL,
  apply_date DATE NOT NULL,
  status VARCHAR(50),
  PRIMARY KEY (id_talent, id_offer),
  CONSTRAINT fk_apply_talent FOREIGN KEY (id_talent) REFERENCES talent(id),
  CONSTRAINT fk_apply_offer FOREIGN KEY (id_offer) REFERENCES job_offer(id)
);

-- ========================
-- EXPERIENCE
-- ========================
CREATE TABLE experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(150),
  position VARCHAR(100),
  start_date DATE,
  end_date DATE,
  description TEXT,
  id_talent INT NOT NULL,
  CONSTRAINT fk_experience_talent FOREIGN KEY (id_talent) REFERENCES talent(id)
);

-- ========================
-- EDUCATION
-- ========================
CREATE TABLE education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  school_name VARCHAR(150),
  degree VARCHAR(100),
  start_date DATE,
  end_date DATE,
  description TEXT,
  id_talent INT NOT NULL,
  CONSTRAINT fk_education_talent FOREIGN KEY (id_talent) REFERENCES talent(id)
);

-- ========================
-- SKILL
-- ========================
CREATE TABLE skill (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================
-- TALENT_SKILL
-- ========================
CREATE TABLE talent_skill (
  id_talent INT NOT NULL,
  id_skill INT NOT NULL,
  PRIMARY KEY (id_talent, id_skill),
  CONSTRAINT fk_talent_skill_talent FOREIGN KEY (id_talent) REFERENCES talent(id),
  CONSTRAINT fk_talent_skill_skill FOREIGN KEY (id_skill) REFERENCES skill(id)
);

-- ========================
-- LANGUAGE
-- ========================
CREATE TABLE language (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================
-- TALENT_LANGUAGE
-- ========================
CREATE TABLE talent_language (
  id_talent INT NOT NULL,
  id_language INT NOT NULL,
  proficiency_level VARCHAR(50),
  PRIMARY KEY (id_talent, id_language),
  CONSTRAINT fk_talent_language_talent FOREIGN KEY (id_talent) REFERENCES talent(id),
  CONSTRAINT fk_talent_language_language FOREIGN KEY (id_language) REFERENCES language(id)
);

-- ========================
-- SEEDING
-- ========================
-- Company sectors
INSERT INTO company_sector (name) VALUES
('PÔLE 1 - TERTIAIRE (Services & Fonctions support)'),
('PÔLE 2 - SECONDAIRE (Industrie, Construction & Production)'),
('PÔLE 3 - NUMÉRIQUE & INNOVATION'),
('PÔLE 4 - COMMERCIAL & RELATION CLIENT'),
('PÔLE 5 - MÉTIERS PRATIQUES & ÉCONOMIE INFORMELLE'),
('PÔLE 6 - MARKETING');

-- Job families
INSERT INTO job_family (name, id_sector) VALUES
-- Pôle 1
('Administratif, Droit & Juridique', 1),
('Finance, Comptabilité & Gestion', 1),
('Ressources Humaines', 1),
('Conseil aux Entreprises', 1),
('Banque & Assurance', 1),
('Enseignement & Éducation', 1),
('Santé & Médical', 1),
('Fonction Publique & Administration Territoriale', 1),
('Travail Social & Développement Communautaire', 1),

-- Pôle 2
('Industrie & Énergie (Minière, Pétrolière, Gazière)', 2),
('Bâtiment, Travaux Publics, Architecture & Construction', 2),
('Logistique, Transport & Mobilité', 2),
('Environnement, Sécurité & Qualité (HSE)', 2),
('Agriculture & Agroalimentaire', 2),

-- Pôle 3
('Digital, Télécommunications & Métiers du Numérique', 3),
('Informatique, IT & R&D', 3),
('Audiovisuel, Médias & Communication Digitale', 3),
('Jeux Vidéo, Animation & Design 3D', 3),

-- Pôle 4
('Marketing & Communication', 4),
('Commerces & Ventes', 4),
('Immobilier', 4),

-- Pôle 5
('Artisanat & Métiers Manuels (plomberie, couture, menuiserie, mécanique, etc.)', 5),
('Sécurité & Gardiennage', 5),
('Bien-être, Sport & Esthétique (coiffure, esthétique, fitness, spa, etc.)', 5),
('Tourisme & Hôtellerie', 5),
('Arts, Culture & Patrimoine', 5),

-- Pôle 6
('Communication & Publicité', 6),
('Études de Marché & Analyse de Données', 6),
('Relations Publiques & Événementiel', 6),
('Digital Marketing & SEO', 6),
('SEO & SEA', 6);



-- Roles
INSERT INTO role (name) VALUES
('user'),
('company'),
('admin'),
('superadmin');
