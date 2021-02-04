import { FlipperComponentsModule } from '@enexus/flipper-components';
import { NgModule } from '@angular/core';
import { FlipperBasicPosComponent } from './basic/flipper-basic-pos.component';
import { VendorsModule } from '@enexus/flipper-vendors';
import { SearchBoxComponent } from './common/search-box/search-box.component';
import { AutocompleteComponent } from './common/autocomplete/autocomplete.component';
import { ShoppingListsComponent } from './common/shopping-lists/shopping-lists.component';
import { BasicShoppingListComponent } from './common/basic-shopping-list/basic-shopping-list.component';
import { StandardShoppingListComponent } from './common/standard-shopping-list/standard-shopping-list.component';
import { CalculatorComponent } from './common/calculator/calculator.component';
import { DialogModule } from '@enexus/flipper-dialog';
import { CommonModule } from '@angular/common';
import { UpdatePriceDialogComponent } from './common/update-price-dialog/update-price-dialog.component';
import { AddCartItemDialogComponent } from './common/add-cart-item-dialog/add-cart-item-dialog.component';
import { FlipperPosComponent } from './flipper-pos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
export class FlipperPosModule {
}
FlipperPosModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FlipperBasicPosComponent,
                    SearchBoxComponent,
                    AutocompleteComponent,
                    ShoppingListsComponent,
                    BasicShoppingListComponent,
                    StandardShoppingListComponent,
                    CalculatorComponent,
                    UpdatePriceDialogComponent,
                    AddCartItemDialogComponent,
                    FlipperPosComponent,
                ],
                imports: [
                    CommonModule,
                    HttpClientModule,
                    FlipperComponentsModule,
                    BrowserAnimationsModule,
                    BrowserModule,
                    VendorsModule,
                    DialogModule,
                ],
                entryComponents: [UpdatePriceDialogComponent, AddCartItemDialogComponent],
                exports: [
                    FlipperBasicPosComponent,
                    SearchBoxComponent,
                    AutocompleteComponent,
                    ShoppingListsComponent,
                    BasicShoppingListComponent,
                    StandardShoppingListComponent,
                    CalculatorComponent,
                    FlipperPosComponent,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcHBlci1wb3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZmxpcHBlci1wb3Mvc3JjL2xpYi9mbGlwcGVyLXBvcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQTtBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMENBQTBDLENBQUE7QUFDN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOENBQThDLENBQUE7QUFDcEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0RBQWtELENBQUE7QUFDekYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNERBQTRELENBQUE7QUFDdkcsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sa0VBQWtFLENBQUE7QUFDaEgsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUE7QUFDOUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUM5QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQTtBQUN2RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQTtBQUN6RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUM3RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQTtBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFzQ3ZELE1BQU0sT0FBTyxnQkFBZ0I7OztZQXBDNUIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWix3QkFBd0I7b0JBQ3hCLGtCQUFrQjtvQkFDbEIscUJBQXFCO29CQUNyQixzQkFBc0I7b0JBQ3RCLDBCQUEwQjtvQkFDMUIsNkJBQTZCO29CQUM3QixtQkFBbUI7b0JBQ25CLDBCQUEwQjtvQkFDMUIsMEJBQTBCO29CQUMxQixtQkFBbUI7aUJBQ3BCO2dCQUVELE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixZQUFZO2lCQUNiO2dCQUNELGVBQWUsRUFBRSxDQUFDLDBCQUEwQixFQUFFLDBCQUEwQixDQUFDO2dCQUV6RSxPQUFPLEVBQUU7b0JBQ1Asd0JBQXdCO29CQUN4QixrQkFBa0I7b0JBQ2xCLHFCQUFxQjtvQkFDckIsc0JBQXNCO29CQUN0QiwwQkFBMEI7b0JBQzFCLDZCQUE2QjtvQkFDN0IsbUJBQW1CO29CQUNuQixtQkFBbUI7aUJBQ3BCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGbGlwcGVyQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJ0BlbmV4dXMvZmxpcHBlci1jb21wb25lbnRzJ1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7IEZsaXBwZXJCYXNpY1Bvc0NvbXBvbmVudCB9IGZyb20gJy4vYmFzaWMvZmxpcHBlci1iYXNpYy1wb3MuY29tcG9uZW50J1xyXG5pbXBvcnQgeyBWZW5kb3JzTW9kdWxlIH0gZnJvbSAnQGVuZXh1cy9mbGlwcGVyLXZlbmRvcnMnXHJcbmltcG9ydCB7IFNlYXJjaEJveENvbXBvbmVudCB9IGZyb20gJy4vY29tbW9uL3NlYXJjaC1ib3gvc2VhcmNoLWJveC5jb21wb25lbnQnXHJcbmltcG9ydCB7IEF1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vY29tbW9uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50J1xyXG5pbXBvcnQgeyBTaG9wcGluZ0xpc3RzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21tb24vc2hvcHBpbmctbGlzdHMvc2hvcHBpbmctbGlzdHMuY29tcG9uZW50J1xyXG5pbXBvcnQgeyBCYXNpY1Nob3BwaW5nTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tbW9uL2Jhc2ljLXNob3BwaW5nLWxpc3QvYmFzaWMtc2hvcHBpbmctbGlzdC5jb21wb25lbnQnXHJcbmltcG9ydCB7IFN0YW5kYXJkU2hvcHBpbmdMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21tb24vc3RhbmRhcmQtc2hvcHBpbmctbGlzdC9zdGFuZGFyZC1zaG9wcGluZy1saXN0LmNvbXBvbmVudCdcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckNvbXBvbmVudCB9IGZyb20gJy4vY29tbW9uL2NhbGN1bGF0b3IvY2FsY3VsYXRvci5jb21wb25lbnQnXHJcbmltcG9ydCB7IERpYWxvZ01vZHVsZSB9IGZyb20gJ0BlbmV4dXMvZmxpcHBlci1kaWFsb2cnXHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcclxuaW1wb3J0IHsgVXBkYXRlUHJpY2VEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbW1vbi91cGRhdGUtcHJpY2UtZGlhbG9nL3VwZGF0ZS1wcmljZS1kaWFsb2cuY29tcG9uZW50J1xyXG5pbXBvcnQgeyBBZGRDYXJ0SXRlbURpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tbW9uL2FkZC1jYXJ0LWl0ZW0tZGlhbG9nL2FkZC1jYXJ0LWl0ZW0tZGlhbG9nLmNvbXBvbmVudCdcclxuaW1wb3J0IHsgRmxpcHBlclBvc0NvbXBvbmVudCB9IGZyb20gJy4vZmxpcHBlci1wb3MuY29tcG9uZW50J1xyXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucydcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInXHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBGbGlwcGVyQmFzaWNQb3NDb21wb25lbnQsXHJcbiAgICBTZWFyY2hCb3hDb21wb25lbnQsXHJcbiAgICBBdXRvY29tcGxldGVDb21wb25lbnQsXHJcbiAgICBTaG9wcGluZ0xpc3RzQ29tcG9uZW50LFxyXG4gICAgQmFzaWNTaG9wcGluZ0xpc3RDb21wb25lbnQsXHJcbiAgICBTdGFuZGFyZFNob3BwaW5nTGlzdENvbXBvbmVudCxcclxuICAgIENhbGN1bGF0b3JDb21wb25lbnQsXHJcbiAgICBVcGRhdGVQcmljZURpYWxvZ0NvbXBvbmVudCxcclxuICAgIEFkZENhcnRJdGVtRGlhbG9nQ29tcG9uZW50LFxyXG4gICAgRmxpcHBlclBvc0NvbXBvbmVudCxcclxuICBdLFxyXG5cclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgRmxpcHBlckNvbXBvbmVudHNNb2R1bGUsXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEJyb3dzZXJNb2R1bGUsXHJcbiAgICBWZW5kb3JzTW9kdWxlLFxyXG4gICAgRGlhbG9nTW9kdWxlLFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbVXBkYXRlUHJpY2VEaWFsb2dDb21wb25lbnQsIEFkZENhcnRJdGVtRGlhbG9nQ29tcG9uZW50XSxcclxuXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRmxpcHBlckJhc2ljUG9zQ29tcG9uZW50LFxyXG4gICAgU2VhcmNoQm94Q29tcG9uZW50LFxyXG4gICAgQXV0b2NvbXBsZXRlQ29tcG9uZW50LFxyXG4gICAgU2hvcHBpbmdMaXN0c0NvbXBvbmVudCxcclxuICAgIEJhc2ljU2hvcHBpbmdMaXN0Q29tcG9uZW50LFxyXG4gICAgU3RhbmRhcmRTaG9wcGluZ0xpc3RDb21wb25lbnQsXHJcbiAgICBDYWxjdWxhdG9yQ29tcG9uZW50LFxyXG4gICAgRmxpcHBlclBvc0NvbXBvbmVudCxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxpcHBlclBvc01vZHVsZSB7fVxyXG4iXX0=