// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$User extends User {
  @override
  final int id;
  @override
  final String email;
  @override
  final String username;
  @override
  final String status;
  @override
  final String bearerToken;
  @override
  final String refreshToken;
  @override
  final BuiltMap<String, BuiltList> unreadUpdates;
  @override
  final String avatar;

  factory _$User([void Function(UserBuilder) updates]) =>
      (new UserBuilder()..update(updates)).build();

  _$User._(
      {this.id,
      this.email,
      this.username,
      this.status,
      this.bearerToken,
      this.refreshToken,
      this.unreadUpdates,
      this.avatar})
      : super._();

  @override
  User rebuild(void Function(UserBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  UserBuilder toBuilder() => new UserBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is User &&
        id == other.id &&
        email == other.email &&
        username == other.username &&
        status == other.status &&
        bearerToken == other.bearerToken &&
        refreshToken == other.refreshToken &&
        unreadUpdates == other.unreadUpdates &&
        avatar == other.avatar;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc(
                $jc(
                    $jc(
                        $jc($jc($jc(0, id.hashCode), email.hashCode),
                            username.hashCode),
                        status.hashCode),
                    bearerToken.hashCode),
                refreshToken.hashCode),
            unreadUpdates.hashCode),
        avatar.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('User')
          ..add('id', id)
          ..add('email', email)
          ..add('username', username)
          ..add('status', status)
          ..add('bearerToken', bearerToken)
          ..add('refreshToken', refreshToken)
          ..add('unreadUpdates', unreadUpdates)
          ..add('avatar', avatar))
        .toString();
  }
}

class UserBuilder implements Builder<User, UserBuilder> {
  _$User _$v;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  String _email;
  String get email => _$this._email;
  set email(String email) => _$this._email = email;

  String _username;
  String get username => _$this._username;
  set username(String username) => _$this._username = username;

  String _status;
  String get status => _$this._status;
  set status(String status) => _$this._status = status;

  String _bearerToken;
  String get bearerToken => _$this._bearerToken;
  set bearerToken(String bearerToken) => _$this._bearerToken = bearerToken;

  String _refreshToken;
  String get refreshToken => _$this._refreshToken;
  set refreshToken(String refreshToken) => _$this._refreshToken = refreshToken;

  MapBuilder<String, BuiltList> _unreadUpdates;
  MapBuilder<String, BuiltList> get unreadUpdates =>
      _$this._unreadUpdates ??= new MapBuilder<String, BuiltList>();
  set unreadUpdates(MapBuilder<String, BuiltList> unreadUpdates) =>
      _$this._unreadUpdates = unreadUpdates;

  String _avatar;
  String get avatar => _$this._avatar;
  set avatar(String avatar) => _$this._avatar = avatar;

  UserBuilder();

  UserBuilder get _$this {
    if (_$v != null) {
      _id = _$v.id;
      _email = _$v.email;
      _username = _$v.username;
      _status = _$v.status;
      _bearerToken = _$v.bearerToken;
      _refreshToken = _$v.refreshToken;
      _unreadUpdates = _$v.unreadUpdates?.toBuilder();
      _avatar = _$v.avatar;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(User other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$User;
  }

  @override
  void update(void Function(UserBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$User build() {
    _$User _$result;
    try {
      _$result = _$v ??
          new _$User._(
              id: id,
              email: email,
              username: username,
              status: status,
              bearerToken: bearerToken,
              refreshToken: refreshToken,
              unreadUpdates: _unreadUpdates?.build(),
              avatar: avatar);
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'unreadUpdates';
        _unreadUpdates?.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'User', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
