import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class LoginEvent extends Equatable {
  LoginEvent([List props = const []]) : super(props);
}
class GetLogin extends LoginEvent{
  final String username;

  GetLogin(this.username): super([username]);
}
