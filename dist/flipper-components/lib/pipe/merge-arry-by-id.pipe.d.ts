import { PipeTransform } from '@angular/core';
export declare class MergeArryByIdPipe implements PipeTransform {
    transform<T>(originArrayData: Array<T>, mergeArrayData: Array<T>): Array<T>;
    mergeById(arr: any): {
        with(arr2: any): any;
    };
}
//# sourceMappingURL=merge-arry-by-id.pipe.d.ts.map