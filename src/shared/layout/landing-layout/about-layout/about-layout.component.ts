import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { LeadsDialogComponent } from '@shared/dialog';
import { ScrollSectionDirective } from '@shared/directives';
import { DestroyService } from '@shared/services';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-about-layout',
  standalone: true,
  imports: [CommonModule, LeadsDialogComponent, ScrollSectionDirective],
  templateUrl: './about-layout.component.html',
  styleUrls: ['./about-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutLayoutComponent {
  @ViewChild('carouselAboutElement') public carouselAboutElement!: ElementRef;

  public firstLeadDialogsDescription: string = 'הסדרי הפנסיה מספקים מקור הכנסה אמין במהלך שנות הזהב שלכם, ומאפשרים' +
    ' לכם לשמור על רמת החיים שלכם וליהנות מפירות עמלכם.';
  public secondLeadDialogsDescription: string = 'הסדרי הפנסיה מספקים מקור הכנסה אמין במהלך שנות הזהב שלכם, ומאפשרים' +
    ' לכם לשמור על רמת החיים שלכם וליהנות מפירות עמלכם.';
  public thirdLeadDialogsDescription: string = 'הסדרי הפנסיה מספקים מקור הכנסה אמין במהלך שנות הזהב שלכם, ומאפשרים' +
    ' לכם לשמור על רמת החיים שלכם וליהנות מפירות עמלכם.';
  public fourthLeadDialogsDescription: string = 'הסדרי הפנסיה מספקים מקור הכנסה אמין במהלך שנות הזהב שלכם, ומאפשרים' +
    ' לכם לשמור על רמת החיים שלכם וליהנות מפירות עמלכם.';
  public firstHeaderText: string = 'הכנה לטופס 161';
  public secondHeaderText: string = 'הכנה לטופס 161';
  public thirdHeaderText: string = 'מנהל תיק אישי';
  public fourthHeaderText: string = 'הסדר פנסיה';
  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
  ) {
  }

  public openLeadsDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      dismissible: false,
      size: 'auto',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public carouselMove(direction: 'right' | 'left'): void {
    this.carouselAboutElement.nativeElement.scrollBy({
      behavior: 'smooth',
      left: direction === 'left' ? -400 : 400,
    });
  }
}
