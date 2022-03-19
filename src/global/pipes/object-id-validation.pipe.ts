import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value && value.length) {
      const isValid = mongoose.Types.ObjectId.isValid(value);
      if (!isValid) {
        throw new BadRequestException('Invalid ObjectId');
      }
    }
    return value;
  }
}
