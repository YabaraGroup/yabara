import AbstractRepository from './AbstractRepository';

class CompanySectorRepository extends AbstractRepository {
  constructor() {
    super('company_sector');
  }

  async create(name: string): Promise<number> {
    try {
      const [result]: any = await this.db.query(`INSERT INTO ${this.tableName} (name) VALUES (?)`, [
        name,
      ]);
      return result.insertId;
    } catch (error) {
      console.error('Error creating company sector:', error);
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
      console.error('Error updating company sector:', error);
      throw new Error('DATABASE_QUERY_ERROR');
    }
  }
}

export default new CompanySectorRepository();
