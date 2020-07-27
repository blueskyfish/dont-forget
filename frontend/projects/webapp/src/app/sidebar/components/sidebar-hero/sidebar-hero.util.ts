import { IUserName } from 'projects/shared/src/lib/store/user';

export interface IAvatar {
  id: number;
  name: string;
}

export type AvatarValue = IAvatar | IUserName;

export class SidebarHeroUtil {

  static toValue(id: number, value: string): string {
    return `[${id}] ${value}`;
  }
}
