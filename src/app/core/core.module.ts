import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [BrowserModule, CommonModule, BrowserAnimationsModule, HttpClientModule],
  exports: [CommonModule],
})
export class CoreModule {}
