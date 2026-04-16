import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class SafetyScreen extends StatelessWidget {
  const SafetyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Safety Info')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.construction_rounded, size: 64, color: AppColors.primary.withOpacity(0.5)),
            const SizedBox(height: 16),
            const Text('Safety Advisories & Emergency Contacts', style: TextStyle(fontFamily: 'Poppins', fontSize: 18, fontWeight: FontWeight.w600, textAlign: TextAlign.center)),
            const SizedBox(height: 8),
            const Text('Coming soon!', style: TextStyle(fontFamily: 'Poppins', color: AppColors.textMuted)),
          ],
        ),
      ),
    );
  }
}
