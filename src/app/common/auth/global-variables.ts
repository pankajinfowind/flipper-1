import { Injectable, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorage } from '../core/services/local-storage.service';
import { Router } from '@angular/router';
// import { YFContract } from '@app/contracts/YFContract';
// import { environment } from '@environments/environment';
// import { FileUploader } from 'nupload';
// import { FileType } from '@app/classes/File-type';
// import { User } from '@app/classes/User';
// import { YFile } from '@app/classes/files';
@Injectable({ providedIn: 'root' })
export class GlobalVariables {
    public model: { email?: string; password?: string; remember?: boolean } = {
        remember: true
    };
    constructor(private localStorage: LocalStorage,public router: Router){}
 
    public countries: String[] = [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antigua & Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia',
        'Bosnia & Herzegovina',
        'Botswana',
        'Brazil',
        'British Virgin Islands',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cambodia',
        'Cameroon',
        'Cape Verde',
        'Cayman Islands',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Congo',
        'Cook Islands',
        'Costa Rica',
        'Cote D Ivoire',
        'Croatia',
        'Cruise Ship',
        'Cuba',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Estonia',
        'Ethiopia',
        'Falkland Islands',
        'Faroe Islands',
        'Fiji',
        'Finland',
        'France',
        'French Polynesia',
        'French West Indies',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guam',
        'Guatemala',
        'Guernsey',
        'Guinea',
        'Guinea Bissau',
        'Guyana',
        'Haiti',
        'Honduras',
        'Hong Kong',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Isle of Man',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jersey',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kuwait',
        'Kyrgyz Republic',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macau',
        'Macedonia',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Montserrat',
        'Morocco',
        'Mozambique',
        'Namibia',
        'Nepal',
        'Netherlands',
        'Netherlands Antilles',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'Norway',
        'Oman',
        'Pakistan',
        'Palestine',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatar',
        'Reunion',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Pierre & Miquelon',
        'Samoa',
        'San Marino',
        'Satellite',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'South Africa',
        'South Korea',
        'Spain',
        'Sri Lanka',
        'St Kitts & Nevis',
        'St Lucia',
        'St Vincent',
        'St. Lucia',
        'Sudan',
        'Suriname',
        'Swaziland',
        'Sweden',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        "Timor L'Este",
        'Togo',
        'Tonga',
        'Trinidad & Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Turks & Caicos',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'Uruguay',
        'Uzbekistan',
        'Venezuela',
        'Vietnam',
        'Virgin Islands (US)',
        'Yemen',
        'Zambia',
        'Zimbabwe'
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
    gender_list: String[] = ['Male', 'Female', 'Others'];

    // public current_file_or_folder_selected: YFContract[];
    // private folder_to_update: Subject<YFContract> = new BehaviorSubject<YFContract>(null);
    // folder_to_update$ = this.folder_to_update.asObservable();
    // public current_focused_folder: YFContract;

    public current_path:
        | 'home'
        | 'bin'
        | 'settings'
        | 'folder'
        | 'projects'
        | 'starred'
        | 'my-box'
        | any = 'my-box';
    public current_query_param = 'root';
    public main_side_col = 'col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-2 p-2';
    public main_side_col_lg = 'col-6 col-sm-6 col-md-3 col-lg-4 col-xl-3 mt-2 p-2';
    @Input()
    customize_view: boolean;
    @Input()
    view: string;
    public state = 'active';
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
    public selector = '.main-panel';
    public observe_files: Observable<any>;

    public overlay_display = 'none';
    public uploadbody_display = 'block';
    // tslint:disable-next-line:member-ordering
    // tslint:disable-next-line:max-line-length
    public _token: string;
    // tslint:disable-next-line:max-line-length
    // public uploader: FileUploader = new FileUploader({ url: environment.url + 'files', itemAlias: 'file', headers: [{ name: 'Bearer ', value: this.token }] });
    // tslint:disable-next-line:member-ordering
    public hasAnotherDropZoneOver = false;
    public fileHistory: any[] = [];
    public show_setting_panel_subject = new BehaviorSubject<boolean>(false);
    public show_setting_panel$ = this.show_setting_panel_subject.asObservable();
    public upload_in: number;
    public uplod_complete: any[] = [];
    public upload_total_progress = 0;
    // public selected_files: YFContract[] = [];
    public wherempty: string;
    public folder_disableInfinateScroll = false;
    public file_disableInfinateScroll = false;
    public loaing_on_scroll = false;
    public folder_infiniteScrollPage: number;
    public file_infiniteScrollPage: number;
    @ViewChild('filePicker',{static:true})
    public filePicker: ElementRef;
    @Input()
    fireupload = false;

    // tslint:disable-next-line:max-line-length
    public archive = [
        'zip',
        'x-rar',
        'x-rar-compressed',
        'x-7z-compressed',
        'x-ace-compressed',
        'x-zoo',
        'x-gtar',
        'x-stuffit',
        'x-apple-diskimage',
        'x-dgc-compressed',
        'x-dar',
        'vnd.android.package-archive',
        'x-astrotite-afa',
        'x-b1',
        'x-arj',
        'vnd.ms-cab-compressed'
    ];
    // private _user: Subject<User> = new BehaviorSubject<User>(null);
    // _user$ = this._user.asObservable();
    // public current_user: User;
    public is_error: boolean;
    public new_file: any;

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
    webTitle(title = 'Flipper-') {
        return this.localStorage.set('flipper-title',title);
    }

    // set user(user: any) {
    //   this._user.next(user);
    // }
    // get user(): any {
    //   return this._user$;
    // }
    // set currentUser(user: User) {
    //   this.current_user = user;
    // }
    // get currentUser(): User {
    //   return this.current_user;
    // }
}
