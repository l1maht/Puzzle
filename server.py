from http.server import SimpleHTTPRequestHandler, HTTPServer
from functools import partial
import webbrowser

PORT = 8000
URL = f'http://localhost:{PORT}'

handler = partial(SimpleHTTPRequestHandler, directory='public')
server = HTTPServer(('', PORT), handler)

print(f'Server running on: {URL}')

webbrowser.open(URL)
server.serve_forever()