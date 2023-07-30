import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dto/create-report.dto';

interface Report {
  source: string;
  amount: number;
}

interface UpdateReport {
  source?: string;
  amount?: number;
}

@Injectable()
export class ReportService {
  getReports(type: ReportType): ReportResponseDto[] {
    const reports = data.reports.filter((report) => report.type === type);

    return reports.map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.reports.find(
      (report) => report.type === type && report.id === id,
    );

    return new ReportResponseDto(report);
  }

  createReport(
    type: ReportType,
    { amount, source }: Report,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      type,
      created_at: new Date(),
      updated_at: new Date(),
    };
    data.reports.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    id: string,
    type: ReportType,
    body: UpdateReport,
  ): ReportResponseDto {
    const reportUpdated = data.reports.find(
      (report) => report.type === type && report.id === id,
    );
    if (!reportUpdated) return;

    const reportIndex = data.reports.findIndex(
      (report) => report.id === reportUpdated.id,
    );

    data.reports[reportIndex] = {
      ...reportUpdated,
      ...body,
      updated_at: new Date(),
    };
    return new ReportResponseDto(data.reports[reportIndex]);
  }

  deleteReport(id: string): void {
    const reportIndex = data.reports.findIndex((report) => report.id === id);

    if (reportIndex === -1) return;

    data.reports.splice(reportIndex, 1);
    return;
  }
}
