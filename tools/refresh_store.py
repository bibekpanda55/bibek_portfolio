"""Refresh assets/store.json with the latest App Store versions.
Keeps the committed file unchanged if Apple's lookup fails."""
import json, sys, urllib.request, datetime

PATH = "assets/store.json"
data = json.load(open(PATH))
ids = ",".join(a["id"] for a in data["apps"])
try:
    url = f"https://itunes.apple.com/lookup?id={ids}&country=in"
    with urllib.request.urlopen(url, timeout=20) as r:
        res = {str(x["trackId"]): x for x in json.load(r).get("results", [])}
except Exception as e:
    print("Lookup failed, keeping committed store.json:", e)
    sys.exit(0)
for a in data["apps"]:
    x = res.get(a["id"])
    if x and x.get("version"):
        a["version"] = x["version"]
        d = x.get("currentVersionReleaseDate", "")[:10]
        if d:
            a["released"] = d
data["checked"] = datetime.date.today().isoformat()
json.dump(data, open(PATH, "w"), indent=2)
print(json.dumps(data, indent=2))
