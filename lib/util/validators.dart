
class Validators{
  static String phoneNumberValidator(String value) {
    Pattern pattern = r'(^(?:[+0]9)?[0-9]{10,12}$)';
    RegExp regex = new RegExp(pattern);
    if (!regex.hasMatch(value))
      return 'Enter Valid Phone Number';
    else
      return null;
  }
  static String isStringHasMoreChars(String value) {
    if (value.length < 4) {
      return 'Name should be greater than 4 characters.';
    } else {
      return null;
    }
  }
}