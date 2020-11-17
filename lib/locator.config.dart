// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'package:stacked_services/stacked_services.dart';

import 'services/analytics_service.dart';
import 'services/abstractions/api.dart';
import 'services/database_service.dart';
import 'services/flipperNavigation_service.dart';
import 'services/api/http_api.dart';
import 'services/mail_service.dart';
import 'services/media_service.dart';
import 'services/performance_service.dart';
import 'services/shared_preference_service.dart';
import 'services/shared_state_service.dart';
import 'services/third_party_services_module.dart';

/// adds generated dependencies
/// to the provided [GetIt] instance

GetIt $initGetIt(
  GetIt get, {
  String environment,
  EnvironmentFilter environmentFilter,
}) {
  final gh = GetItHelper(get, environment, environmentFilter);
  final thirdPartyServicesModule = _$ThirdPartyServicesModule();
  gh.lazySingleton<AnalyticsService>(
      () => thirdPartyServicesModule.analyticsService);
  gh.lazySingleton<Api>(() => thirdPartyServicesModule.apiService);
  gh.lazySingleton<DatabaseService>(
      () => thirdPartyServicesModule.databaseService);
  gh.lazySingleton<DialogService>(() => thirdPartyServicesModule.dialogService);
  gh.lazySingleton<FlipperNavigationService>(
      () => thirdPartyServicesModule.flipperNavigationService);
  gh.lazySingleton<HttpApi>(() => HttpApi());
  gh.lazySingleton<MailService>(() => thirdPartyServicesModule.mailService);
  gh.lazySingleton<MediaService>(() => MediaService());
  gh.lazySingleton<NavigationService>(
      () => thirdPartyServicesModule.navigationService);
  gh.lazySingleton<PerformanceService>(
      () => thirdPartyServicesModule.performanceService);
  gh.lazySingleton<SharedPreferenceService>(
      () => thirdPartyServicesModule.sharedPreferences);
  gh.lazySingleton<SharedStateService>(
      () => thirdPartyServicesModule.sharedStateService);
  gh.lazySingleton<SnackbarService>(
      () => thirdPartyServicesModule.snackbarService);
  return get;
}

class _$ThirdPartyServicesModule extends ThirdPartyServicesModule {
  @override
  AnalyticsService get analyticsService => AnalyticsService();
  @override
  DatabaseService get databaseService => DatabaseService();
  @override
  DialogService get dialogService => DialogService();
  @override
  FlipperNavigationService get flipperNavigationService =>
      FlipperNavigationService();
  @override
  MailService get mailService => MailService();
  @override
  NavigationService get navigationService => NavigationService();
  @override
  PerformanceService get performanceService => PerformanceService();
  @override
  SharedPreferenceService get sharedPreferences => SharedPreferenceService();
  @override
  SharedStateService get sharedStateService => SharedStateService();
  @override
  SnackbarService get snackbarService => SnackbarService();
}
