import { IDatabaseConnection } from '../../common/database/kind';
import { IRepository } from './repository';
import { SettingRepository } from './setting/setting.repository';
import { UserRepository } from './user';

/**
 * The repository pool
 */
export class RepositoryPool implements IRepository {

  private _userRepository: UserRepository = null;
  private _settingRepository: SettingRepository = null;

  constructor(private _conn: IDatabaseConnection) {
  }

  get conn(): IDatabaseConnection {
    return this._conn;
  }

  /**
   * The sub repository works with the user entities
   *
   * @returns {UserRepository}
   */
  get user(): UserRepository {
    return !this._userRepository ?
      (this._userRepository = new UserRepository(this.conn)) : this._userRepository;
  }

  /**
   * The sub repository works with the setting entities.
   *
   * @returns {SettingRepository}
   */
  get setting(): SettingRepository {
    return !this._settingRepository ?
      (this._settingRepository = new SettingRepository(this.conn)) : this._settingRepository;
  }

  /**
   * @see {@link DbConnection.startTransaction}
   */
  async startTransaction(): Promise<void> {
    await this.conn.startTransaction();
  }

  /**
   * @see {@link DbConnection.commit}
   */
  async commit(): Promise<boolean> {
    return await this.conn.commit();
  }

  /**
   * @see {@link DbConnection.rollback}
   */
  async rollback(): Promise<boolean> {
    return await this.conn.rollback();
  }


  close(): void {
    this._conn = null;
    if (this._userRepository) {
      this._userRepository.close();
      this._userRepository = null;
    }
    if (this._settingRepository) {
      this._settingRepository.close();
      this._settingRepository = null;
    }
  }
}
