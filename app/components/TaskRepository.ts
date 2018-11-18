import * as Parse from "parse";
import IPromise = Parse.IPromise;

const parseAppId = "IAn088dtc0MKgZmLFbDe72KoXprmm93wvrGFU3qp";
const parseJSKey = "umdeQi11dDgegP8DxGXVOIxK5LhRiUjCfBnAKDAG";
Parse.initialize(parseAppId, parseJSKey);
(Parse as any).serverURL = "https://parseapi.back4app.com/";

export class Task extends Parse.Object {
  constructor() {
    super('Task');
  }

  getId() {
    return super.get("obejctId")
  }

  getTitle() {
    return super.get("title");
  }

  setTitle(title: string) {
    super.set("title", title)
  }

  delete() {
    return super.destroy();
  }

  static findAll(): IPromise<Array<Task>> {
    let query = new Parse.Query(Task);
    return query.find();
  }

}

Parse.Object.registerSubclass('Task', Task);

class TaskRepository {

}

export default new TaskRepository();

