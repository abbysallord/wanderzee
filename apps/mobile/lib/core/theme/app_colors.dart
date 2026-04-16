import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  static const Color primary = Color(0xFF1A73B5);
  static const Color primaryLight = Color(0xFF4A9BD9);
  static const Color primaryDark = Color(0xFF0D5A94);

  static const Color secondary = Color(0xFF2EC4B6);
  static const Color secondaryLight = Color(0xFF5DD9CE);
  static const Color secondaryDark = Color(0xFF1E9E93);

  static const Color background = Color(0xFFF8FAFC);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceLight = Color(0xFFEEF4F9);

  static const Color accent = Color(0xFFFF8C42);
  static const Color success = Color(0xFF4CAF50);
  static const Color warning = Color(0xFFF6AD55);
  static const Color error = Color(0xFFE53E3E);

  static const Color textPrimary = Color(0xFF1A202C);
  static const Color textSecondary = Color(0xFF4A5568);
  static const Color textMuted = Color(0xFF718096);
  static const Color textOnPrimary = Color(0xFFFFFFFF);

  static const Color safetyLow = Color(0xFF4CAF50);
  static const Color safetyMedium = Color(0xFFF6AD55);
  static const Color safetyHigh = Color(0xFFFF8C42);
  static const Color safetyCritical = Color(0xFFE53E3E);

  static const Color tripBusiness = Color(0xFF3B82F6);
  static const Color tripLeisure = Color(0xFF10B981);
  static const Color tripReligious = Color(0xFFF59E0B);
  static const Color tripEducational = Color(0xFF8B5CF6);
  static const Color tripAdventure = Color(0xFFEF4444);
  static const Color tripFamily = Color(0xFFEC4899);

  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primary, Color(0xFF2EC4B6)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient heroGradient = LinearGradient(
    colors: [Color(0xFF1A73B5), Color(0xFF2EC4B6), Color(0xFF4CAF50)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}
