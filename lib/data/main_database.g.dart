// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'main_database.dart';

// **************************************************************************
// MoorGenerator
// **************************************************************************

// ignore_for_file: unnecessary_brace_in_string_interps, unnecessary_this
class UserTableData extends DataClass implements Insertable<UserTableData> {
  final int id;
  final String username;
  final String status;
  final String bearerToken;
  final String refreshToken;
  final String email;
  final String avatar;
  UserTableData(
      {@required this.id,
      @required this.username,
      @required this.status,
      @required this.bearerToken,
      @required this.refreshToken,
      @required this.email,
      this.avatar});
  factory UserTableData.fromData(
      Map<String, dynamic> data, GeneratedDatabase db,
      {String prefix}) {
    final effectivePrefix = prefix ?? '';
    final intType = db.typeSystem.forDartType<int>();
    final stringType = db.typeSystem.forDartType<String>();
    return UserTableData(
      id: intType.mapFromDatabaseResponse(data['${effectivePrefix}id']),
      username: stringType
          .mapFromDatabaseResponse(data['${effectivePrefix}username']),
      status:
          stringType.mapFromDatabaseResponse(data['${effectivePrefix}status']),
      bearerToken: stringType
          .mapFromDatabaseResponse(data['${effectivePrefix}bearer_token']),
      refreshToken: stringType
          .mapFromDatabaseResponse(data['${effectivePrefix}refresh_token']),
      email:
          stringType.mapFromDatabaseResponse(data['${effectivePrefix}email']),
      avatar:
          stringType.mapFromDatabaseResponse(data['${effectivePrefix}avatar']),
    );
  }
  factory UserTableData.fromJson(Map<String, dynamic> json,
      {ValueSerializer serializer = const ValueSerializer.defaults()}) {
    return UserTableData(
      id: serializer.fromJson<int>(json['id']),
      username: serializer.fromJson<String>(json['username']),
      status: serializer.fromJson<String>(json['status']),
      bearerToken: serializer.fromJson<String>(json['bearerToken']),
      refreshToken: serializer.fromJson<String>(json['refreshToken']),
      email: serializer.fromJson<String>(json['email']),
      avatar: serializer.fromJson<String>(json['avatar']),
    );
  }
  @override
  Map<String, dynamic> toJson(
      {ValueSerializer serializer = const ValueSerializer.defaults()}) {
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'username': serializer.toJson<String>(username),
      'status': serializer.toJson<String>(status),
      'bearerToken': serializer.toJson<String>(bearerToken),
      'refreshToken': serializer.toJson<String>(refreshToken),
      'email': serializer.toJson<String>(email),
      'avatar': serializer.toJson<String>(avatar),
    };
  }

  @override
  UserTableCompanion createCompanion(bool nullToAbsent) {
    return UserTableCompanion(
      id: id == null && nullToAbsent ? const Value.absent() : Value(id),
      username: username == null && nullToAbsent
          ? const Value.absent()
          : Value(username),
      status:
          status == null && nullToAbsent ? const Value.absent() : Value(status),
      bearerToken: bearerToken == null && nullToAbsent
          ? const Value.absent()
          : Value(bearerToken),
      refreshToken: refreshToken == null && nullToAbsent
          ? const Value.absent()
          : Value(refreshToken),
      email:
          email == null && nullToAbsent ? const Value.absent() : Value(email),
      avatar:
          avatar == null && nullToAbsent ? const Value.absent() : Value(avatar),
    );
  }

  UserTableData copyWith(
          {int id,
          String username,
          String status,
          String bearerToken,
          String refreshToken,
          String email,
          String avatar}) =>
      UserTableData(
        id: id ?? this.id,
        username: username ?? this.username,
        status: status ?? this.status,
        bearerToken: bearerToken ?? this.bearerToken,
        refreshToken: refreshToken ?? this.refreshToken,
        email: email ?? this.email,
        avatar: avatar ?? this.avatar,
      );
  @override
  String toString() {
    return (StringBuffer('UserTableData(')
          ..write('id: $id, ')
          ..write('username: $username, ')
          ..write('status: $status, ')
          ..write('bearerToken: $bearerToken, ')
          ..write('refreshToken: $refreshToken, ')
          ..write('email: $email, ')
          ..write('avatar: $avatar')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => $mrjf($mrjc(
      id.hashCode,
      $mrjc(
          username.hashCode,
          $mrjc(
              status.hashCode,
              $mrjc(
                  bearerToken.hashCode,
                  $mrjc(refreshToken.hashCode,
                      $mrjc(email.hashCode, avatar.hashCode)))))));
  @override
  bool operator ==(dynamic other) =>
      identical(this, other) ||
      (other is UserTableData &&
          other.id == this.id &&
          other.username == this.username &&
          other.status == this.status &&
          other.bearerToken == this.bearerToken &&
          other.refreshToken == this.refreshToken &&
          other.email == this.email &&
          other.avatar == this.avatar);
}

class UserTableCompanion extends UpdateCompanion<UserTableData> {
  final Value<int> id;
  final Value<String> username;
  final Value<String> status;
  final Value<String> bearerToken;
  final Value<String> refreshToken;
  final Value<String> email;
  final Value<String> avatar;
  const UserTableCompanion({
    this.id = const Value.absent(),
    this.username = const Value.absent(),
    this.status = const Value.absent(),
    this.bearerToken = const Value.absent(),
    this.refreshToken = const Value.absent(),
    this.email = const Value.absent(),
    this.avatar = const Value.absent(),
  });
  UserTableCompanion.insert({
    this.id = const Value.absent(),
    @required String username,
    @required String status,
    @required String bearerToken,
    @required String refreshToken,
    @required String email,
    this.avatar = const Value.absent(),
  })  : username = Value(username),
        status = Value(status),
        bearerToken = Value(bearerToken),
        refreshToken = Value(refreshToken),
        email = Value(email);
  UserTableCompanion copyWith(
      {Value<int> id,
      Value<String> username,
      Value<String> status,
      Value<String> bearerToken,
      Value<String> refreshToken,
      Value<String> email,
      Value<String> avatar}) {
    return UserTableCompanion(
      id: id ?? this.id,
      username: username ?? this.username,
      status: status ?? this.status,
      bearerToken: bearerToken ?? this.bearerToken,
      refreshToken: refreshToken ?? this.refreshToken,
      email: email ?? this.email,
      avatar: avatar ?? this.avatar,
    );
  }
}

class $UserTableTable extends UserTable
    with TableInfo<$UserTableTable, UserTableData> {
  final GeneratedDatabase _db;
  final String _alias;
  $UserTableTable(this._db, [this._alias]);
  final VerificationMeta _idMeta = const VerificationMeta('id');
  GeneratedIntColumn _id;
  @override
  GeneratedIntColumn get id => _id ??= _constructId();
  GeneratedIntColumn _constructId() {
    return GeneratedIntColumn('id', $tableName, false,
        hasAutoIncrement: true, declaredAsPrimaryKey: true);
  }

  final VerificationMeta _usernameMeta = const VerificationMeta('username');
  GeneratedTextColumn _username;
  @override
  GeneratedTextColumn get username => _username ??= _constructUsername();
  GeneratedTextColumn _constructUsername() {
    return GeneratedTextColumn('username', $tableName, false,
        maxTextLength: 16);
  }

  final VerificationMeta _statusMeta = const VerificationMeta('status');
  GeneratedTextColumn _status;
  @override
  GeneratedTextColumn get status => _status ??= _constructStatus();
  GeneratedTextColumn _constructStatus() {
    return GeneratedTextColumn('status', $tableName, false, maxTextLength: 16);
  }

  final VerificationMeta _bearerTokenMeta =
      const VerificationMeta('bearerToken');
  GeneratedTextColumn _bearerToken;
  @override
  GeneratedTextColumn get bearerToken =>
      _bearerToken ??= _constructBearerToken();
  GeneratedTextColumn _constructBearerToken() {
    return GeneratedTextColumn(
      'bearer_token',
      $tableName,
      false,
    );
  }

  final VerificationMeta _refreshTokenMeta =
      const VerificationMeta('refreshToken');
  GeneratedTextColumn _refreshToken;
  @override
  GeneratedTextColumn get refreshToken =>
      _refreshToken ??= _constructRefreshToken();
  GeneratedTextColumn _constructRefreshToken() {
    return GeneratedTextColumn(
      'refresh_token',
      $tableName,
      false,
    );
  }

  final VerificationMeta _emailMeta = const VerificationMeta('email');
  GeneratedTextColumn _email;
  @override
  GeneratedTextColumn get email => _email ??= _constructEmail();
  GeneratedTextColumn _constructEmail() {
    return GeneratedTextColumn(
      'email',
      $tableName,
      false,
    );
  }

  final VerificationMeta _avatarMeta = const VerificationMeta('avatar');
  GeneratedTextColumn _avatar;
  @override
  GeneratedTextColumn get avatar => _avatar ??= _constructAvatar();
  GeneratedTextColumn _constructAvatar() {
    return GeneratedTextColumn(
      'avatar',
      $tableName,
      true,
    );
  }

  @override
  List<GeneratedColumn> get $columns =>
      [id, username, status, bearerToken, refreshToken, email, avatar];
  @override
  $UserTableTable get asDslTable => this;
  @override
  String get $tableName => _alias ?? 'user_table';
  @override
  final String actualTableName = 'user_table';
  @override
  VerificationContext validateIntegrity(UserTableCompanion d,
      {bool isInserting = false}) {
    final context = VerificationContext();
    if (d.id.present) {
      context.handle(_idMeta, id.isAcceptableValue(d.id.value, _idMeta));
    } else if (id.isRequired && isInserting) {
      context.missing(_idMeta);
    }
    if (d.username.present) {
      context.handle(_usernameMeta,
          username.isAcceptableValue(d.username.value, _usernameMeta));
    } else if (username.isRequired && isInserting) {
      context.missing(_usernameMeta);
    }
    if (d.status.present) {
      context.handle(
          _statusMeta, status.isAcceptableValue(d.status.value, _statusMeta));
    } else if (status.isRequired && isInserting) {
      context.missing(_statusMeta);
    }
    if (d.bearerToken.present) {
      context.handle(_bearerTokenMeta,
          bearerToken.isAcceptableValue(d.bearerToken.value, _bearerTokenMeta));
    } else if (bearerToken.isRequired && isInserting) {
      context.missing(_bearerTokenMeta);
    }
    if (d.refreshToken.present) {
      context.handle(
          _refreshTokenMeta,
          refreshToken.isAcceptableValue(
              d.refreshToken.value, _refreshTokenMeta));
    } else if (refreshToken.isRequired && isInserting) {
      context.missing(_refreshTokenMeta);
    }
    if (d.email.present) {
      context.handle(
          _emailMeta, email.isAcceptableValue(d.email.value, _emailMeta));
    } else if (email.isRequired && isInserting) {
      context.missing(_emailMeta);
    }
    if (d.avatar.present) {
      context.handle(
          _avatarMeta, avatar.isAcceptableValue(d.avatar.value, _avatarMeta));
    } else if (avatar.isRequired && isInserting) {
      context.missing(_avatarMeta);
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  UserTableData map(Map<String, dynamic> data, {String tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : null;
    return UserTableData.fromData(data, _db, prefix: effectivePrefix);
  }

  @override
  Map<String, Variable> entityToSql(UserTableCompanion d) {
    final map = <String, Variable>{};
    if (d.id.present) {
      map['id'] = Variable<int, IntType>(d.id.value);
    }
    if (d.username.present) {
      map['username'] = Variable<String, StringType>(d.username.value);
    }
    if (d.status.present) {
      map['status'] = Variable<String, StringType>(d.status.value);
    }
    if (d.bearerToken.present) {
      map['bearer_token'] = Variable<String, StringType>(d.bearerToken.value);
    }
    if (d.refreshToken.present) {
      map['refresh_token'] = Variable<String, StringType>(d.refreshToken.value);
    }
    if (d.email.present) {
      map['email'] = Variable<String, StringType>(d.email.value);
    }
    if (d.avatar.present) {
      map['avatar'] = Variable<String, StringType>(d.avatar.value);
    }
    return map;
  }

  @override
  $UserTableTable createAlias(String alias) {
    return $UserTableTable(_db, alias);
  }
}

class TokenTableData extends DataClass implements Insertable<TokenTableData> {
  final int id;
  final String token;
  TokenTableData({@required this.id, @required this.token});
  factory TokenTableData.fromData(
      Map<String, dynamic> data, GeneratedDatabase db,
      {String prefix}) {
    final effectivePrefix = prefix ?? '';
    final intType = db.typeSystem.forDartType<int>();
    final stringType = db.typeSystem.forDartType<String>();
    return TokenTableData(
      id: intType.mapFromDatabaseResponse(data['${effectivePrefix}id']),
      token:
          stringType.mapFromDatabaseResponse(data['${effectivePrefix}token']),
    );
  }
  factory TokenTableData.fromJson(Map<String, dynamic> json,
      {ValueSerializer serializer = const ValueSerializer.defaults()}) {
    return TokenTableData(
      id: serializer.fromJson<int>(json['id']),
      token: serializer.fromJson<String>(json['token']),
    );
  }
  @override
  Map<String, dynamic> toJson(
      {ValueSerializer serializer = const ValueSerializer.defaults()}) {
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'token': serializer.toJson<String>(token),
    };
  }

  @override
  TokenTableCompanion createCompanion(bool nullToAbsent) {
    return TokenTableCompanion(
      id: id == null && nullToAbsent ? const Value.absent() : Value(id),
      token:
          token == null && nullToAbsent ? const Value.absent() : Value(token),
    );
  }

  TokenTableData copyWith({int id, String token}) => TokenTableData(
        id: id ?? this.id,
        token: token ?? this.token,
      );
  @override
  String toString() {
    return (StringBuffer('TokenTableData(')
          ..write('id: $id, ')
          ..write('token: $token')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => $mrjf($mrjc(id.hashCode, token.hashCode));
  @override
  bool operator ==(dynamic other) =>
      identical(this, other) ||
      (other is TokenTableData &&
          other.id == this.id &&
          other.token == this.token);
}

class TokenTableCompanion extends UpdateCompanion<TokenTableData> {
  final Value<int> id;
  final Value<String> token;
  const TokenTableCompanion({
    this.id = const Value.absent(),
    this.token = const Value.absent(),
  });
  TokenTableCompanion.insert({
    this.id = const Value.absent(),
    @required String token,
  }) : token = Value(token);
  TokenTableCompanion copyWith({Value<int> id, Value<String> token}) {
    return TokenTableCompanion(
      id: id ?? this.id,
      token: token ?? this.token,
    );
  }
}

class $TokenTableTable extends TokenTable
    with TableInfo<$TokenTableTable, TokenTableData> {
  final GeneratedDatabase _db;
  final String _alias;
  $TokenTableTable(this._db, [this._alias]);
  final VerificationMeta _idMeta = const VerificationMeta('id');
  GeneratedIntColumn _id;
  @override
  GeneratedIntColumn get id => _id ??= _constructId();
  GeneratedIntColumn _constructId() {
    return GeneratedIntColumn('id', $tableName, false,
        hasAutoIncrement: true, declaredAsPrimaryKey: true);
  }

  final VerificationMeta _tokenMeta = const VerificationMeta('token');
  GeneratedTextColumn _token;
  @override
  GeneratedTextColumn get token => _token ??= _constructToken();
  GeneratedTextColumn _constructToken() {
    return GeneratedTextColumn(
      'token',
      $tableName,
      false,
    );
  }

  @override
  List<GeneratedColumn> get $columns => [id, token];
  @override
  $TokenTableTable get asDslTable => this;
  @override
  String get $tableName => _alias ?? 'token_table';
  @override
  final String actualTableName = 'token_table';
  @override
  VerificationContext validateIntegrity(TokenTableCompanion d,
      {bool isInserting = false}) {
    final context = VerificationContext();
    if (d.id.present) {
      context.handle(_idMeta, id.isAcceptableValue(d.id.value, _idMeta));
    } else if (id.isRequired && isInserting) {
      context.missing(_idMeta);
    }
    if (d.token.present) {
      context.handle(
          _tokenMeta, token.isAcceptableValue(d.token.value, _tokenMeta));
    } else if (token.isRequired && isInserting) {
      context.missing(_tokenMeta);
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  TokenTableData map(Map<String, dynamic> data, {String tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : null;
    return TokenTableData.fromData(data, _db, prefix: effectivePrefix);
  }

  @override
  Map<String, Variable> entityToSql(TokenTableCompanion d) {
    final map = <String, Variable>{};
    if (d.id.present) {
      map['id'] = Variable<int, IntType>(d.id.value);
    }
    if (d.token.present) {
      map['token'] = Variable<String, StringType>(d.token.value);
    }
    return map;
  }

  @override
  $TokenTableTable createAlias(String alias) {
    return $TokenTableTable(_db, alias);
  }
}

class BusinessTableData extends DataClass
    implements Insertable<BusinessTableData> {
  final int id;
  final String name;
  BusinessTableData({@required this.id, @required this.name});
  factory BusinessTableData.fromData(
      Map<String, dynamic> data, GeneratedDatabase db,
      {String prefix}) {
    final effectivePrefix = prefix ?? '';
    final intType = db.typeSystem.forDartType<int>();
    final stringType = db.typeSystem.forDartType<String>();
    return BusinessTableData(
      id: intType.mapFromDatabaseResponse(data['${effectivePrefix}id']),
      name: stringType.mapFromDatabaseResponse(data['${effectivePrefix}name']),
    );
  }
  factory BusinessTableData.fromJson(Map<String, dynamic> json,
      {ValueSerializer serializer = const ValueSerializer.defaults()}) {
    return BusinessTableData(
      id: serializer.fromJson<int>(json['id']),
      name: serializer.fromJson<String>(json['name']),
    );
  }
  @override
  Map<String, dynamic> toJson(
      {ValueSerializer serializer = const ValueSerializer.defaults()}) {
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'name': serializer.toJson<String>(name),
    };
  }

  @override
  BusinessTableCompanion createCompanion(bool nullToAbsent) {
    return BusinessTableCompanion(
      id: id == null && nullToAbsent ? const Value.absent() : Value(id),
      name: name == null && nullToAbsent ? const Value.absent() : Value(name),
    );
  }

  BusinessTableData copyWith({int id, String name}) => BusinessTableData(
        id: id ?? this.id,
        name: name ?? this.name,
      );
  @override
  String toString() {
    return (StringBuffer('BusinessTableData(')
          ..write('id: $id, ')
          ..write('name: $name')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => $mrjf($mrjc(id.hashCode, name.hashCode));
  @override
  bool operator ==(dynamic other) =>
      identical(this, other) ||
      (other is BusinessTableData &&
          other.id == this.id &&
          other.name == this.name);
}

class BusinessTableCompanion extends UpdateCompanion<BusinessTableData> {
  final Value<int> id;
  final Value<String> name;
  const BusinessTableCompanion({
    this.id = const Value.absent(),
    this.name = const Value.absent(),
  });
  BusinessTableCompanion.insert({
    this.id = const Value.absent(),
    @required String name,
  }) : name = Value(name);
  BusinessTableCompanion copyWith({Value<int> id, Value<String> name}) {
    return BusinessTableCompanion(
      id: id ?? this.id,
      name: name ?? this.name,
    );
  }
}

class $BusinessTableTable extends BusinessTable
    with TableInfo<$BusinessTableTable, BusinessTableData> {
  final GeneratedDatabase _db;
  final String _alias;
  $BusinessTableTable(this._db, [this._alias]);
  final VerificationMeta _idMeta = const VerificationMeta('id');
  GeneratedIntColumn _id;
  @override
  GeneratedIntColumn get id => _id ??= _constructId();
  GeneratedIntColumn _constructId() {
    return GeneratedIntColumn('id', $tableName, false,
        hasAutoIncrement: true, declaredAsPrimaryKey: true);
  }

  final VerificationMeta _nameMeta = const VerificationMeta('name');
  GeneratedTextColumn _name;
  @override
  GeneratedTextColumn get name => _name ??= _constructName();
  GeneratedTextColumn _constructName() {
    return GeneratedTextColumn('name', $tableName, false, maxTextLength: 16);
  }

  @override
  List<GeneratedColumn> get $columns => [id, name];
  @override
  $BusinessTableTable get asDslTable => this;
  @override
  String get $tableName => _alias ?? 'business_table';
  @override
  final String actualTableName = 'business_table';
  @override
  VerificationContext validateIntegrity(BusinessTableCompanion d,
      {bool isInserting = false}) {
    final context = VerificationContext();
    if (d.id.present) {
      context.handle(_idMeta, id.isAcceptableValue(d.id.value, _idMeta));
    } else if (id.isRequired && isInserting) {
      context.missing(_idMeta);
    }
    if (d.name.present) {
      context.handle(
          _nameMeta, name.isAcceptableValue(d.name.value, _nameMeta));
    } else if (name.isRequired && isInserting) {
      context.missing(_nameMeta);
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  BusinessTableData map(Map<String, dynamic> data, {String tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : null;
    return BusinessTableData.fromData(data, _db, prefix: effectivePrefix);
  }

  @override
  Map<String, Variable> entityToSql(BusinessTableCompanion d) {
    final map = <String, Variable>{};
    if (d.id.present) {
      map['id'] = Variable<int, IntType>(d.id.value);
    }
    if (d.name.present) {
      map['name'] = Variable<String, StringType>(d.name.value);
    }
    return map;
  }

  @override
  $BusinessTableTable createAlias(String alias) {
    return $BusinessTableTable(_db, alias);
  }
}

abstract class _$Database extends GeneratedDatabase {
  _$Database(QueryExecutor e) : super(SqlTypeSystem.defaultInstance, e);
  $UserTableTable _userTable;
  $UserTableTable get userTable => _userTable ??= $UserTableTable(this);
  $TokenTableTable _tokenTable;
  $TokenTableTable get tokenTable => _tokenTable ??= $TokenTableTable(this);
  $BusinessTableTable _businessTable;
  $BusinessTableTable get businessTable =>
      _businessTable ??= $BusinessTableTable(this);
  UserDao _userDao;
  UserDao get userDao => _userDao ??= UserDao(this as Database);
  TokenDao _tokenDao;
  TokenDao get tokenDao => _tokenDao ??= TokenDao(this as Database);
  BusinessDao _businessDao;
  BusinessDao get businessDao => _businessDao ??= BusinessDao(this as Database);
  @override
  List<TableInfo> get allTables => [userTable, tokenTable, businessTable];
}
