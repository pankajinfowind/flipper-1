import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:enexus/data/rest.dart';
import './bloc.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  RestDatasource api = new RestDatasource();
  @override
  LoginState get initialState => InitialLoginState();

  @override
  Stream<LoginState> mapEventToState(
    LoginEvent event,
  ) async* {
    if (event is GetLogin) {
      yield IsLoggingState();
      final login = await api.login(event.username, event.password);
      yield LoggedInState(login);
    }
  }
}
