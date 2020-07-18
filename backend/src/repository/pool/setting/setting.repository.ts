import { SubRepository } from '../sub-repository';
import { IDbSetting } from './setting.db';
import { SQL_SELECT_SETTING } from './setting.sql';
import { SettingValue } from './setting.value';

export class SettingRepository extends SubRepository {

  private readonly DUMMY = new SettingValue({
    settingId: -1,
    name: 'null',
    value: null,
    description: 'The dummy setting',
    type: 'string'
  });

  private lastAccess = 0;

  private mapper: Map<string, SettingValue> = new Map<string, SettingValue>();

  async getSetting(name: string): Promise<SettingValue> {
    await this.checkSettings();
    return this.mapper.get(name) || this.DUMMY;
  }

  private async checkSettings(): Promise<void> {
    const now = Date.now();

    if (this.lastAccess <= 0 || this.lastAccess + 600000 < now) {

      this.lastAccess = now;

      const dbList = await this.conn.select<IDbSetting>(SQL_SELECT_SETTING);

      dbList.forEach(value => {
        this.mapper.set(value.name, new SettingValue(value));
      });
    }
  }
}
