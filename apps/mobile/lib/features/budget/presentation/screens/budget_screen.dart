import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class BudgetScreen extends StatelessWidget {
  final String tripId;
  const BudgetScreen({super.key, required this.tripId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Budget Tracker')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.construction_rounded, size: 64, color: AppColors.primary.withOpacity(0.5)),
            const SizedBox(height: 16),
            const Text('Budget Tracker', style: TextStyle(fontFamily: 'Poppins', fontSize: 18, fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            Text('Trip: $tripId', style: const TextStyle(fontFamily: 'Poppins', color: AppColors.textMuted)),
          ],
        ),
      ),
    );
  }
}
