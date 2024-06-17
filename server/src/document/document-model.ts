import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface DocumentCreationAttrs {
    companySigDate: Date;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: Date;
    employeeSignatureName: string;
}

@Table({ tableName: 'documents' })
export class Document extends Model<Document[], DocumentCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique identifier' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '2022-12-23T11:19:27.017Z', description: 'Company signature date' })
    @Column({ type: DataType.DATE, allowNull: false })
    companySigDate: Date;

    @ApiProperty({ example: 'test', description: 'Company signature name' })
    @Column({ type: DataType.STRING, allowNull: false })
    companySignatureName: string;

    @ApiProperty({ example: 'test', description: 'Document name' })
    @Column({ type: DataType.STRING, allowNull: false })
    documentName: string;

    @ApiProperty({ example: 'test', description: 'Document status' })
    @Column({ type: DataType.STRING, allowNull: false })
    documentStatus: string;

    @ApiProperty({ example: 'test', description: 'Document type' })
    @Column({ type: DataType.STRING, allowNull: false })
    documentType: string;

    @ApiProperty({ example: 'test', description: 'Employee number' })
    @Column({ type: DataType.STRING, allowNull: false })
    employeeNumber: string;

    @ApiProperty({ example: '2022-12-23T11:19:27.017Z', description: 'Employee signature date' })
    @Column({ type: DataType.DATE, allowNull: false })
    employeeSigDate: Date;

    @ApiProperty({ example: 'test', description: 'Employee signature name' })
    @Column({ type: DataType.STRING, allowNull: false })
    employeeSignatureName: string;
}
