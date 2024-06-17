import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {DocumentService} from "./document.service";
import {UpdateDocumentDto} from "./dto/updated-document.dto";


@ApiTags('Documents')
@Controller('documents')
export class DocumentController {

    constructor(private readonly documentService: DocumentService) {
    }

    @ApiOperation({summary: 'Get data'})
    @ApiResponse({status: 200, description: 'Data fetched successfully'})
    @ApiResponse({status: 400, description: 'Bad Request'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Get('ru/data/v3/testmethods/docs/userdocs/get')
    async fetchData() {
        try {
            const document = await this.documentService.getDocuments();
            return {success: true, document};
        } catch (error) {
            return {success: false, error: error.message};
        }
    }

    @ApiOperation({summary: 'Get data'})
    @ApiResponse({status: 200, description: 'Data fetched successfully'})
    @ApiResponse({status: 400, description: 'Bad Request'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    @Post('/ru/data/v3/testmethods/docs/userdocs/create')
    async updateData(@Body() updateDto: UpdateDocumentDto) {
        try {
            const document = await this.documentService.updateDocument(updateDto)
            return {success: true, document};
        } catch (error) {
            return {success: false, error: error.message};
        }
    }


}
