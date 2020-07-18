import { Moment } from 'moment';
import * as _ from 'lodash';
import { DateUtil } from '../../../common/util';
import { IDbSetting, SettingType } from './setting.db';

export class SettingValue {

  constructor(private value: IDbSetting) {
  }

  get id(): number {
    return this.value.settingId;
  }

  get name(): string {
    return this.value.name;
  }

  get type(): SettingType {
    return this.value.type;
  }

  get description(): string {
    return this.value.description;
  }

  get hasValue(): boolean {
    return !_.isNil(this.value.value);
  }

  get asString(): string {
    return this.type === 'string' ? this.value.value : null;
  }

  get asDate(): Date {
    return this.type === 'date' ? DateUtil.toDate(this.value.value) : null;
  }

  get asMoment(): Moment {
    return this.type === 'date' ? DateUtil.fromDate(this.value.value): null;
  }

}
