import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Document} from './document-model'
import {UpdateDocumentDto} from "./dto/updated-document.dto";

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Document) private documentRepository: typeof Document,
    ) {
    }

    async getDocuments(): Promise<Document[]> {
        const document = await this.documentRepository.findAll()

        if (!document) {
            throw new NotFoundException('No documents found')
        }
        return document
    }

    async updateDocument(updateDto: UpdateDocumentDto): Promise<any> {
        const document = await this.documentRepository.findByPk(1);

        if (!document) {
            throw new NotFoundException('Document not found');
        }

        document.companySigDate = updateDto.companySigDate ? new Date(updateDto.companySigDate) : document.companySigDate;
        document.companySignatureName = updateDto.companySignatureName ?? document.companySignatureName;
        document.documentName = updateDto.documentName ?? document.documentName;
        document.documentStatus = updateDto.documentStatus ?? document.documentStatus;
        document.documentType = updateDto.documentType ?? document.documentType;
        document.employeeNumber = updateDto.employeeNumber ?? document.employeeNumber;
        document.employeeSigDate = updateDto.employeeSigDate ? new Date(updateDto.employeeSigDate) : document.employeeSigDate;
        document.employeeSignatureName = updateDto.employeeSignatureName ?? document.employeeSignatureName;
        document.createdAt = document.createdAt
        document.updatedAt = new Date();

        await document.save();

        return document
    }


}
