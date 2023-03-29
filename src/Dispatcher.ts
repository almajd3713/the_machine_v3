

class Event {
  name: string
  callbacks: ((...args: any) => void)[]
  constructor(name: string) {
    this.name = name
    this.callbacks = []
  }
  registerCallback(callback: (...args:any) => void) {
    this.callbacks.push(callback)
  }
}

class Dispatcher {
  events: {
    [name: string]: Event
  } = {}
  addEventListener(name: string, callback: ((...args:any) => void)) {
    if(this.events[name] === undefined) {
      let event = new Event(name)
      this.events[name] = event
    } 
    this.events[name].registerCallback(callback)
  }
  dispatch(name: string, ...args: any) {
    if(this.events[name]) this.events[name].callbacks.forEach(callback => callback(...args))
  }
}

export default new Dispatcher as Dispatcher