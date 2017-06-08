import * as Util from '../common/util';
import * as _ from 'lodash'

export function init() {
  let alertManager = new AlertManager(<HTMLElement>document.querySelector('#alert-list'));
  let alertWebSocket = new WebSocket('ws://' + location.host, ['json']);

  let timer = window.setInterval(cb, 500);
  function cb() {
    let d = new Date();
    let clock = <HTMLElement>document.querySelector('.clock');
    clock.innerHTML = d.getHours() + ":" + d.getMinutes();
  }


  alertWebSocket.onopen = function() {

  };
  // Log errors
  alertWebSocket.onerror = function (error) {
    console.log('WebSocket Error ' + error);
  };
  // Log messages from the server
  alertWebSocket.onmessage = function (e) {
    console.log(e.data);
    let data: Alert[] = JSON.parse(e.data);
    data.forEach((alert: Alert) => {
      alertManager.update(alert);
    });
  };
}

interface Alert {
  id: number;
  room_number: number;
  name: string;
  date: string;
  priority: string;
  status: string;
}


class AlertManager {
  list: HTMLElement;
  alertViews:{[key: number]: AlertView;};
  displayTime: number;

  constructor(alertList: HTMLElement) {
    this.displayTime = 30 * 1000;
    this.list = alertList;
    this.alertViews = {};
  }

  update(alert: Alert): void {
    const id = alert.id;
    if(id in this.alertViews) {
      this.updateAlert(alert);
    } else {
      this.alertViews[id] = this.createAlert(alert);
    }
  }

  createAlert(alert: Alert): AlertView {
    const view = new AlertView(this.list, alert);
    view.setTimer(_.partial(this.clearAlert, alert).bind(this), this.displayTime);
    return view;
  }

  updateAlert(alert: Alert): void {
    const view = this.alertViews[alert.id];
    view.resetTimer(_.partial(this.clearAlert, alert).bind(this), this.displayTime);
    view.update(alert);
  }

  clearAlert(alert: Alert): void {
    const view = this.alertViews[alert.id];
    view.remove(this.list);
    delete this.alertViews[alert.id];
  }
}

class AlertView {
  private view: HTMLElement;
  private id: number;
  private timer: number;

  constructor(p: HTMLElement, alert: Alert) {
    this.id = alert.id;
    this.create(p, alert);
  }

  setTimer(func, time): void {
    this.timer = window.setTimeout(func, time);
  }

  resetTimer(func, time): void {
    window.clearTimeout(this.timer);
    this.setTimer(func, time);
  }

  create(p: HTMLElement, alert: Alert): void {
    const alertTmpl = <HTMLTemplateElement>document.querySelector('#alert-template');
    const clone = <HTMLElement>document.importNode(alertTmpl.content, true);
    const d = clone.querySelector('.alert');
    d.setAttribute('data-alert-id', String(alert.id));
    d.setAttribute('data-room-number', String(alert.room_number));
    const i = clone.querySelector('.incident');
    i.setAttribute('data-status', String(alert.status));
    Util.prependChild(p, clone);
    this.view = <HTMLElement>p.querySelector('[data-alert-id="' + alert.id + '"]');
    this.update(alert);
  }

  update(alert: Alert): void {
    const incident = this.view.querySelector('.incident');
    const status = incident.getAttribute('data-status');
    const roomNumber = this.view.querySelector('.room-number');

    console.log(status);

    if(alert.priority == '1') {
      incident.className = "incident red darken-4";
    }
    else if(alert.priority == '2') {
      incident.className = "incident red lighten-1";
    }
    else if(alert.priority == '3') {
      incident.className = "incident pink lighten-3";
    }
    else {
      incident.className = "incident red darken-1";
    }
    roomNumber.textContent = String(alert.room_number);
  }

  remove(p: HTMLElement): void {
    p.removeChild(this.view);
  }
}
