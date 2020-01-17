import "package:built_collection/built_collection.dart";
import "package:built_value/built_value.dart";

part 'user.g.dart';

abstract class User implements Built<User, UserBuilder> {
  @nullable
  int get id;

  @nullable
  String get email;

  @nullable
  String get username;

  @nullable
  String get status;

  @nullable
  String get bearerToken;

  @nullable
  bool get isCurrentAuthenticated;

  @nullable
  String get refreshToken;

  // Keeps groupId : [channelId], marking the unread channels.
  @nullable
  BuiltMap<String, BuiltList> get unreadUpdates;

  @nullable
  String get avatar;

  User._();

  factory User([void Function(UserBuilder) updates]) = _$User;
}

class UserHelper {
  static List<String> userIds(List<dynamic> userIds) {
    if (userIds == null) return [];
    return userIds.whereType<String>().toList();
  }
}
