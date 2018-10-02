// @flow

import {subscribe, getState} from "./store"
import {scheduleRender} from "./render-queue"

function render() {
    scheduleRender(this);
}

function parseAttributes(attributes: NamedNodeMap): Object {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}

export default class Component extends HTMLElement {
    get name() {
        return Object.getPrototypeOf(this).constructor.name
    }

    get isShadow(): boolean {
        return true
    }

    get props() {
        return {
            ...this.__defaultProps,
            ...parseAttributes(this.attributes),
        }
    }

    set props(props: Object) {
        this.__defaultProps = props;
    }

    get keys() {
        return []
    }

    get styles(): string {
        return ""
    }

    __defaultProps = {};

    subscriptions = [];

    state = {};

    mounted: boolean = false;

    constructor() {
        super();

        if (this.isShadow) {
            render.call(this);
        }
    }

    render() {
        return ''
    }

    subscribeToStore() {
        for (const key of this.keys) {
            this.subscriptions.push(
                subscribe(key, state => {
                    this.state[key] = state;
                    render.call(this)
                })
            );
            this.state[key] = getState(key);
        }
    }

    connectedCallback() {
        this.subscribeToStore();
        if (!this.isShadow) {
            render.call(this)
        }

        this.connected()
    }

    connected() {}

    disconnectedCallback() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe()
        }

        this.disconnected()
    }

    disconnected() {}

    adoptedCallback() {
        this.subscribeToStore();
        render.call(this);

        this.adopted()
    }

    adopted() {}

    attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {
        this.propsChanged(
            {
                ...this.props,
                [attributeName]: newValue,
            }
        );
        render.call(this)
    }

    propsChanged(newProps: Object) {}
}