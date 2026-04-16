import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BudgetService } from './budget.service';
import { AddExpenseDto } from './dto/add-expense.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('budget')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('trips/:tripId/expenses')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Post()
  @ApiOperation({ summary: 'Add expense to trip' })
  addExpense(
    @CurrentUser('id') userId: string,
    @Param('tripId') tripId: string,
    @Body() dto: AddExpenseDto,
  ) {
    return this.budgetService.addExpense(userId, tripId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get trip expenses & budget summary' })
  getExpenses(@CurrentUser('id') userId: string, @Param('tripId') tripId: string) {
    return this.budgetService.getTripExpenses(userId, tripId);
  }

  @Delete(':expenseId')
  @ApiOperation({ summary: 'Delete an expense' })
  deleteExpense(
    @CurrentUser('id') userId: string,
    @Param('tripId') tripId: string,
    @Param('expenseId') expenseId: string,
  ) {
    return this.budgetService.deleteExpense(userId, tripId, expenseId);
  }
}
