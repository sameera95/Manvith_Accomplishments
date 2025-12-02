
Manvith Accomplishments — Static Timeline

What this is
- A simple static HTML/CSS/JS page that simulates a Wix timeline-like template.
- Content (images, titles, dates, descriptions) lives in `assets/data/sections.json` so you can add/edit/remove sections without changing the HTML.

Files added
- `index.html` — main page.
- `assets/style.css` — styles for layout and timeline.
- `assets/script.js` — loads `sections.json` and renders timeline items dynamically.
- `assets/data/sections.json` — data file containing the timeline sections.

How to view locally
Browsers will block fetch requests to local files when opening `index.html` via the `file://` protocol. Start a short HTTP server and open the page.

Using PowerShell (Windows):

```powershell
# From the repo root (where index.html lives):
python -m http.server 8000; # if you have Python 3 installed
# then open http://localhost:8000 in your browser
```

If you don't have Python, you can use other simple servers (Node http-server, VS Code Live Server extension, etc.).

How to edit the timeline
- Open `assets/data/sections.json` and add/remove objects in the array. Each object has:
	- `id` (unique integer)
	- `title` (string)
	- `date` (string)
	- `subtitle` (string, optional)
	- `description` (string)
	- `image` (URL string)

After saving, reload the page in your browser to see updates.

Notes & next steps
- The layout is responsive and designed to resemble the provided Wix template's timeline aesthetics. Images use placeholder service `picsum.photos`; replace with your own images or local paths.
- Possible improvements: animations, alternate layouts, server-side content, and accessibility tweaks (ARIA roles) for complex needs.
