import * as Util from '../common/util';

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
    data.forEach( (val, index, arr) => {
      let alert = alertManager.createAlert(val);
      alertManager.addAlert(alert);
    });
  };

}


class AlertManager {
  alertList: HTMLElement;

  alerts: HTMLElement[];

  constructor(alertList: HTMLElement) {
    this.alertList = alertList;
  }

  createAlert(val): Alert {
    return new Alert(val.id, val.roomNumber, val.name, val.date, val.priority);
  }

  addAlert(alert: Alert): void {
    const dom = alert.createDOM();
    Util.prependChild(this.alertList, dom);
  }

  updateOrCreate(alert: Alert): void {
    let target;
    alerts.forEach( (val) => {
      if(val.id == alert.id) {
        target = alert;
        updateDOM(alert);
      }
    });
    if(target == null) {
      
    }
  }

  private create(alert: Alert) {
    
  }

}

class Alert {
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
    this.setTimer(this.date);
    this.priority = priority;
  }

  setTimer(date: string): void {
    const d = new Date();
    this.timer = window.setTimeout(this.removeDOM.bind(this), 10000);
  }

  clearTimer(): void {
    clearTimeout(this.timer);
  }

  createDOM(): HTMLElement {
    const alertTmpl = <HTMLTemplateElement>document.querySelector('#incident-template');
    const clone = <HTMLElement>document.importNode(alertTmpl.content, true);
    const alert = clone.querySelector('.alert');
    const incident = clone.querySelector('.incident');
    const roomNumber = clone.querySelector('.room-number');

    alert.setAttribute('data-incident-id', String(this.id));

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

    roomNumber.textContent = this.roomNumber;

    return clone;
  }

  updateDOM(): HTMLElement {
    const p = <HTMLElement>document.querySelector('#alert-list');
    const clone = p.querySelector('[data-incident-id="' + alert.id + '"]');
    const alert = clone.querySelector('.alert');
    const incident = clone.querySelector('.incident');
    const roomNumber = clone.querySelector('.room-number');

    alert.setAttribute('data-incident-id', String(this.id));

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

    roomNumber.textContent = this.roomNumber;

    return clone;
   
  }

  removeDOM(): void {
    const p = <HTMLElement>document.querySelector('#alert-list');
    const me = p.querySelector('[data-incident-id="' + this.id + '"]');
    p.removeChild(me);
  }
}
