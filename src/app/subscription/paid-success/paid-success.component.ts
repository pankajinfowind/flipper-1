import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-paid-success',
  templateUrl: './paid-success.component.html',
  styleUrls: ['./paid-success.component.scss'],
})
export class PaidSuccessComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PaidSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { success: boolean; event: any }
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close('close')
    }, 10000)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
