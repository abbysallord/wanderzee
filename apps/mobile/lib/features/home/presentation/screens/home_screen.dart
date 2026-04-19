import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.sizeOf(context).width;
    final isDesktop = screenWidth >= 1100;
    final isTablet = screenWidth >= 700;
    final horizontalPadding = isDesktop ? 32.0 : (isTablet ? 24.0 : 20.0);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(horizontal: horizontalPadding, vertical: 20),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 1120),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Hello, Traveler! 👋', style: TextStyle(fontFamily: 'Poppins', fontSize: 14, color: AppColors.textMuted)),
                        const SizedBox(height: 4),
                        Text(
                          'Explore Karnataka',
                          style: TextStyle(
                            fontFamily: 'Poppins',
                            fontSize: isDesktop ? 30 : 26,
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  CircleAvatar(
                    radius: 24,
                    backgroundColor: AppColors.primary.withOpacity(0.1),
                    child: const Icon(Icons.person_rounded, color: AppColors.primary),
                  ),
                ],
              ).animate().fadeIn().slideY(begin: -0.2),
              const SizedBox(height: 24),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: AppColors.primaryGradient,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.primary.withOpacity(0.3),
                      blurRadius: 20,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.auto_awesome, color: Colors.white, size: 32),
                    const SizedBox(height: 16),
                    const Text('Plan Your Next Trip', style: TextStyle(fontFamily: 'Poppins', fontSize: 22, fontWeight: FontWeight.w700, color: Colors.white)),
                    const SizedBox(height: 8),
                    Text(
                      'Let AI craft the perfect itinerary based on your preferences',
                      style: TextStyle(fontFamily: 'Poppins', fontSize: 14, color: Colors.white.withOpacity(0.85)),
                    ),
                    const SizedBox(height: 20),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () => context.go('/plan'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: AppColors.primary,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.explore_rounded, size: 20),
                            SizedBox(width: 8),
                            Text('Start Planning', style: TextStyle(fontFamily: 'Poppins', fontSize: 16, fontWeight: FontWeight.w600)),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ).animate().fadeIn(delay: 200.ms).slideY(begin: 0.2).scale(begin: const Offset(0.95, 0.95)),
              const SizedBox(height: 28),
              const Text('Quick Actions', style: TextStyle(fontFamily: 'Poppins', fontSize: 18, fontWeight: FontWeight.w600, color: AppColors.textPrimary))
                  .animate().fadeIn(delay: 300.ms),
              const SizedBox(height: 16),
              if (isTablet)
                Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  children: [
                    SizedBox(width: 220, child: _QuickActionCard(icon: Icons.map_rounded,          label: 'Explore Map', color: AppColors.secondary, onTap: () => context.go('/map'))),
                    SizedBox(width: 220, child: _QuickActionCard(icon: Icons.shield_rounded,        label: 'Safety Info', color: AppColors.success,   onTap: () => context.go('/safety'))),
                    SizedBox(width: 220, child: _QuickActionCard(icon: Icons.phone_in_talk_rounded, label: 'Emergency',   color: AppColors.error,     onTap: () {})),
                  ],
                ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.2)
              else
                Row(
                  children: [
                    Expanded(child: _QuickActionCard(icon: Icons.map_rounded,          label: 'Explore Map', color: AppColors.secondary, onTap: () => context.go('/map'))),
                    const SizedBox(width: 12),
                    Expanded(child: _QuickActionCard(icon: Icons.shield_rounded,        label: 'Safety Info', color: AppColors.success,   onTap: () => context.go('/safety'))),
                    const SizedBox(width: 12),
                    Expanded(child: _QuickActionCard(icon: Icons.phone_in_talk_rounded, label: 'Emergency',   color: AppColors.error,     onTap: () {})),
                  ],
                ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.2),
              const SizedBox(height: 28),
              const Text('Popular in Karnataka', style: TextStyle(fontFamily: 'Poppins', fontSize: 18, fontWeight: FontWeight.w600, color: AppColors.textPrimary))
                  .animate().fadeIn(delay: 500.ms),
              const SizedBox(height: 16),
              if (isTablet)
                const Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  children: [
                    _DestinationCard(name: 'Coorg',       subtitle: 'Scotland of India', emoji: '🏔️', color: Color(0xFF10B981), width: 200, height: 190),
                    _DestinationCard(name: 'Hampi',       subtitle: 'UNESCO Heritage',   emoji: '🏛️', color: Color(0xFFF59E0B), width: 200, height: 190),
                    _DestinationCard(name: 'Gokarna',     subtitle: 'Beach Paradise',    emoji: '🏖️', color: Color(0xFF3B82F6), width: 200, height: 190),
                    _DestinationCard(name: 'Chikmagalur', subtitle: 'Coffee Country',    emoji: '☕', color: Color(0xFF8B5CF6), width: 200, height: 190),
                    _DestinationCard(name: 'Mysuru',      subtitle: 'City of Palaces',   emoji: '👑', color: Color(0xFFEC4899), width: 200, height: 190),
                  ],
                ).animate().fadeIn(delay: 600.ms).slideX(begin: 0.1)
              else
                SizedBox(
                  height: 180,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    children: const [
                      _DestinationCard(name: 'Coorg',       subtitle: 'Scotland of India', emoji: '🏔️', color: Color(0xFF10B981)),
                      _DestinationCard(name: 'Hampi',       subtitle: 'UNESCO Heritage',   emoji: '🏛️', color: Color(0xFFF59E0B)),
                      _DestinationCard(name: 'Gokarna',     subtitle: 'Beach Paradise',    emoji: '🏖️', color: Color(0xFF3B82F6)),
                      _DestinationCard(name: 'Chikmagalur', subtitle: 'Coffee Country',    emoji: '☕', color: Color(0xFF8B5CF6)),
                      _DestinationCard(name: 'Mysuru',      subtitle: 'City of Palaces',   emoji: '👑', color: Color(0xFFEC4899)),
                    ],
                  ),
                ).animate().fadeIn(delay: 600.ms).slideX(begin: 0.1),
              const SizedBox(height: 28),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Your Recent Trips', style: TextStyle(fontFamily: 'Poppins', fontSize: 18, fontWeight: FontWeight.w600, color: AppColors.textPrimary)),
                  TextButton(onPressed: () {}, child: const Text('See All')),
                ],
              ).animate().fadeIn(delay: 700.ms),
              const SizedBox(height: 12),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.grey.shade200),
                ),
                child: Column(
                  children: [
                    Icon(Icons.luggage_rounded, size: 48, color: AppColors.textMuted.withOpacity(0.5)),
                    const SizedBox(height: 12),
                    const Text('No trips yet', style: TextStyle(fontFamily: 'Poppins', fontSize: 16, fontWeight: FontWeight.w600, color: AppColors.textSecondary)),
                    const SizedBox(height: 4),
                    const Text('Plan your first Karnataka adventure!', style: TextStyle(fontFamily: 'Poppins', fontSize: 13, color: AppColors.textMuted)),
                  ],
                ),
              ).animate().fadeIn(delay: 800.ms),
              const SizedBox(height: 20),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _QuickActionCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;

  const _QuickActionCard({required this.icon, required this.label, required this.color, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.grey.shade200),
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
              child: Icon(icon, color: color, size: 24),
            ),
            const SizedBox(height: 8),
            Text(label, textAlign: TextAlign.center, style: const TextStyle(fontFamily: 'Poppins', fontSize: 12, fontWeight: FontWeight.w500, color: AppColors.textSecondary)),
          ],
        ),
      ),
    );
  }
}

class _DestinationCard extends StatelessWidget {
  final String name;
  final String subtitle;
  final String emoji;
  final Color color;
  final double width;
  final double? height;

  const _DestinationCard({
    required this.name,
    required this.subtitle,
    required this.emoji,
    required this.color,
    this.width = 150,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [color.withOpacity(0.1), color.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(emoji, style: const TextStyle(fontSize: 36)),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: TextStyle(fontFamily: 'Poppins', fontSize: 16, fontWeight: FontWeight.w600, color: color.withOpacity(0.8))),
              Text(subtitle, style: const TextStyle(fontFamily: 'Poppins', fontSize: 11, color: AppColors.textMuted)),
            ],
          ),
        ],
      ),
    );
  }
}
