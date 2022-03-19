import { ApiProperty } from '@nestjs/swagger';

export class IErrorMessage {
  @ApiProperty({
    description: 'Error message',
    example: 'Error message',
  })
  message: string;
  @ApiProperty({
    description: 'Error status',
    example: 'Error status',
  })
  status: number;
  @ApiProperty({
    description: 'Error',
    example: 'Error',
  })
  error: string;
}
