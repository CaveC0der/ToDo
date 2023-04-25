import { Module } from '@nestjs/common';
import { TodoEntryService } from './todo-entry.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoEntry } from './todo-entry.model';
import { TodoEntryController } from './todo-entry.controller';

@Module({
  imports: [SequelizeModule.forFeature([TodoEntry])],
  providers: [TodoEntryService],
  exports: [TodoEntryService],
  controllers: [TodoEntryController],
})
export class TodoEntryModule {
}
