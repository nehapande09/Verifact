from duckduckgo_search import DDGS
import requests
from bs4 import BeautifulSoup

def fetch_search_results(query, max_results=10):
    sources = []

    try:
        with DDGS() as ddgs:
            results = ddgs.text(query, max_results=max_results)
            for result in results:
                url = result.get("href")
                title = result.get("title")
                snippet = scrape_page_snippet(url)

                sources.append({
                    "title": title,
                    "link": url,
                    "snippet": snippet
                })
    except Exception as e:
        print(f"Error fetching search results: {e}")

    return sources


def scrape_page_snippet(url):
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract first meaningful paragraph
        for para in soup.find_all('p'):
            text = para.get_text(strip=True)
            if len(text) > 50:
                return text

        return "No meaningful snippet found."
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return "Could not retrieve snippet."
