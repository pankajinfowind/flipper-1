import 'package:enexus/data/models/user.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class LoginState extends Equatable {
  LoginState([List props = const []]) : super(props);
}

class InitialLoginState extends LoginState {}

class IsLoggingState extends LoginState {}

//only login success needs to contain data
class LoggedInState extends LoginState {
  final User loginData;

  LoggedInState(this.loginData) : super([loginData]);
}
