import { NL, RepositoryNames } from '../repository.names';

/**
 * @see {@link IDbSetting}
 */
export const SQL_SELECT_SETTING = [
  'SELECT `setting_id` AS settingId, `name`, `value`, `type`, `description`', NL,
  'FROM ', RepositoryNames.Settings
].join('');
