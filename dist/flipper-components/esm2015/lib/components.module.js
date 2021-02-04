import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyIfDirective } from './lazy-if.directive';
import { VendorsModule } from '@enexus/flipper-vendors';
import { RouterProgressComponent } from './router-progress/router-progress.component';
import { HeaderComponent } from './header/header.component';
import { TableOverlayComponent } from './table-overlay/table-overlay.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MessageComponent } from './message/message.component';
import { ColorModule } from '@enexus/flipper-color';
import { FlipperEventModule } from '@enexus/flipper-event';
import { DialogModule } from '@enexus/flipper-dialog';
import { RoundNumberPipe } from './pipe/round-number.pipe';
import { CalculateTotalClassPipe } from './pipe/calculate-total-class.pipe';
import { MatchHeightDirective } from './directive/match-height.directive';
import { MergeArryByIdPipe } from './pipe/merge-arry-by-id.pipe';
import { ArrayRemoveItemPipe } from './pipe/array-remove-item.pipe';
import { FindKeyPipe } from './pipe/find-key.pipe';
import { NotificationListComponent } from './notifications/notification.component';
import { NotificationService } from './notifications/notification.service';
import { GenerateBarcodeComponent } from './generate-barcode/generate-barcode.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';
import { HttpClientModule } from '@angular/common/http';
export class FlipperComponentsModule {
}
FlipperComponentsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    HttpClientModule,
                    CommonModule,
                    VendorsModule,
                    ColorModule,
                    FlipperEventModule,
                    DialogModule,
                    NgxBarcodeModule,
                ],
                declarations: [
                    LoadingIconComponent,
                    NotificationListComponent,
                    RouterProgressComponent,
                    HeaderComponent,
                    TableOverlayComponent,
                    SpinnerComponent,
                    MessageComponent,
                    LazyIfDirective,
                    RoundNumberPipe,
                    CalculateTotalClassPipe,
                    MatchHeightDirective,
                    MergeArryByIdPipe,
                    ArrayRemoveItemPipe,
                    FindKeyPipe,
                    GenerateBarcodeComponent,
                ],
                exports: [
                    LoadingIconComponent,
                    RouterProgressComponent,
                    NotificationListComponent,
                    HeaderComponent,
                    TableOverlayComponent,
                    SpinnerComponent,
                    MessageComponent,
                    LazyIfDirective,
                    RoundNumberPipe,
                    CalculateTotalClassPipe,
                    MergeArryByIdPipe,
                    ArrayRemoveItemPipe,
                    MatchHeightDirective,
                    FindKeyPipe,
                    GenerateBarcodeComponent,
                ],
                entryComponents: [],
                providers: [
                    NotificationService,
                    RoundNumberPipe,
                    CalculateTotalClassPipe,
                    MergeArryByIdPipe,
                    ArrayRemoveItemPipe,
                    FindKeyPipe,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLWNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFBO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFBO0FBQ3JGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUMzRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQTtBQUMvRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQTtBQUMxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUMzRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQTtBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQTtBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQTtBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFDbEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sd0NBQXdDLENBQUE7QUFDbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUE7QUFDMUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUE7QUFDeEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQzlDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFBO0FBQzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBeUR2RCxNQUFNLE9BQU8sdUJBQXVCOzs7WUF4RG5DLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsZ0JBQWdCO29CQUNoQixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsV0FBVztvQkFDWCxrQkFBa0I7b0JBQ2xCLFlBQVk7b0JBQ1osZ0JBQWdCO2lCQUNqQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osb0JBQW9CO29CQUNwQix5QkFBeUI7b0JBQ3pCLHVCQUF1QjtvQkFDdkIsZUFBZTtvQkFDZixxQkFBcUI7b0JBQ3JCLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsdUJBQXVCO29CQUN2QixvQkFBb0I7b0JBQ3BCLGlCQUFpQjtvQkFDakIsbUJBQW1CO29CQUNuQixXQUFXO29CQUNYLHdCQUF3QjtpQkFDekI7Z0JBRUQsT0FBTyxFQUFFO29CQUNQLG9CQUFvQjtvQkFDcEIsdUJBQXVCO29CQUN2Qix5QkFBeUI7b0JBQ3pCLGVBQWU7b0JBQ2YscUJBQXFCO29CQUNyQixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFFZixlQUFlO29CQUNmLHVCQUF1QjtvQkFDdkIsaUJBQWlCO29CQUNqQixtQkFBbUI7b0JBQ25CLG9CQUFvQjtvQkFDcEIsV0FBVztvQkFDWCx3QkFBd0I7aUJBQ3pCO2dCQUNELGVBQWUsRUFBRSxFQUFFO2dCQUNuQixTQUFTLEVBQUU7b0JBQ1QsbUJBQW1CO29CQUNuQixlQUFlO29CQUNmLHVCQUF1QjtvQkFDdkIsaUJBQWlCO29CQUNqQixtQkFBbUI7b0JBQ25CLFdBQVc7aUJBQ1o7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xyXG5pbXBvcnQgeyBMYXp5SWZEaXJlY3RpdmUgfSBmcm9tICcuL2xhenktaWYuZGlyZWN0aXZlJ1xyXG5pbXBvcnQgeyBWZW5kb3JzTW9kdWxlIH0gZnJvbSAnQGVuZXh1cy9mbGlwcGVyLXZlbmRvcnMnXHJcbmltcG9ydCB7IFJvdXRlclByb2dyZXNzQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZXItcHJvZ3Jlc3Mvcm91dGVyLXByb2dyZXNzLmNvbXBvbmVudCdcclxuaW1wb3J0IHsgSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCdcclxuaW1wb3J0IHsgVGFibGVPdmVybGF5Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1vdmVybGF5L3RhYmxlLW92ZXJsYXkuY29tcG9uZW50J1xyXG5pbXBvcnQgeyBTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zcGlubmVyL3NwaW5uZXIuY29tcG9uZW50J1xyXG5pbXBvcnQgeyBNZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50J1xyXG5pbXBvcnQgeyBDb2xvck1vZHVsZSB9IGZyb20gJ0BlbmV4dXMvZmxpcHBlci1jb2xvcidcclxuaW1wb3J0IHsgRmxpcHBlckV2ZW50TW9kdWxlIH0gZnJvbSAnQGVuZXh1cy9mbGlwcGVyLWV2ZW50J1xyXG5pbXBvcnQgeyBEaWFsb2dNb2R1bGUgfSBmcm9tICdAZW5leHVzL2ZsaXBwZXItZGlhbG9nJ1xyXG5pbXBvcnQgeyBSb3VuZE51bWJlclBpcGUgfSBmcm9tICcuL3BpcGUvcm91bmQtbnVtYmVyLnBpcGUnXHJcbmltcG9ydCB7IENhbGN1bGF0ZVRvdGFsQ2xhc3NQaXBlIH0gZnJvbSAnLi9waXBlL2NhbGN1bGF0ZS10b3RhbC1jbGFzcy5waXBlJ1xyXG5pbXBvcnQgeyBNYXRjaEhlaWdodERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL21hdGNoLWhlaWdodC5kaXJlY3RpdmUnXHJcbmltcG9ydCB7IE1lcmdlQXJyeUJ5SWRQaXBlIH0gZnJvbSAnLi9waXBlL21lcmdlLWFycnktYnktaWQucGlwZSdcclxuaW1wb3J0IHsgQXJyYXlSZW1vdmVJdGVtUGlwZSB9IGZyb20gJy4vcGlwZS9hcnJheS1yZW1vdmUtaXRlbS5waXBlJ1xyXG5pbXBvcnQgeyBGaW5kS2V5UGlwZSB9IGZyb20gJy4vcGlwZS9maW5kLWtleS5waXBlJ1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbi5jb21wb25lbnQnXHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWNhdGlvbnMvbm90aWZpY2F0aW9uLnNlcnZpY2UnXHJcbmltcG9ydCB7IEdlbmVyYXRlQmFyY29kZUNvbXBvbmVudCB9IGZyb20gJy4vZ2VuZXJhdGUtYmFyY29kZS9nZW5lcmF0ZS1iYXJjb2RlLmNvbXBvbmVudCdcclxuaW1wb3J0IHsgTmd4QmFyY29kZU1vZHVsZSB9IGZyb20gJ25neC1iYXJjb2RlJ1xyXG5pbXBvcnQgeyBMb2FkaW5nSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vbG9hZGluZy1pY29uL2xvYWRpbmctaWNvbi5jb21wb25lbnQnXHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgVmVuZG9yc01vZHVsZSxcclxuICAgIENvbG9yTW9kdWxlLFxyXG4gICAgRmxpcHBlckV2ZW50TW9kdWxlLFxyXG4gICAgRGlhbG9nTW9kdWxlLFxyXG4gICAgTmd4QmFyY29kZU1vZHVsZSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTG9hZGluZ0ljb25Db21wb25lbnQsXHJcbiAgICBOb3RpZmljYXRpb25MaXN0Q29tcG9uZW50LFxyXG4gICAgUm91dGVyUHJvZ3Jlc3NDb21wb25lbnQsXHJcbiAgICBIZWFkZXJDb21wb25lbnQsXHJcbiAgICBUYWJsZU92ZXJsYXlDb21wb25lbnQsXHJcbiAgICBTcGlubmVyQ29tcG9uZW50LFxyXG4gICAgTWVzc2FnZUNvbXBvbmVudCxcclxuICAgIExhenlJZkRpcmVjdGl2ZSxcclxuICAgIFJvdW5kTnVtYmVyUGlwZSxcclxuICAgIENhbGN1bGF0ZVRvdGFsQ2xhc3NQaXBlLFxyXG4gICAgTWF0Y2hIZWlnaHREaXJlY3RpdmUsXHJcbiAgICBNZXJnZUFycnlCeUlkUGlwZSxcclxuICAgIEFycmF5UmVtb3ZlSXRlbVBpcGUsXHJcbiAgICBGaW5kS2V5UGlwZSxcclxuICAgIEdlbmVyYXRlQmFyY29kZUNvbXBvbmVudCxcclxuICBdLFxyXG5cclxuICBleHBvcnRzOiBbXHJcbiAgICBMb2FkaW5nSWNvbkNvbXBvbmVudCxcclxuICAgIFJvdXRlclByb2dyZXNzQ29tcG9uZW50LFxyXG4gICAgTm90aWZpY2F0aW9uTGlzdENvbXBvbmVudCxcclxuICAgIEhlYWRlckNvbXBvbmVudCxcclxuICAgIFRhYmxlT3ZlcmxheUNvbXBvbmVudCxcclxuICAgIFNwaW5uZXJDb21wb25lbnQsXHJcbiAgICBNZXNzYWdlQ29tcG9uZW50LFxyXG4gICAgTGF6eUlmRGlyZWN0aXZlLFxyXG5cclxuICAgIFJvdW5kTnVtYmVyUGlwZSxcclxuICAgIENhbGN1bGF0ZVRvdGFsQ2xhc3NQaXBlLFxyXG4gICAgTWVyZ2VBcnJ5QnlJZFBpcGUsXHJcbiAgICBBcnJheVJlbW92ZUl0ZW1QaXBlLFxyXG4gICAgTWF0Y2hIZWlnaHREaXJlY3RpdmUsXHJcbiAgICBGaW5kS2V5UGlwZSxcclxuICAgIEdlbmVyYXRlQmFyY29kZUNvbXBvbmVudCxcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW10sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxyXG4gICAgUm91bmROdW1iZXJQaXBlLFxyXG4gICAgQ2FsY3VsYXRlVG90YWxDbGFzc1BpcGUsXHJcbiAgICBNZXJnZUFycnlCeUlkUGlwZSxcclxuICAgIEFycmF5UmVtb3ZlSXRlbVBpcGUsXHJcbiAgICBGaW5kS2V5UGlwZSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxpcHBlckNvbXBvbmVudHNNb2R1bGUge31cclxuZGVjbGFyZSBtb2R1bGUgJ0Bhbmd1bGFyL2NvcmUnIHtcclxuICBpbnRlcmZhY2UgTW9kdWxlV2l0aFByb3ZpZGVyczxUID0gYW55PiB7XHJcbiAgICBuZ01vZHVsZTogVHlwZTxUPlxyXG4gICAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXVxyXG4gIH1cclxufVxyXG4iXX0=