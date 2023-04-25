import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PayloadDTO } from '../token/dtos/PayloadDTO';
import { TodoEntryService } from './todo-entry.service';
import { TodoEntryDTO } from './todo-entry.model';

@Controller('todo-entry')
export class TodoEntryController {
  constructor(private todoEntryService: TodoEntryService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() dto: TodoEntryDTO) {
    const { id } = req.user as PayloadDTO;
    return this.todoEntryService.create(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Req() req: Request, @Param('id', ParseIntPipe) entryId: number) {
    const { id } = req.user as PayloadDTO;
    return this.todoEntryService.get(id, entryId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) entryId: number,
    @Body() dto: TodoEntryDTO,
  ) {
    const { id } = req.user as PayloadDTO;
    return this.todoEntryService.update(id, entryId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Req() req: Request, @Param('id', ParseIntPipe) entryId: number) {
    const { id } = req.user as PayloadDTO;
    return this.todoEntryService.delete(id, entryId);
  }
}
