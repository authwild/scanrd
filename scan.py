import sys
import requests

urls = sys.argv[1:]

for url in urls:
    response = requests.get(url, allow_redirects=False)
    if response.status_code == 302 and 'Location' in response.headers:
        location = response.headers['Location']
        if '//' in location:
            print(f'Vulnerable: {url} redirects to {location}')
    else:
        print(f'Safe: {url}')

