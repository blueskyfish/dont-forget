import { IUserName } from 'projects/shared/src/lib/store/user/user.models';

export interface IAvatar {
  id: number;
  name: string;
}

export type AvatarValue = IAvatar | IUserName;

export class HeroPanelUtil {

  static toValue(id: number, value: string): string {
    return `[${id}] ${value}`;
  }
}
