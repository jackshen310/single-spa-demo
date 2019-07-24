export interface ITopicValue {
  token: number;
  func(topic?: string, event?: any): any;
}

/**
 * 统一消息管理, 将消息发送给所有订阅这个消息类型的模块
 * 采用 订阅/发布(观察者) 这种设计模块式开发
 */
class MsgCenter {
  topicSubsMap = new Map<string, ITopicValue[]>();
  uuid = 0;

  _getUUID() {
    return ++this.uuid;
  }

  /**
   * 事件发布
   * @param topic
   * @param resultObj
   */
  publish(topic: string, resultObj?: any) {
    if (!this.topicSubsMap.has(topic)) {
      return false;
    }
    let subscribers = this.topicSubsMap.get(topic) || [];
    subscribers.forEach((sub: object | any) => {
      sub.func(topic, resultObj);
    });
    return true;
  }

  /**
   * 订阅事件
   * @param topic string | array
   * @param func function(topic, event)
   * @param uuid
   * @returns {*|number}
   */
  subscribe(topic: string | string[], func: (topic: string, event: any) => any, uuid?: number) {
    uuid = uuid || this._getUUID();
    if (Array.isArray(topic)) {
      topic.forEach(item => {
        this.subscribe(item, func, uuid);
      });
      return uuid;
    }
    if (!this.topicSubsMap.has(topic)) {
      this.topicSubsMap.set(topic, []);
    }
    this.topicSubsMap.get(topic)!.push({
      token: uuid,
      func: func,
    });
    return uuid;
  }

  unsubscribe(token: any) {
    for (let subs of this.topicSubsMap.values()) {
      for (let i = 0; i < subs.length; i++) {
        if (subs[i].token == token) {
          subs.splice(i--, 1);
        }
      }
    }
    return false;
  }
  reset() {
    this.topicSubsMap.clear();
  }
}

export default MsgCenter;
