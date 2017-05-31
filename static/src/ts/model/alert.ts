class AlertEntity {
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
}
