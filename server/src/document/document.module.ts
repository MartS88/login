import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Document} from './document-model'
import {DocumentService} from './document.service';
import {DocumentController} from './document.controller';

@Module({
    providers: [DocumentService],
    controllers: [DocumentController],
    imports: [SequelizeModule.forFeature([Document])],
})
export class DocumentModule {
}
