class User {
  //check if this model is full
  // ignore: non_constant_identifier_names
  String _access_token;
  User(this._access_token);

  User.map(dynamic obj) {
    this._access_token = obj["access_token"];
  }

  String get token => _access_token;

  Map<String, dynamic> toMap() {
    var map = new Map<String, dynamic>();
    map["access_token"] = _access_token;

    return map;
  }
}
