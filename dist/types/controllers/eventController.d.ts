/**
 * CONTROLLER: ITEM
 *
 * The purpose of this controller is to manage the
 * events trigger to the specific item the controller is assigned to.
 * This controllers is used by the hooks to re-render the components.
 */
export declare class EventController {
    /** Map of <event, callback> */
    _eventsMap: Map<string, () => void>;
    /** Map of <event, payload> */
    _payloadsMap: Map<string, any>;
    /**
     * Enable an event, it can be emitted.
     *
     * @param event - The event name.
     * @param emitter - The callback.
     */
    enableEvent(event: string, emitter: () => void): void;
    /**
     * Set an event payload and emit it the event.
     *
     * @param event - The event name.
     * @param payload - The payload.
     */
    emitEvent(event: string, payload: any): void;
    /**
     * Get the payload of the event.
     *
     * @param event - The event.
     * @returns - The payload.
     */
    getPayload(event: string): any;
    /**
     * Returns if at least an event is enabled.
     *
     * @param event - The event.
     * @returns - If at least an event is enabled.
     */
    isEnabled(event: string): boolean;
    /**
     * Destroy the instance.
     */
    destroy(): void;
}
