import { EventEmitter, Injectable } from "@angular/core";

import * as Dot from "dot-object";

import { FlipperConfig } from "./flipper-config.service";
import { AppHttpClientService } from "../http/app-http-client.service";
import { merge } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class Settings {
  public model: { email?: string; password?: string; remember?: boolean } = {
    remember: true
  };
  public countries: String[] = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua & Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia & Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D Ivoire",
    "Croatia",
    "Cruise Ship",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "French West Indies",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyz Republic",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Pierre & Miquelon",
    "Samoa",
    "San Marino",
    "Satellite",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St Kitts & Nevis",
    "St Lucia",
    "St Vincent",
    "St. Lucia",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor L'Este",
    "Togo",
    "Tonga",
    "Trinidad & Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks & Caicos",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (US)",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];
  public errors: { email?: string; password?: string; general?: string } = {};
  public _next_step: boolean;
  public _rest_password: boolean;
  public _loading: boolean;
  public _response = {};
  public _date_object: Date;
  public error_msg: string;
  public error_errors = [];
  public redirect_url: string;
  public does_match_password: boolean;
  public is_dir_empty: boolean;
  gender_list: String[] = ["Male", "Female", "Others"];

  // public current_file_or_folder_selected: YFContract[];
  // private folder_to_update: Subject<YFContract> = new BehaviorSubject<YFContract>(null);
  // folder_to_update$ = this.folder_to_update.asObservable();
  // public current_focused_folder: YFContract;

  public current_path:
    | "home"
    | "bin"
    | "settings"
    | "folder"
    | "projects"
    | "starred"
    | "my-box"
    | any = "my-box";
  public current_query_param = "root";
  public main_side_col = "col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-2 p-2";
  public main_side_col_lg =
    "col-6 col-sm-6 col-md-3 col-lg-4 col-xl-3 mt-2 p-2";

  public state = "active";
  public settings = false;
  public folderId: any;
  public activeFile: File;
  public activeFolder = undefined;
  // public files: YFile[];
  public show_hosting_dashboard = false;
  // public user_settings: User;
  public show_setting_panel = false;

  // for files inputs
  dragFolders: any[] = [];
  dragFiles: any[] = [];
  public selector = ".main-panel";

  // private _user: Subject<User> = new BehaviorSubject<User>(null);
  // _user$ = this._user.asObservable();
  // public current_user: User;
  public is_error: boolean;
  public new_file: any;
  _token: string;
  folder_infiniteScrollPage: number;
  file_infiniteScrollPage: number;
  folder_disableInfinateScroll: boolean;
  file_disableInfinateScroll: boolean;
  wherempty: string;

  set newFile(file) {
    this.new_file = file;
  }
  get newFile() {
    return this.new_file;
  }
  set isError(e: boolean) {
    this.is_error = e;
  }
  get isError(): boolean {
    return this.is_error;
  }

  set token(p: string) {
    this._token = p;
  }
  get token(): string {
    return this._token;
  }
  set folderInfiniteScrollPage(p: number) {
    this.folder_infiniteScrollPage = p;
  }
  get folderInfiniteScrollPage(): number {
    return this.folder_infiniteScrollPage;
  }
  set fileInfiniteScrollPage(p: number) {
    this.file_infiniteScrollPage = p;
  }
  get fileInfiniteScrollPage(): number {
    return this.file_infiniteScrollPage;
  }

  set folderDisableInfinateScroll(dis: boolean) {
    this.folder_disableInfinateScroll = dis;
  }
  get folderDisableInfinateScroll(): boolean {
    return this.folder_disableInfinateScroll;
  }
  set fileDisableInfinateScroll(dis: boolean) {
    this.file_disableInfinateScroll = dis;
  }
  get fileDisableInfinateScroll(): boolean {
    return this.file_disableInfinateScroll;
  }

  set wherEmpty(e: string) {
    this.wherempty = e;
  }
  get wherEmpty(): string {
    return this.wherempty;
  }
  set isDirEmpty(empty: boolean) {
    this.is_dir_empty = empty;
  }
  get isDirEmpty(): boolean {
    return this.is_dir_empty;
  }
  set doesMatchPassword(value: boolean) {
    this.does_match_password = value;
  }
  get doesMatchPassword(): boolean {
    return this.does_match_password;
  }
  set nextStep(value: boolean) {
    this._next_step = value;
  }
  get nextStep(): boolean {
    return this._next_step;
  }
  set restPassword(value: boolean) {
    this._rest_password = value;
  }
  get restPassword(): boolean {
    return this._rest_password;
  }
  set loading(value: boolean) {
    this._loading = value;
  }
  get loading(): boolean {
    return this._loading;
  }

  set response(value: any) {
    this._response = value;
  }
  get response(): any {
    return this._response;
  }
  set date(date: Date) {
    // assuming `date` is something like 1506439684321
    this._date_object = new Date(date);
  }
  get date(): Date {
    return this._date_object;
  }
  set errorMsg(msg: string) {
    this.error_msg = msg;
  }
  get errorMsg(): string {
    return this.error_msg;
  }

  set errorErrors(error_errors: Array<any>) {
    this.error_errors = error_errors;
  }
  get errorErrors(): Array<any> {
    return this.error_errors;
  }
  set redirectUrl(value: string) {
    this.redirect_url = value;
  }
  get redirectUrl(): string {
    return this.redirect_url;
  }
  webTitle(title = "YegoBox") {
    return (document.title = title.charAt(0).toUpperCase() + title.slice(1));
  }

  /**
   * HttpClient Service instance.
   */
  private http: AppHttpClientService;

  /**
   * Public settings.
   */
  private all: FlipperConfig = {};

  /**
   * Backend CSRF TOKEN.
   */
  public csrfToken: string;

  /**
   * Fired when any of the settings are changed manually.
   */
  public onChange: EventEmitter<string> = new EventEmitter();

  /**
   * Set multiple settings on settings service.
   */
  public setMultiple(settings: FlipperConfig) {
    for (const key in settings) {
      let value = settings[key];

      if (value === "0" || value === "1") {
        value = parseInt(value);
      }

      this.set(key, value);
    }
  }

  public merge(config: object) {
    //TODO: this isn't working
    // this.all = merge(this.all, config);
  }

  /**
   * Set single setting.
   */
  public set(
    name: keyof FlipperConfig | any,
    value: FlipperConfig[keyof FlipperConfig] | any,
    fireEvent = false
  ) {
    Dot["set"](name, value, this.all);
    if (fireEvent) this.onChange.emit(name);
  }

  /**
   * Get a setting by key, optionally providing default value.
   */
  public get(name: keyof FlipperConfig | any, defaultValue: any = null): any {
    const value = Dot.pick(name, this.all);

    if (value == null) {
      return defaultValue;
    } else {
      return value;
    }
  }

  /**
   * Get all settings.
   */
  public getAll() {
    return this.all;
  }

  /**
   * Check if setting with specified name exists.
   */
  public has(name: keyof FlipperConfig): boolean {
    return !!Dot.pick(name as string, this.all);
  }

  /**
   * Get a json setting by key and decode it.
   */
  public getJson(name: keyof FlipperConfig, defaultValue: any = null) {
    const value = this.get(name, defaultValue);
    if (typeof value !== "string") return value;
    return JSON.parse(value);
  }

  /**
   * Get base url for the app.
   */
  public getBaseUrl(forceServerUrl = false): string {
    // sometimes we might need to get base url supplied by backend
    // even in development environment, for example, to prevent
    // uploaded images from having proxy urls like "localhost:4200"
    if (
      this.has("base_url") &&
      (this.get("vebto.environment") === "production" || forceServerUrl)
    ) {
      return this.get("base_url") + "/";
    } else if (document.querySelector("base")) {
      return document.querySelector("base")["href"];
    } else {
      const loc = window.location;
      return (
        loc.protocol +
        "//" +
        (loc.host + "/" + loc.pathname).replace("//", "/")
      ).replace(/\/[a-z]+\.html/, "/");
    }
  }

  /**
   * Get app's asset base url.
   */
  public getAssetUrl(suffix?: string): string {
    let uri = this.get("vebto.assetsUrl") || this.getBaseUrl();
    const prefix = this.get("vebto.assetsPrefix");

    // in production assets will be in "client" sub-folder
    if (this.get("vebto.environment") === "production" && prefix) {
      uri += prefix + "/";
    }

    uri += "assets/";

    if (suffix) uri += suffix;

    return uri;
  }

  /**
   * Save specified setting on the server.
   */
  public save(params: { client?: object; server?: object }) {
    this.setMultiple(params.client);
    const encoded = btoa(encodeURIComponent(JSON.stringify(params)));
    return this.http.post("settings", { settings: encoded });
  }

  /**
   * Check if any social login is enabled.
   */
  public anySocialLoginEnabled() {
    const names = ["facebook", "google", "twitter"];
    return (
      names.filter(name => this.get("social." + name + ".enable")).length > -1
    );
  }

  /**
   * Set HttpClient instance.
   */
  public setHttpClient(http: AppHttpClientService) {
    this.http = http;
  }
}
