import * as Util from '../common/util';

export function init() {
   alertManager = new AlertManager(<HTMLElement>document.querySelector('#alert-list'));
}

//TODO: /api/incidentsで初期データ取ってきて、それ以降はWebSocketでデータ受信
let addr = 'ws://' + location.host;
let websocket = new WebSocket(addr, ['json']);
let alertManager;

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

class AlertManager {
  alertList: HTMLElement;

  constructor(alertList: HTMLElement) {
    this.alertList = alertList;
  }

  createAlert(val): Alert {
    return new Alert(val.id, val.roomNumber, val.name, val.date, val.priority);
  }

  addAlert(alert: Alert): void {
    const dom = alert.createDOM();
    Util.prependChild(this.alertList, dom)
  }
}

class Alert {
  private id: number;
  private roomNumber: number;
  private name: string;
  private date: string;
  private priority: number;

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
    window.setTimeout(this.removeDOM.bind(this), 10000);
  }

  createDOM(): HTMLElement {
    const alertTmpl = <HTMLTemplateElement>document.querySelector('#incident-template');
    const clone = <HTMLElement>document.importNode(alertTmpl.content, true);
    const notification = clone.querySelector('.notification');
    const incident = clone.querySelector('.incident');
    const roomNumber = clone.querySelector('.room-number');

    notification.setAttribute('data-incident-id', String(this.id));

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
