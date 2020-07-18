
export type SettingType = 'string' | 'date' | 'boolean' | 'number';

export interface IDbSetting {

  settingId: number;

  name: string;

  value: string;

  type: SettingType;

  description: string;
}
