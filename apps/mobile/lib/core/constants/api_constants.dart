class ApiConstants {
  ApiConstants._();

  static const String baseUrl = 'http://localhost:3000/api/v1';

  static const String login = '/auth/login';
  static const String register = '/auth/register';
  static const String refreshToken = '/auth/refresh';

  static const String userProfile = '/users/me';
  static const String updateProfile = '/users/me/profile';

  static const String trips = '/trips';
  static const String generateTrip = '/ai/generate-trip';

  static const String places = '/places';
  static const String districts = '/places/districts';
  static const String nearbyPlaces = '/places/nearby';

  static const String safetyAdvisories = '/safety/advisories';
  static const String emergencyContacts = '/safety/emergency-contacts';

  static const Duration connectTimeout = Duration(seconds: 15);
  static const Duration receiveTimeout = Duration(seconds: 30);
  static const Duration aiReceiveTimeout = Duration(seconds: 60);
}
