import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<_OnboardingData> _pages = [
    _OnboardingData(
      icon: Icons.explore_rounded,
      title: 'AI-Powered Trip Planning',
      subtitle: 'Tell us your trip type, budget, and preferences.\nOur AI creates your perfect Karnataka itinerary.',
      color: AppColors.primary,
    ),
    _OnboardingData(
      icon: Icons.shield_rounded,
      title: 'Safe & Culturally Aware',
      subtitle: 'Get real-time safety advisories, cultural tips,\nand emergency contacts for every destination.',
      color: AppColors.secondary,
    ),
    _OnboardingData(
      icon: Icons.cloud_off_rounded,
      title: 'Works Offline',
      subtitle: 'Download your trip plans and maps.\nNavigate confidently even without internet.',
      color: AppColors.success,
    ),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.sizeOf(context).width;
    final isWide = screenWidth >= 900;
    final maxContentWidth = isWide ? 920.0 : 600.0;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: BoxConstraints(maxWidth: maxContentWidth),
            child: Column(
              children: [
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: isWide ? 32 : 8),
                  child: Align(
                    alignment: Alignment.topRight,
                    child: TextButton(
                      onPressed: () => context.go('/login'),
                      child: const Text(
                        'Skip',
                        style: TextStyle(fontFamily: 'Poppins', color: AppColors.textMuted, fontSize: 16),
                      ),
                    ),
                  ),
                ).animate().fadeIn(delay: 500.ms),
                Expanded(
                  child: PageView.builder(
                    controller: _pageController,
                    onPageChanged: (index) => setState(() => _currentPage = index),
                    itemCount: _pages.length,
                    itemBuilder: (context, index) {
                      final page = _pages[index];
                      return Padding(
                        padding: EdgeInsets.symmetric(horizontal: isWide ? 72 : 40),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              width: isWide ? 168 : 140,
                              height: isWide ? 168 : 140,
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  colors: [page.color.withOpacity(0.2), page.color.withOpacity(0.05)],
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                ),
                                shape: BoxShape.circle,
                              ),
                              child: Icon(page.icon, size: isWide ? 74 : 64, color: page.color),
                            )
                                .animate(onPlay: (controller) => controller.repeat(reverse: true))
                                .scale(
                                  begin: const Offset(1, 1),
                                  end: const Offset(1.05, 1.05),
                                  duration: 2.seconds,
                                  curve: Curves.easeInOut,
                                ),
                            SizedBox(height: isWide ? 54 : 48),
                            Text(
                              page.title,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontFamily: 'Poppins',
                                fontSize: isWide ? 32 : 26,
                                fontWeight: FontWeight.w700,
                                color: AppColors.textPrimary,
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              page.subtitle,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontFamily: 'Poppins',
                                fontSize: isWide ? 16 : 15,
                                color: AppColors.textSecondary,
                                height: 1.6,
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(
                    _pages.length,
                    (index) => AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      width: _currentPage == index ? 32 : 8,
                      height: 8,
                      decoration: BoxDecoration(
                        color: _currentPage == index
                            ? AppColors.primary
                            : AppColors.primary.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                  ),
                ),
                SizedBox(height: isWide ? 28 : 40),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: isWide ? 32 : 24),
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 460),
                    child: Column(
                      children: [
                        SizedBox(
                          width: double.infinity,
                          height: 56,
                          child: ElevatedButton(
                            onPressed: () {
                              if (_currentPage < _pages.length - 1) {
                                _pageController.nextPage(
                                  duration: const Duration(milliseconds: 400),
                                  curve: Curves.easeOutCubic,
                                );
                              } else {
                                context.go('/register');
                              }
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.primary,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                              elevation: 0,
                            ),
                            child: Text(
                              _currentPage < _pages.length - 1 ? 'Next' : 'Get Started',
                              style: const TextStyle(
                                fontFamily: 'Poppins',
                                fontSize: 18,
                                fontWeight: FontWeight.w600,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 12),
                        TextButton(
                          onPressed: () => context.go('/login'),
                          child: RichText(
                            text: const TextSpan(
                              style: TextStyle(fontFamily: 'Poppins', fontSize: 14),
                              children: [
                                TextSpan(text: 'Already have an account? ', style: TextStyle(color: AppColors.textMuted)),
                                TextSpan(text: 'Sign In', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w600)),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ).animate().fadeIn(delay: 300.ms).slideY(begin: 0.3),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _OnboardingData {
  final IconData icon;
  final String title;
  final String subtitle;
  final Color color;

  _OnboardingData({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.color,
  });
}
