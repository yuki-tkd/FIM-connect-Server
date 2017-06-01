import * as Util from '../common/util';
import * as _ from 'lodash'

export function init() {
  let alertManager = new AlertManager(<HTMLElement>document.querySelector('#alert-list'));

  let addr = 'ws://' + location.host;
  let websocket = new WebSocket(addr, ['json']);
  
  websocket.onopen = function() {

  };
  // Log errors
  websocket.onerror = function (error) {
    console.log('WebSocket Error ' + error);
  };
  // Log messages from the server
  websocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    data.forEach( (val) => {
      alertManager.update(val);
    });
  };

}

class AlertManager {
  alertList: HTMLElement;
  alertViews;

  constructor(alertList: HTMLElement) {
    this.alertList = alertList;
    this.alertViews = {};
  }

  update(alert): void {
    const id = alert.id;
    if(id in this.alertViews) {
      this.updateAlert(alert);
    } else {
      this.alertViews[id] = this.createAlert(alert);
    }
  }

  createAlert(val): AlertView {
    const view = new AlertView(val.id, val.roomNumber, val.name, val.date, val.priority);
    view.create(this.alertList);
    view.setTimer(_.partial(this.timeout, val).bind(this), 10000)
    return view;
  }

  updateAlert(val): void {
    const view = this.alertViews[val.id];
    view.resetTimer(_.partial(this.timeout, val).bind(this), 10000)
    view.update(val);
  }

  timeout(val): void {
    const view = this.alertViews[val.id];
    view.remove(this.alertList);
    delete this.alertViews[val.id];
  }
}

class AlertView {
  private view: HTMLElement;
  private id: number;
  private roomNumber: number;
  private name: string;
  private date: string;
  private priority: number;
  private timer;

  constructor(id, roomNumber, name, date, priority) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.name = name;
    this.date = date;
    this.priority = priority;
  }

  setTimer(func, time): void {
    this.timer = window.setTimeout(func, time);
  }

  resetTimer(func, time): void {
    window.clearTimeout(this.timer);
    this.setTimer(func, time);
  }

  create(p: HTMLElement): void {
    const alertTmpl = <HTMLTemplateElement>document.querySelector('#alert-template');
    const clone = <HTMLElement>document.importNode(alertTmpl.content, true);
    const alert = clone.querySelector('.alert');
    const incident = clone.querySelector('.incident');
    const roomNumber = clone.querySelector('.room-number');

    alert.setAttribute('data-room-number', String(this.roomNumber));

    if(this.priority == 1) {
      incident.className = "incident red darken-4";
    }
    else if(this.priority == 2) {
      incident.className = "incident red lighten-1";
    }
    else if(this.priority == 3) {
      incident.className = "incident pink lighten-3";
    }
    else {
      incident.className = "incident red darken-1";
    }

    roomNumber.textContent = String(this.roomNumber);
    Util.prependChild(p, clone);
    this.view = <HTMLElement>p.querySelector('[data-room-number="' + this.roomNumber + '"]');
  }

  update(val): void {
    const incident = this.view.querySelector('.incident');
    const roomNumber = this.view.querySelector('.room-number');

    if(val.priority == 1) {
      incident.className = "incident red darken-4";
    }
    else if(val.priority == 2) {
      incident.className = "incident red lighten-1";
    }
    else if(val.priority == 3) {
      incident.className = "incident pink lighten-3";
    }
    else {
      incident.className = "incident red darken-1";
    }
    roomNumber.textContent = String(val.roomNumber);
  }

  remove(p: HTMLElement): void {
    p.removeChild(this.view);
  }
}
