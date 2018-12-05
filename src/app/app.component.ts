import { Component } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang("en");
<<<<<<< HEAD
=======
    console.log("AppConfig", AppConfig);

    if (electronService.isElectron()) {
      console.log("Mode electron");
      console.log("Electron ipcRenderer", electronService.ipcRenderer);
      console.log("NodeJS childProcess", electronService.childProcess);
      console.log("version", electronService.app);
    } else {
      console.log("Mode web");
    }
>>>>>>> c04d6071275138cad32978a2dcd3dc42e7270ece
  }
}
