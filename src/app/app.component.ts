import { Component} from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,private translate: TranslateService) {
             this.translate.setDefaultLang('en');
             console.log('am herrr');
    }
}
