<img src="https://max-herrmann.com/deploy/blu/blu-playground_logo.png?0" height="100" alt="Blu Playground">

**A playground for the [Blu Framework](https://github.com/maxherrmann/blu).**

The playground exposes the [Blu API](https://github.com/maxherrmann/blu/wiki#blu-api-reference) as a global variable named `blu`, allowing you to access it from the console. Once a device has been connected, it is available as `device`.

[**➡️ To the Playground**](https://playground.blu.js.org/)

## Examples

This repository also contains a collection of examples on how to use Blu. You can use them within the playground by selecting them in the sidebar.

Here’s a list of all available examples:

### [🧱 Starter Kit](https://github.com/maxherrmann/blu-playground/tree/main/examples/starter-kit)
- The perfect starting point for integrating your own Bluetooth device with Blu.
- Does not implement any functionality.

### [🔋 Battery](https://github.com/maxherrmann/blu-playground/tree/main/examples/battery)
<!--- [**Documentation**](https://github.com/maxherrmann/blu-playground/wiki/Examples/Battery)-->
- Implementation example for a generic Bluetooth device that provides a standard battery service.
- Read your device’s battery level and get notified when it changes.

### [🎛️ BBC micro:bit](https://github.com/maxherrmann/blu-playground/tree/main/examples/microbit) (Work in progress)
<!--- [**Documentation**](https://github.com/maxherrmann/blu-playground/wiki/Examples/BBC-micro-bit)-->
- Implementation example for a [BBC micro:bit](https://www.microbit.org/) device.
- Implements the [default Bluetooth profile for the BBC micro:bit](https://lancaster-university.github.io/microbit-docs/resources/bluetooth/bluetooth_profile.html).
- **Implementation status**
  - [ ] Device Information Service
  - [ ] Accelerometer Service
  - [ ] Magnetometer Service
  - [x] Button Service
  - [ ] IO Pin Service
  - [ ] LED Service
  - [ ] Event Service
  - [ ] DFU Control Service
  - [x] Temperature Service
  - [ ] UART Service
- Tested with the BBC micro:bit v2 rev. 21.

### [🔄 Nordic nRF DFU](https://github.com/maxherrmann/blu-playground/tree/main/examples/nrf-dfu)
<!--- [**Documentation**](https://github.com/maxherrmann/blu-playground/wiki/Examples/Nordic-nRF-DFU)-->
- Implementation example for a Nordic nRF5 device that provides a [nRF Secure Device Firmware Update](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fcom.nordic.infocenter.sdk5.v12.0.0%2Flib_dfu_transport_ble.html) service.
- Update your device’s firmware with a firmware package (`.zip`).
- Tested with the nRF 52832 SoC.

### Want to create your own example?
Read the [Configure Blu for your own device](https://github.com/maxherrmann/blu/wiki/Configuring-Blu-for-your-own-device) guide.

### Want to share your example and make it available in the Playground?
Feel free to [contribute](https://github.com/maxherrmann/blu-playground/compare)!