import { Controller, Get, Delete, Put, Query, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { Example } from '../schema/example.schema';
import { ExampleService } from '../services/example.service';
import { EntityMetadata, ErrorInfo } from '../../common/models';
import { BaseController } from '../../common/controller/base.controller';

@ApiTags('Example')
@Controller('example')
export class ExampleController extends BaseController<Example, ExampleService> {
  constructor (
    private readonly svc: ExampleService,
  ) {
    super(svc);
  }

  @Get()
  @ApiResponse({ type: Example, status: 200, isArray: true })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'find' })
  @ApiImplicitQuery({ name: 'query', required: false, type: String })
  async find(@Query('query') queryString?: string): Promise<EntityMetadata<Example[]>> {
    return super.find(queryString);
  }

  @Get(':id')
  @ApiResponse({ type: Example, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findById' })
  async findById(@Param('id') id: string): Promise<EntityMetadata<Example>> {
    return super.findById(id);
  }

  @Get('single')
  @ApiResponse({ type: Example, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findOne' })
  async findOne(@Query('query') queryString: string): Promise<EntityMetadata<Example>> {
    return super.findOne(queryString);
  }

  @Post()
  @ApiResponse({ type: Example, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'create' })
  async create(@Body() model: Example): Promise<EntityMetadata<Example>> {
    return super.create(model);
  }

  @Put(':id')
  @ApiResponse({ type: Example, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'update' })
  async update(@Body() model: Example, @Param('id') id: string): Promise<EntityMetadata<Example>> {
    return super.update(model, id);
  }

  @Delete(':id')
  @ApiResponse({ type: Boolean, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'delete' })
  async delete(@Param('id') id: string): Promise<EntityMetadata<boolean>> {
    return super.delete(id);
  }
}
