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
```

## MQTT Topics

In this example, the device uses two MQTT topics to communicate with AWS IoT:

1. **outTopic**: This topic is used by the device to publish data to AWS IoT.
2. **inTopic**: This topic is used by the device to receive data from AWS IoT.

### Publishing Data to `outTopic`

The device publishes messages to the `outTopic` at regular intervals. In the `loop` function, the device constructs a message and publishes it to `outTopic`:

```cpp
if (millis() - lastPublish > 10000) {
  String msg = String("Hello from ESP8266: ") + ++msgCount;
  pubSubClient.publish("outTopic", msg.c_str());
  Serial.print("Published: ");
  Serial.println(msg);
  lastPublish = millis();
}
```

### Receiving Data in `inTopic`

The device subscribes to the `inTopic` that can be used to publish data to it, so it can be processed.

#### Subscribing to topic
```cpp
if (!pubSubClient.connected()) {
  Serial.print("PubSubClient connecting to: ");
  Serial.print(awsEndpoint);
  while (!pubSubClient.connected()) {
    Serial.print(".");
    pubSubClient.connect("ESPthing");
  }
  Serial.println(" connected");
  pubSubClient.subscribe("inTopic");
}
```

### Process message from the subscribed topic
```cpp
void msgReceived(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message received on ");
  Serial.print(topic);
  Serial.print(": ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}
```

By using `outTopic` and `inTopic`, the device can send data to AWS IoT and receive commands or data from the cloud.