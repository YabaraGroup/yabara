import databaseClient from '../../database/client';

class EmailRepository {
  private db = databaseClient;
  private tableName = 'comingsoon';

  async addEmail(email: string): Promise<void> {
    const query = `INSERT INTO ${this.tableName} (email) VALUES (?)`;
    const values = [email];
    await this.db.query(query, values);
  }
}

export default new EmailRepository();
