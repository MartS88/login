import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class UpdateDocumentDto {
    @IsNumber()
    readonly id: number;

    @IsOptional()
    @IsDateString()
    readonly companySigDate?: string;

    @IsOptional()
    @IsString()
    readonly companySignatureName?: string;

    @IsOptional()
    @IsString()
    readonly documentName?: string;

    @IsOptional()
    @IsString()
    readonly documentStatus?: string;

    @IsOptional()
    @IsString()
    readonly documentType?: string;

    @IsOptional()
    @IsString()
    readonly employeeNumber?: string;

    @IsOptional()
    @IsDateString()
    readonly employeeSigDate?: string;

    @IsOptional()
    @IsString()
    readonly employeeSignatureName?: string;
}
