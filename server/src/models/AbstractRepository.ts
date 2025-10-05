import databaseClient from '../../database/client';

class AbstractRepository {
  protected db = databaseClient;

  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async readAll<T>(): Promise<T[]> {
    try {
      const [rows]: any = await this.db.query(`SELECT * FROM ${this.tableName}`);
      return rows;
    } catch (error) {
      console.error(`Error reading all from ${this.tableName}:`, error);
      throw new Error('DATABASE_QUERY_ERROR');
    }
  }

  async readById<T>(id: number): Promise<T | null> {
    try {
      const [rows]: any = await this.db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error(`Error reading by ID from ${this.tableName}:`, error);
      throw new Error('DATABASE_QUERY_ERROR');
    }
  }

  async delete<T>(id: number): Promise<boolean> {
    try {
      const [result]: any = await this.db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error deleting from ${this.tableName}:`, error);
      throw new Error('DATABASE_QUERY_ERROR');
    }
  }
}

export default AbstractRepository;
