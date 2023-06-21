#include <ESP8266WiFi.h>
#include "DHT.h"
#include <OneWire.h>
#include <DallasTemperature.h>

#define DHTTYPE DHT11
#define dht_dpin D4   // dht11 sensor pin
#define ONE_WIRE_BUS 4  // d2 for soil temp

#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

const char *ssid = "Project";  // WiFi Name
const char *pass = "backspace";    // WiFi Password

WiFiClient client;

#define MQTT_SERV "io.adafruit.com"

#define MQTT_PORT 1883

#define MQTT_NAME "abhi1408"  // Adafruit IO Username

#define MQTT_PASS "aio_ZkLp75EMIrgEUOVYyjlCEvSytdgX"  // Adafruit IO AIO key

Adafruit_MQTT_Client mqtt(&client, MQTT_SERV, MQTT_PORT, MQTT_NAME, MQTT_PASS);
Adafruit_MQTT_Publish Moisture = Adafruit_MQTT_Publish(&mqtt,MQTT_NAME "/feeds/moisture");
Adafruit_MQTT_Publish Temperature = Adafruit_MQTT_Publish(&mqtt,MQTT_NAME "/feeds/temperature");
Adafruit_MQTT_Publish Humidity = Adafruit_MQTT_Publish(&mqtt,MQTT_NAME "/feeds/humidity");
Adafruit_MQTT_Publish Light = Adafruit_MQTT_Publish(&mqtt,MQTT_NAME "/feeds/light");
// Adafruit_MQTT_Publish SoilTemp = Adafruit_MQTT_Publish(&mqtt,MQTT_NAME "/f/SoilTemp");

OneWire onewire(ONE_WIRE_BUS);
DallasTemperature sensors(&onewire);
DHT dht(dht_dpin, DHTTYPE);

const int ldrOn = D6;   // ldr sensor switch pin
const int moistureSensorOn = D7;    // soil moisture sensor switch pin
const int agInp = A0;     // analog input pin

void MQTT_connect() {
  int8_t ret;

  // Stop if already connected.
  if (mqtt.connected()) {
    return;
  }

  uint8_t retries = 3;

  while ((ret = mqtt.connect()) != 0) {  // connect will return 0 for connected
    mqtt.disconnect();
    delay(5000);  // wait 5 seconds
    retries--;
    if (retries == 0) {
      // basically die and wait for WDT to reset me
      while (1);
    }
  }
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  delay(10);
  dht.begin();
  sensors.begin();
  pinMode(ldrOn, OUTPUT);
  pinMode(moistureSensorOn, OUTPUT);
  digitalWrite(ldrOn, LOW);
  digitalWrite(moistureSensorOn, LOW);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");              // print ... till not connected
  }
  Serial.println("\nWiFi connected");
}

void loop() {
  MQTT_connect();
  float temp = dht.readTemperature();
  Serial.print("temperature: ");
  Serial.println(temp);
  float humidity = dht.readHumidity();
  Serial.print("humidity: ");
  Serial.println(humidity);

  Serial.println("Reading light");
  digitalWrite(ldrOn, HIGH);
  delay(1000);
  float light = 1023 - analogRead(agInp);
  digitalWrite(ldrOn, LOW);
  // delay(1000);
  Serial.print("light: ");
  Serial.println(light);

  Serial.println("Reading soil moisture");
  digitalWrite(moistureSensorOn, HIGH);
  delay(1000);
  float soilMoisture = ((1023 - analogRead(agInp)) * 100) / 1023;
  digitalWrite(moistureSensorOn, LOW);
  // delay(1000);
  Serial.print("soil moisture %: ");
  Serial.println(soilMoisture);

  Temperature.publish(temp);
  Humidity.publish(humidity);
  Light.publish(light);
  Moisture.publish(soilMoisture);

  delay(10000);
}
