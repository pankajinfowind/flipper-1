import { Pipe, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RoundNumberPipe {
    transform(nums, decimals = 2) {
        let newString; // The new rounded number
        decimals = Number(decimals);
        if (decimals < 1) {
            newString = Math.round(nums).toString();
        }
        else {
            let numString = nums.toString();
            if (numString.lastIndexOf('.') === -1) {
                // If there is no decimal point
                numString += '.'; // give it one at the end
            }
            let cutoff = numString.lastIndexOf('.') + decimals; // The point at which to truncate the number
            let d1 = Number(numString.substring(cutoff, cutoff + 1)); // The value of the last decimal place that we'll end up with
            const d2 = Number(numString.substring(cutoff + 1, cutoff + 2)); // The next decimal, after the last one we want
            if (d2 >= 5) {
                // Do we need to round up at all? If not, the string will just be truncated
                if (d1 === 9 && cutoff > 0) {
                    // If the last digit is 9, find a new cutoff point
                    while (cutoff > 0 && (d1 === 9 || isNaN(d1))) {
                        if (String(d1) !== '.') {
                            cutoff -= 1;
                            d1 = Number(numString.substring(cutoff, cutoff + 1));
                        }
                        else {
                            cutoff -= 1;
                        }
                    }
                }
                d1 += 1;
            }
            if (d1 === 10) {
                numString = numString.substring(0, numString.lastIndexOf('.'));
                const roundedNum = Number(numString) + 1;
                newString = roundedNum.toString() + '.';
            }
            else {
                newString = numString.substring(0, cutoff) + d1.toString();
            }
        }
        if (decimals > 0) {
            if (newString.lastIndexOf('.') === -1) {
                // Do this again, to the new string
                newString += '.';
            }
            const decs = newString.substring(newString.lastIndexOf('.') + 1).length;
            for (let i = 0; i < decimals - decs; i++) {
                newString += '0';
            }
        }
        // var newNumber = Number(newString);// make it a number if you like
        return this.formatNumbers(newString); // Output the result to the form field (change for your purposes)
    }
    formatNumbers(nums) {
        return nums.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}
RoundNumberPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function RoundNumberPipe_Factory() { return new RoundNumberPipe(); }, token: RoundNumberPipe, providedIn: "root" });
RoundNumberPipe.decorators = [
    { type: Pipe, args: [{
                name: 'roundNumber',
            },] },
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91bmQtbnVtYmVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGlwcGVyLWNvbXBvbmVudHMvc3JjL2xpYi9waXBlL3JvdW5kLW51bWJlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQTs7QUFRL0QsTUFBTSxPQUFPLGVBQWU7SUFDMUIsU0FBUyxDQUFDLElBQVksRUFBRSxXQUFtQixDQUFDO1FBQzFDLElBQUksU0FBUyxDQUFBLENBQUMseUJBQXlCO1FBQ3ZDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDM0IsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1NBQ3hDO2FBQU07WUFDTCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDL0IsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNyQywrQkFBK0I7Z0JBQy9CLFNBQVMsSUFBSSxHQUFHLENBQUEsQ0FBQyx5QkFBeUI7YUFDM0M7WUFDRCxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQSxDQUFDLDRDQUE0QztZQUMvRixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyw2REFBNkQ7WUFDdEgsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLCtDQUErQztZQUM5RyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsMkVBQTJFO2dCQUMzRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsa0RBQWtEO29CQUNsRCxPQUFPLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO3dCQUM1QyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUU7NEJBQ3RCLE1BQU0sSUFBSSxDQUFDLENBQUE7NEJBQ1gsRUFBRSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTt5QkFDckQ7NkJBQU07NEJBQ0wsTUFBTSxJQUFJLENBQUMsQ0FBQTt5QkFDWjtxQkFDRjtpQkFDRjtnQkFDRCxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQ1I7WUFDRCxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2IsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDOUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDeEMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUE7YUFDeEM7aUJBQU07Z0JBQ0wsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTthQUMzRDtTQUNGO1FBQ0QsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDckMsbUNBQW1DO2dCQUNuQyxTQUFTLElBQUksR0FBRyxDQUFBO2FBQ2pCO1lBQ0QsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtZQUN2RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsU0FBUyxJQUFJLEdBQUcsQ0FBQTthQUNqQjtTQUNGO1FBQ0Qsb0VBQW9FO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDLGlFQUFpRTtJQUN4RyxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQUk7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ2xFLENBQUM7Ozs7WUE1REYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxhQUFhO2FBQ3BCO1lBQ0EsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ3JvdW5kTnVtYmVyJyxcclxufSlcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFJvdW5kTnVtYmVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybShudW1zOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIgPSAyKTogYW55IHtcclxuICAgIGxldCBuZXdTdHJpbmcgLy8gVGhlIG5ldyByb3VuZGVkIG51bWJlclxyXG4gICAgZGVjaW1hbHMgPSBOdW1iZXIoZGVjaW1hbHMpXHJcbiAgICBpZiAoZGVjaW1hbHMgPCAxKSB7XHJcbiAgICAgIG5ld1N0cmluZyA9IE1hdGgucm91bmQobnVtcykudG9TdHJpbmcoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IG51bVN0cmluZyA9IG51bXMudG9TdHJpbmcoKVxyXG4gICAgICBpZiAobnVtU3RyaW5nLmxhc3RJbmRleE9mKCcuJykgPT09IC0xKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gZGVjaW1hbCBwb2ludFxyXG4gICAgICAgIG51bVN0cmluZyArPSAnLicgLy8gZ2l2ZSBpdCBvbmUgYXQgdGhlIGVuZFxyXG4gICAgICB9XHJcbiAgICAgIGxldCBjdXRvZmYgPSBudW1TdHJpbmcubGFzdEluZGV4T2YoJy4nKSArIGRlY2ltYWxzIC8vIFRoZSBwb2ludCBhdCB3aGljaCB0byB0cnVuY2F0ZSB0aGUgbnVtYmVyXHJcbiAgICAgIGxldCBkMSA9IE51bWJlcihudW1TdHJpbmcuc3Vic3RyaW5nKGN1dG9mZiwgY3V0b2ZmICsgMSkpIC8vIFRoZSB2YWx1ZSBvZiB0aGUgbGFzdCBkZWNpbWFsIHBsYWNlIHRoYXQgd2UnbGwgZW5kIHVwIHdpdGhcclxuICAgICAgY29uc3QgZDIgPSBOdW1iZXIobnVtU3RyaW5nLnN1YnN0cmluZyhjdXRvZmYgKyAxLCBjdXRvZmYgKyAyKSkgLy8gVGhlIG5leHQgZGVjaW1hbCwgYWZ0ZXIgdGhlIGxhc3Qgb25lIHdlIHdhbnRcclxuICAgICAgaWYgKGQyID49IDUpIHtcclxuICAgICAgICAvLyBEbyB3ZSBuZWVkIHRvIHJvdW5kIHVwIGF0IGFsbD8gSWYgbm90LCB0aGUgc3RyaW5nIHdpbGwganVzdCBiZSB0cnVuY2F0ZWRcclxuICAgICAgICBpZiAoZDEgPT09IDkgJiYgY3V0b2ZmID4gMCkge1xyXG4gICAgICAgICAgLy8gSWYgdGhlIGxhc3QgZGlnaXQgaXMgOSwgZmluZCBhIG5ldyBjdXRvZmYgcG9pbnRcclxuICAgICAgICAgIHdoaWxlIChjdXRvZmYgPiAwICYmIChkMSA9PT0gOSB8fCBpc05hTihkMSkpKSB7XHJcbiAgICAgICAgICAgIGlmIChTdHJpbmcoZDEpICE9PSAnLicpIHtcclxuICAgICAgICAgICAgICBjdXRvZmYgLT0gMVxyXG4gICAgICAgICAgICAgIGQxID0gTnVtYmVyKG51bVN0cmluZy5zdWJzdHJpbmcoY3V0b2ZmLCBjdXRvZmYgKyAxKSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjdXRvZmYgLT0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGQxICs9IDFcclxuICAgICAgfVxyXG4gICAgICBpZiAoZDEgPT09IDEwKSB7XHJcbiAgICAgICAgbnVtU3RyaW5nID0gbnVtU3RyaW5nLnN1YnN0cmluZygwLCBudW1TdHJpbmcubGFzdEluZGV4T2YoJy4nKSlcclxuICAgICAgICBjb25zdCByb3VuZGVkTnVtID0gTnVtYmVyKG51bVN0cmluZykgKyAxXHJcbiAgICAgICAgbmV3U3RyaW5nID0gcm91bmRlZE51bS50b1N0cmluZygpICsgJy4nXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3U3RyaW5nID0gbnVtU3RyaW5nLnN1YnN0cmluZygwLCBjdXRvZmYpICsgZDEudG9TdHJpbmcoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoZGVjaW1hbHMgPiAwKSB7XHJcbiAgICAgIGlmIChuZXdTdHJpbmcubGFzdEluZGV4T2YoJy4nKSA9PT0gLTEpIHtcclxuICAgICAgICAvLyBEbyB0aGlzIGFnYWluLCB0byB0aGUgbmV3IHN0cmluZ1xyXG4gICAgICAgIG5ld1N0cmluZyArPSAnLidcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkZWNzID0gbmV3U3RyaW5nLnN1YnN0cmluZyhuZXdTdHJpbmcubGFzdEluZGV4T2YoJy4nKSArIDEpLmxlbmd0aFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlY2ltYWxzIC0gZGVjczsgaSsrKSB7XHJcbiAgICAgICAgbmV3U3RyaW5nICs9ICcwJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyB2YXIgbmV3TnVtYmVyID0gTnVtYmVyKG5ld1N0cmluZyk7Ly8gbWFrZSBpdCBhIG51bWJlciBpZiB5b3UgbGlrZVxyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0TnVtYmVycyhuZXdTdHJpbmcpIC8vIE91dHB1dCB0aGUgcmVzdWx0IHRvIHRoZSBmb3JtIGZpZWxkIChjaGFuZ2UgZm9yIHlvdXIgcHVycG9zZXMpXHJcbiAgfVxyXG5cclxuICBmb3JtYXROdW1iZXJzKG51bXMpIHtcclxuICAgIHJldHVybiBudW1zLnRvU3RyaW5nKCkucmVwbGFjZSgvKFxcZCkoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnJDEsJylcclxuICB9XHJcbn1cclxuIl19