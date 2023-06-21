from Adafruit_IO import Client
from flask import Flask, jsonify

app = Flask(__name__)
aio = Client("abhi1408","aio_UAek026g6eqAA957931HJlMl4MD0") 

@app.route('/')
def get():
    feeds = aio.feeds()
    data = {} 
    for feed in feeds:
        feed_key = feed[1]
        values = aio.data(feed_key, max_results=50)
        data[feed_key] = [[value[1].replace('T', ' ').replace('Z', ''), value[3]] for value in values]
    resp = jsonify(data)
    resp.status_code = 200
    return resp

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True)
