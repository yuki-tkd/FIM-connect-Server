let addr = 'ws://' + location.host;
let websocket = new WebSocket(addr, ['json']);
let alertManager;

document.addEventListener("DOMContentLoaded", init);

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

function init() {
   alertManager = new AlertManager(<HTMLElement>document.querySelector('#alert-list'));
}


class AlertManager {
  alertList: HTMLElement;

  constructor(alertList: HTMLElement) {
    this.alertList = alertList;
  }

  createAlert(val): Alert {
    return new Alert(val.id, val.roomNumber, val.name, val.date);
  }

  addAlert(alert: Alert): void {
    const dom = alert.createDOM();
    this.alertList.prependChild(dom);
  }
}

class Alert {
  private id: number;
  private roomNumber: number;
  private name: string;
  private date: string;

  constructor(id, roomNumber, name, date) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.name = name;
    this.date = date;
    this.setTimer(this.date);
  }

  setTimer(date: string): void {
    const d = new Date();
    window.setTimeout(this.removeDOM.bind(this), 5000);
  }

  createDOM(): HTMLElement {
    const alertTmpl = <HTMLTemplateElement>document.querySelector('#alert-template');
    const clone = <HTMLElement>document.importNode(alertTmpl.content, true);
    const alert = clone.querySelector('.alert');
    const name = clone.querySelector('h6');
    const roomNumber = clone.querySelector('.card-title');
    const update  = clone.querySelector('.update');

    alert.setAttribute('data-alert-id', this.id);
    name.textContent = this.name;
    roomNumber.textContent = 'Room ' + this.roomNumber;
    update.textContent = timeConverter(this.date);

    return clone;
  }

  removeDOM(): void {
    const p = <HTMLElement>document.querySelector('#alert-list');
    const me = p.querySelector('[data-alert-id="' + this.id + '"]');
    p.removeChild(me);
  }
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

Node.prototype.prependChild = function(e){ this.insertBefore(e,this.firstChild); }
