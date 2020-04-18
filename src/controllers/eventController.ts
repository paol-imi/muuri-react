/**
 * CONTROLLER: ITEM
 *
 * The purpose of this controller is to manage the
 * events trigger to the specific item the controller is assigned to.
 * This controllers is used by the hooks to re-render the components.
 */
export class EventController {
  /** Map of <event, callback> */
  _eventsMap = new Map<string, () => void>();
  /** Map of <event, payload> */
  _payloadsMap = new Map<string, any>();

  /**
   * Enable an event, it can be emitted.
   *
   * @param event - The event name.
   * @param emitter - The callback.
   */
  enableEvent(event: string, emitter: () => void): void {
    this._eventsMap.set(event, emitter);
  }

  /**
   * Set an event payload and emit it the event.
   *
   * @param event - The event name.
   * @param payload - The payload.
   */
  emitEvent(event: string, payload: any): void {
    if (this.isEnabled(event)) {
      this._payloadsMap.set(event, payload);
      // @ts-ignore
      this._eventsMap.get(event)();
    }
  }

  /**
   * Get the payload of the event.
   *
   * @param event - The event.
   * @returns - The payload.
   */
  getPayload(event: string): any {
    return this._payloadsMap.get(event);
  }

  /**
   * Returns if at least an event is enabled.
   *
   * @param event - The event.
   * @returns - If at least an event is enabled.
   */
  isEnabled(event: string): boolean {
    return this._eventsMap.has(event);
  }

  /**
   * Destroy the instance.
   */
  destroy() {
    this._eventsMap.clear();
    this._payloadsMap.clear();
  }
}
