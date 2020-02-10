#import "FlipperOfflineDbPlugin.h"
#if __has_include(<flipper_offline_db/flipper_offline_db-Swift.h>)
#import <flipper_offline_db/flipper_offline_db-Swift.h>
#else
// Support project import fallback if the generated compatibility header
// is not copied when this plugin is created as a library.
// https://forums.swift.org/t/swift-static-libraries-dont-copy-generated-objective-c-header/19816
#import "flipper_offline_db-Swift.h"
#endif

@implementation FlipperOfflineDbPlugin
+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
  [SwiftFlipperOfflineDbPlugin registerWithRegistrar:registrar];
}
@end
