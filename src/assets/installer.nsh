; !macro RunApp
;   ${StdUtils.InvokeShellVerb} $0 "$SYSDIR" "flipper.exe" ${StdUtils.Const.ShellVerb.PinToTaskbar}
; !macroend

!macro customInstall
  ${StdUtils.InvokeShellVerb} $0 $INSTDIR "${APP_FILENAME}.exe" ${StdUtils.Const.ShellVerb.PinToTaskbar}
!macroend

; !macro customInstall
;     !insertmacro RunApp
;     !insertmacro quitSuccess
; !macroend