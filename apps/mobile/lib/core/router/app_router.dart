import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/screens/login_screen.dart';
import '../../features/auth/presentation/screens/register_screen.dart';
import '../../features/auth/presentation/screens/onboarding_screen.dart';
import '../../features/home/presentation/screens/home_screen.dart';
import '../../features/trip_planner/presentation/screens/trip_planner_screen.dart';
import '../../features/trip_planner/presentation/screens/trip_detail_screen.dart';
import '../../features/map/presentation/screens/map_screen.dart';
import '../../features/budget/presentation/screens/budget_screen.dart';
import '../../features/profile/presentation/screens/profile_screen.dart';
import '../../features/safety/presentation/screens/safety_screen.dart';
import '../../shared/widgets/app_shell.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/onboarding',
    debugLogDiagnostics: true,
    routes: [
      GoRoute(
        path: '/onboarding',
        name: 'onboarding',
        pageBuilder: (context, state) => CustomTransitionPage(
          key: state.pageKey,
          child: const OnboardingScreen(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) =>
              FadeTransition(opacity: animation, child: child),
        ),
      ),
      GoRoute(
        path: '/login',
        name: 'login',
        pageBuilder: (context, state) => CustomTransitionPage(
          key: state.pageKey,
          child: const LoginScreen(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) =>
              SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(1, 0),
                  end: Offset.zero,
                ).animate(CurvedAnimation(parent: animation, curve: Curves.easeOutCubic)),
                child: child,
              ),
        ),
      ),
      GoRoute(
        path: '/register',
        name: 'register',
        pageBuilder: (context, state) => CustomTransitionPage(
          key: state.pageKey,
          child: const RegisterScreen(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) =>
              SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(1, 0),
                  end: Offset.zero,
                ).animate(CurvedAnimation(parent: animation, curve: Curves.easeOutCubic)),
                child: child,
              ),
        ),
      ),
      ShellRoute(
        builder: (context, state, child) => AppShell(child: child),
        routes: [
          GoRoute(
            path: '/',
            name: 'home',
            pageBuilder: (context, state) =>
                const NoTransitionPage(child: HomeScreen()),
          ),
          GoRoute(
            path: '/plan',
            name: 'plan',
            pageBuilder: (context, state) =>
                const NoTransitionPage(child: TripPlannerScreen()),
          ),
          GoRoute(
            path: '/map',
            name: 'map',
            pageBuilder: (context, state) =>
                const NoTransitionPage(child: MapScreen()),
          ),
          GoRoute(
            path: '/safety',
            name: 'safety',
            pageBuilder: (context, state) =>
                const NoTransitionPage(child: SafetyScreen()),
          ),
          GoRoute(
            path: '/profile',
            name: 'profile',
            pageBuilder: (context, state) =>
                const NoTransitionPage(child: ProfileScreen()),
          ),
        ],
      ),
      GoRoute(
        path: '/trip/:id',
        name: 'tripDetail',
        pageBuilder: (context, state) => CustomTransitionPage(
          key: state.pageKey,
          child: TripDetailScreen(tripId: state.pathParameters['id']!),
          transitionsBuilder: (context, animation, secondaryAnimation, child) =>
              SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(0, 1),
                  end: Offset.zero,
                ).animate(CurvedAnimation(parent: animation, curve: Curves.easeOutCubic)),
                child: child,
              ),
        ),
      ),
      GoRoute(
        path: '/trip/:id/budget',
        name: 'tripBudget',
        pageBuilder: (context, state) => MaterialPage(
          child: BudgetScreen(tripId: state.pathParameters['id']!),
        ),
      ),
    ],
  );
});
