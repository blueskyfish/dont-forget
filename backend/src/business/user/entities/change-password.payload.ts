import { ApiProperty } from '@nestjs/swagger';
import { MinLength, ValidateIf } from 'class-validator';

export class ChangePasswordPayload {

  @MinLength(8)
  @ApiProperty({
    description: 'The current password'
  })
  current: string;

  @MinLength(8)
  @ApiProperty({
    description: 'The new password'
  })
  password: string;

  @ValidateIf((o) => o.password !== o.repeat)
  @MinLength(8)
  @ApiProperty({
    description: 'The confirmed new password'
  })
  repeat: string;
}
