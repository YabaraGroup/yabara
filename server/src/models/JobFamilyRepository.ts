import AbstractRepository from './AbstractRepository';

type JobFamily = {
  id: number;
  name: string;
  id_sector: number;
  sector_name?: string;
};

class JobFamilyRepository extends AbstractRepository {
  constructor() {
    super('job_family');
  }

  async readByCompanyId(id: number): Promise<JobFamily[]> {
    try {
      const [rows]: any = await this.db.query(
        `SELECT jf.id AS id,
              jf.name,
              jf.id_sector,
              cs.name AS sector_name
       FROM ${this.tableName} AS jf
       JOIN company_sector AS cs ON jf.id_sector = cs.id
       WHERE cs.id = ?`,
        [id],
      );

      return rows;
    } catch (error) {
      console.error('Error reading job families by company ID:', error);
      throw new Error('DATABASE_QUERY_ERROR');
    }
  }

  async create({ name, id_sector }: { name: string; id_sector: number }): Promise<number> {
    try {
      const [result]: any = await this.db.query(
        `INSERT INTO ${this.tableName} (name, id_sector) VALUES (?, ?)`,
        [name, id_sector],
      );
      return result.insertId;
    } catch (error) {
      console.error('Error creating job family:', error);
      throw new Error('DATABASE_QUERY_ERROR');
    }
  }

  async edit(id: number, name: string): Promise<boolean> {
    try {
      const [result]: any = await this.db.query(
        `UPDATE ${this.tableName} SET name = ? WHERE id = ?`,
        [name, id],
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating job family:', error);
      throw new Error('DATABASE_QUERY_ERROR');
    }
  }
}

export default new JobFamilyRepository();
