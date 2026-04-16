import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { AddExpenseDto } from './dto/add-expense.dto';

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  async addExpense(userId: string, tripId: string, dto: AddExpenseDto) {
    await this.verifyTripOwnership(userId, tripId);

    const expense = await this.prisma.expense.create({
      data: {
        tripId,
        category: dto.category,
        description: dto.description,
        amount: dto.amount,
        currency: dto.currency ?? 'INR',
      },
    });

    const totalSpent = await this.prisma.expense.aggregate({
      where: { tripId },
      _sum: { amount: true },
    });

    await this.prisma.trip.update({
      where: { id: tripId },
      data: { actualSpent: totalSpent._sum.amount ?? 0 },
    });

    return expense;
  }

  async getTripExpenses(userId: string, tripId: string) {
    await this.verifyTripOwnership(userId, tripId);

    const [expenses, summary, trip] = await Promise.all([
      this.prisma.expense.findMany({
        where: { tripId },
        orderBy: { paidAt: 'desc' },
      }),
      this.prisma.expense.groupBy({
        by: ['category'],
        where: { tripId },
        _sum: { amount: true },
        _count: true,
      }),
      this.prisma.trip.findUnique({
        where: { id: tripId },
        select: { estimatedBudget: true },
      }),
    ]);

    const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const estimatedBudget = Number(trip?.estimatedBudget ?? 0);

    return {
      expenses,
      summary: {
        totalSpent,
        estimatedBudget,
        remaining: estimatedBudget - totalSpent,
        byCategory: summary.map((s) => ({
          category: s.category,
          total: Number(s._sum.amount),
          count: s._count,
        })),
      },
    };
  }

  async deleteExpense(userId: string, tripId: string, expenseId: string) {
    await this.verifyTripOwnership(userId, tripId);
    await this.prisma.expense.delete({ where: { id: expenseId } });

    const totalSpent = await this.prisma.expense.aggregate({
      where: { tripId },
      _sum: { amount: true },
    });

    await this.prisma.trip.update({
      where: { id: tripId },
      data: { actualSpent: totalSpent._sum.amount ?? 0 },
    });

    return { message: 'Expense deleted' };
  }

  private async verifyTripOwnership(userId: string, tripId: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundException('Trip not found');
    if (trip.userId !== userId) throw new ForbiddenException('Not your trip');
    return trip;
  }
}
