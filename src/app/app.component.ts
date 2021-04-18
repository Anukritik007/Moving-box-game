import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListenerService } from './listener.service';
import { Subscription } from 'rxjs';
import { IBox } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  public title = 'Moveable box generator';
  public boxes: Array<IBox> = [];
  public totalBoxes: number = 0;
  public selectedBoxId?: number;
  public subscription: Subscription;

  constructor(private _listenerService: ListenerService) {}

  public ngOnInit(): void {
    this._subscribeToListener();
  }

  public onAddClick = () => {
    this.totalBoxes += 1;
    this.boxes.push({
      id: this.totalBoxes,
      top: 0,
      left: 0,
    });
  };

  public onBoxClick = (boxId_: number) => {
    this.selectedBoxId = boxId_;
    console.log('Selected box for movement: ', this.selectedBoxId);
  };

  /**
   * Toggles keyboard control by unsubscribing/subscribing to the listener
   */
  public onToggleControl = () => {
    console.log(this.subscription);
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    } else {
      this._subscribeToListener();
    }
  };

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private _subscribeToListener = () => {
    this.subscription = this._listenerService.onKeyDown$.subscribe(
      (e: KeyboardEvent) => {
        console.log('KeyCode:', e.keyCode);
        this._moveOnKeyStroke(e.keyCode);
      }
    );
  };

  /**
   * Moves the boxes depending on keys pressed
   * @param keyCode_
   */
  private _moveOnKeyStroke = (keyCode_: number) => {
    if (this.selectedBoxId) {
      switch (keyCode_) {
        case 65:
        case 37:
          //move left
          this.boxes = this.boxes.map((box) => {
            if (box.id === this.selectedBoxId) {
              return {
                ...box,
                left: box.left - 100,
              };
            }
            return box;
          });
          break;
        case 68:
        case 39:
          //move right
          this.boxes = this.boxes.map((box) => {
            if (box.id === this.selectedBoxId) {
              return {
                ...box,
                left: box.left + 100,
              };
            }
            return box;
          });
          break;
        case 87:
        case 38:
          //move up
          this.boxes = this.boxes.map((box) => {
            if (box.id === this.selectedBoxId) {
              return {
                ...box,
                top: box.top - 100,
              };
            }
            return box;
          });
          break;
        case 83:
        case 40:
          //move down
          this.boxes = this.boxes.map((box) => {
            if (box.id === this.selectedBoxId) {
              return {
                ...box,
                top: box.top + 100,
              };
            }
            return box;
          });
          break;
        case 8:
        case 46:
          //delete box
          this.boxes = this.boxes.filter(
            (box) => box.id !== this.selectedBoxId
          );
        default:
          console.log('No movement');
      }
    }
  };
}
