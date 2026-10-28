from html.parser import HTMLParser
from pathlib import Path
import sys

HTML_FILE = Path("index.html")
if not HTML_FILE.exists():
    raise SystemExit("index.html not found")

class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.duplicates = set()
        self.anchors = []
        self.local_assets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        element_id = attrs.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicates.add(element_id)
            self.ids.add(element_id)

        href = attrs.get("href", "")
        if href.startswith("#") and len(href) > 1:
            self.anchors.append((tag, href[1:]))

        for attribute in ("src", "href"):
            value = attrs.get(attribute, "")
            if value and not value.startswith(("#", "http://", "https://", "mailto:", "tel:", "data:", "javascript:")):
                path = value.split("?", 1)[0].split("#", 1)[0]
                if path:
                    self.local_assets.append((tag, attribute, path))

parser = SiteParser()
parser.feed(HTML_FILE.read_text(encoding="utf-8"))
errors = []

if parser.duplicates:
    errors.append("Duplicate HTML IDs: " + ", ".join(sorted(parser.duplicates)))

for tag, target in parser.anchors:
    if target not in parser.ids:
        errors.append(f"Broken in-page anchor: <{tag}> href='#{target}'")

for tag, attribute, relative_path in parser.local_assets:
    if not Path(relative_path).exists():
        errors.append(f"Missing local {attribute} for <{tag}>: {relative_path}")

if errors:
    print("\n".join(errors), file=sys.stderr)
    raise SystemExit(1)

print(f"HTML static checks: PASS ({len(parser.ids)} unique IDs, {len(parser.anchors)} in-page anchors, {len(parser.local_assets)} local asset references)")
