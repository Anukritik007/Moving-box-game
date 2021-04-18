import {
  Injectable,
  RendererFactory2,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { Observable, Subject, fromEventPattern } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class ListenerService implements OnDestroy {
  private _destroy$ = new Subject();

  public onKeyDown$: Observable<KeyboardEvent>;

  constructor(private rendererFactory2: RendererFactory2) {
    const renderer = this.rendererFactory2.createRenderer(null, null);

    this._createKeydownObservable(renderer);
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _createKeydownObservable(renderer: Renderer2) {
    let removeKeyEventListener: () => void;
    const createKeyEventListener = (
      handler: (e: KeyboardEvent) => boolean | void
    ) => {
      removeKeyEventListener = renderer.listen('document', 'keydown', handler);
    };

    this.onKeyDown$ = fromEventPattern<KeyboardEvent>(
      createKeyEventListener,
      () => removeKeyEventListener()
    ).pipe(takeUntil(this._destroy$));
  }
}
