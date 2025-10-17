import AbstractRepository from './AbstractRepository';

type JobOffer = {
  jobTitle: string;
  description: string;
  jobTime: string;
  contractType: string;
  delay_contract: string;
  salaryMin: string;
  salaryMax: string;
  salaryUnit: string;
  jobLocation: string;
  referenceNumber: string;
  id_company: string;
};

class JobOfferRepository extends AbstractRepository {
  constructor() {
    super('job_offer');
  }

  async create(jobOffer: JobOffer): Promise<number> {
    try {
      const [result]: any = await this.db.query(
        `INSERT INTO ${this.tableName} (title, description, time_commitment, contract_type, delay_contract, salary_min, salary_max, recurring_salary, location, reference_number, id_company) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          jobOffer.jobTitle,
          jobOffer.description,
          jobOffer.jobTime,
          jobOffer.contractType,
          jobOffer.delay_contract,
          jobOffer.salaryMin,
          jobOffer.salaryMax,
          jobOffer.salaryUnit,
          jobOffer.jobLocation,
          jobOffer.referenceNumber,
          jobOffer.id_company,
        ],
      );
      return result.insertId;
    } catch (error) {
      console.error('Error creating job offer:', error);
      throw new Error('DATABASE_QUERY_ERROR');
    }
  }
}

export default new JobOfferRepository();
