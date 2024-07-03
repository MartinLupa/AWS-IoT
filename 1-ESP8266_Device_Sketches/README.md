# ESP8266 AWS IoT Example

This example demonstrates how to connect an ESP8266 to AWS IoT using MQTT. The sketch includes WiFi connection setup, time synchronization using NTP, and secure communication using certificates.

## Requirements

- ESP8266 Board
- Arduino IDE with the following libraries installed:
  - ESP8266WiFi
  - PubSubClient

## Configuration

### WiFi Credentials and AWS Endpoint

Set your WiFi SSID, password, and AWS IoT endpoint:

```cpp
const char *ssid = "<yourSSID>";
const char *password = "<yourPSWD>";
const char *awsEndpoint = "xxxxxxxxxx.iot.us-west-2.amazonaws.com";
