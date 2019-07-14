/* !!!!!!
   Dit is de enige juiste versie van de gpio for MakeCode. Folder c:\temp\makecode\pxt-maker\projects
   !!!!!! */

// import * as gpio from "gpio";
// / <reference path="C:\\Temp\\makecode\\pxt-maker\\libs\\core---samd\\shims.d.ts"/>
// / <reference path="C:\\Temp\\makecode\\pxt-maker\\libs\\core---samd\\enums.d.ts"/>
// / <reference path="C:\\Temp\\makecode\\pxt-maker\\libs\\core---samd\\dal.d.ts"/>
// / <reference path="C:\\Temp\\makecode\\pxt-maker\\libs\\base\\shims.d.ts"/>
// / <reference path="C:\\Temp\\makecode\\pxt-maker\\libs\\arduino-zero\\device.d.ts"/>

// export var gpio = gpio.Gpio;
// import * as sleep from "sleep";
// replace the following functions with wiring-pi equivalents

class DigitalPin {
    public HIGH: boolean
    public LOW: boolean
    public OUTPUT: number
    public INPUT: number
    public EITHER_EDGE: number
    public PUD_DOWN: number
    public PUD_UP: number
    public PUD_OFF: number
    public lastPulse: number
    // public init = (data: { gpiomem: boolean; mapping: string }) => { };

    constructor(
        public pin: DigitalInOutPin,
        options?: {
            mode: number,
            alert: true,
            edge: number,
            pullUpDown: PinPullMode
        }
    ) {
        this.HIGH = true;
        this.LOW = false;
        this.OUTPUT = 1;
        this.INPUT = 0;
        this.EITHER_EDGE = 2;
        this.PUD_DOWN = PinPullMode.PullDown;
        this.PUD_UP = PinPullMode.PullUp;
        this.PUD_OFF = PinPullMode.PullNone;
        this.lastPulse = control.millis() * 1000;
        // switch (pin) {
        //     case 0:
        //         return pins.D0;
        //     case 1:
        //         return pins.D1;
        //     case 2:
        //         return pins.D2;
        //     case 3:
        //         return pins.D3;
        //     case 4:
        //         return pins.D4;
        //     case 5:
        //         return pins.D5;
        //     case 6:
        //         return pins.D6;
        //     case 7:
        //         return pins.D7;
        //     case 8:
        //         return pins.D8;
        //     case 9:
        //         return pins.D9;
        //     case 10:
        //         return pins.D10;
        //     case 11:
        //         return pins.D11;
        //     case 12:
        //         return pins.D12;
        //     case 13:
        //         return pins.D13;
        //     default:
        //         return pins.D11;
        // }
    };

    public usleep(microSeconds: number) {
        control.waitMicros(microSeconds);
        return;
        /* let diff = process.hrtime()
              let delta = [0, 0]
              while ((delta[0] * 1e9 + delta[1]) < microSeconds * 1000) {
                  delta = process.hrtime(diff)
              } */
    };

    public setWatch(
        interruptHandler: (duration: number) => void
        // , options = {
        //     mode: this.INPUT,
        //     alert: true,
        //     edge: this.EITHER_EDGE
        // }
    ) {
        this.lastPulse = control.millis() * 1000;
        this.pin.onEvent(PinEvent.Fall, () => {
            let pd = pins.pulseDuration();
            interruptHandler(pd); //- lastPulse
            this.lastPulse = pd;
        });
        this.pin.onEvent(PinEvent.Rise, () => {
            let pd = pins.pulseDuration();
            interruptHandler(pd); //- lastPulse
            this.lastPulse = pd;
        });
    }

    public clearWatch() {
        this.pin.onEvent(PinEvent.Fall, () => { });
    }

    public digitalRead() {
        return this.pin.digitalRead()
    };

    public digitalWrite(value: boolean) {
        this.pin.digitalWrite(value)
    };


    public digitalPulse(
        value: boolean,
        width: number[]
    ) {
        for (let time of width) {
            this.pin.digitalWrite(value)
            this.usleep(time); //usleep(time)
            value = value == this.LOW ? this.HIGH : this.LOW;
        }
    }
}
