import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDTO } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDTO) {}
