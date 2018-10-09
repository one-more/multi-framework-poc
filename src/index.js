// @flow

export {
    setImplementation as changeWebComponentsImplemenation,
    componentsReady,
    setReadyCheck as changeWebComponentsReadyCheck,
    default as registerComponent
} from "./web-components"

export {
    setImplementation as changeStoreImplementation,
    registerReducer,
    removeReducer,
    subscribe,
    getState
} from "./store"

export {
    addTemplateHandler,
    setCoreHandler,
    unloadHandler,
    accessHandler,
} from "./handlers"

export {
    default as html,
} from "./tag"

export {
    getStorage,
    addStorage,
    removeStorage
} from "./storage"

export {bind} from "./bind"

export {default as Component} from "./Component"
