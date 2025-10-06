import databaseClient from '../../database/client';
import type { User } from '../types/UserInterface';

class AuthRepository {
  private db = databaseClient;
  private tableNameTalent = 'talent';
  private tableNameCompany = 'company';

  async createUser(userData: User): Promise<number> {
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        phone,
        idUnique,
        education_level,
        avatar_url,
        referral_link,
        id_job_family,
      } = userData;

      const [rows]: any = await this.db.query(
        `INSERT INTO ${this.tableNameTalent} (firstname, lastname, email, password, phone, identification, education_level, avatar_url, referral_link, id_job_family, id_role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          firstname,
          lastname,
          email,
          password,
          phone,
          idUnique,
          education_level,
          avatar_url,
          referral_link,
          id_job_family,
          1,
        ],
      );

      return rows.insertId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('ER_DUP_ENTRY');
    }
  }

  async readUserByEmail(email: string): Promise<User | null> {
    try {
      const [rows]: any = await this.db.query(
        `SELECT * FROM ${this.tableNameTalent} WHERE email = ?`,
        [email],
      );
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error('Error reading user by email:', error);
      throw new Error('DATABASE_QUERY_ERROR');
    }
  }

  async createCompany(companyData: any): Promise<number> {
    try {
      // Logic to insert company data into the database
      const [rows]: any = await this.db.query(
        `INSERT INTO ${this.tableNameCompany} (name, siren_number, siret_number, id_sector, id_role) VALUES (?, ?, ?, ?, ?)`,
        [
          companyData.name,
          companyData.siret,
          companyData.siret,
          companyData.pole,
          2, // id role for company
        ],
      );
      return rows.insertId;
    } catch (error) {
      console.error('Error creating company:', error);
      throw new Error('ER_DUP_ENTRY');
    }
  }

  async createCompanyUser(userData: any): Promise<number> {
    try {
      // Logic to insert company user data into the database
      const [rows]: any = await this.db.query(
        `INSERT INTO ${this.tableNameCompany}_contact (firstname, lastname, email, password, phone, id_company) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userData.firstname,
          userData.lastname,
          userData.email,
          userData.password,
          userData.phone,
          userData.id_company,
        ],
      );
      return rows.insertId;
    } catch (error) {
      console.error('Error creating company user:', error);
      throw new Error('ER_DUP_ENTRY');
    }
  }

  async updateUser(userData: Partial<User>): Promise<User | null> {
    try {
      const allowedFields = [
        'firstname',
        'lastname',
        'phone',
        'education_level',
        'avatar_url',
        'referral_link',
        'id_job_family',
      ];

      const updates: string[] = [];
      const values: any[] = [];

      for (const key of allowedFields) {
        const value = userData[key as keyof User];
        if (value !== undefined) {
          updates.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (updates.length === 0) {
        console.warn('Aucun champ à mettre à jour');
        return null;
      }

      // Ajoute l'ID à la fin pour le WHERE
      values.push(userData.id);

      const sql = `UPDATE ${this.tableNameTalent} SET ${updates.join(', ')} WHERE id = ?`;

      const [result]: any = await this.db.query(sql, values);

      if (result.affectedRows === 0) {
        console.warn(`Aucun utilisateur trouvé avec l'id ${userData.id}`);
        return null;
      }

      // 🔁 Récupère et renvoie le user mis à jour
      const [updatedUser]: any = await this.db.query(
        `SELECT id, firstname, lastname, email, phone, education_level, avatar_url, referral_link, id_job_family, identification 
       FROM ${this.tableNameTalent} 
       WHERE id = ?`,
        [userData.id],
      );

      return updatedUser[0] || null;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('DATABASE_UPDATE_ERROR');
    }
  }
}

export default new AuthRepository();
