export class EventController {
  constructor() {
    // Map of the event->emitter
    this._eventsMap = new Map();
    this._payloadsMap = new Map();
  }

  // Enable an event, it can be emitted.
  enableEvent(event, emitter) {
    this._eventsMap.set(event, emitter);
  }

  // Emit an event and set its payload.
  emitEvent(event, payload) {
    if (this._eventsMap.has(event)) {
      this._payloadsMap.set(event, payload);
      this._eventsMap.get(event)();
    }
  }

  // Get the payload of the event.
  getPayload(event) {
    return this._payloadsMap.get(event);
  }

  // If at least an event is enabled.
  isEnabled() {
    return this._eventsMap.size !== 0;
  }
}
