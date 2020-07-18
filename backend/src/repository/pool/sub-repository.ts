import { IDatabaseConnection } from '../../common/database/kind';
import { IRepository } from './repository';

/**
 * A base class for children repositories.
 */
export class SubRepository implements IRepository {

  constructor(private _conn: IDatabaseConnection) {
  }

  get conn(): IDatabaseConnection {
    return this._conn;
  }

  close() {
    this._conn = null;
  }
}
