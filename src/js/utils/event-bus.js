let eventList = {};

class EventBus {
  subscribeEvent(id, callback) {
    eventList[id] ? eventList[id].push(callback) : (eventList[id] = [callback]);
  }

  publishEvent(id, payload) {
    if (eventList[id]) {
      for (const callback of eventList[id]) {
        callback(payload);
      }
    }
  }
}

module.exports = EventBus;
