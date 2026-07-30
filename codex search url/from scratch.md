# i am gonna start this project from scratch and this is the…

> i am gonna start this project from scratch and this is the roadmap to it
>
> User context
>
> Images:
>
> - `~/Pictures/Screenshots/Screenshot 2026-06-11 232225.png`
> - `~/Pictures/Screenshots/Screenshot 2026-06-11 232241.png`
> - `~/Pictures/Screenshots/Screenshot 2026-06-11 232255.png`
> - `~/Pictures/Screenshots/Screenshot 2026-06-11 232309.png`

<details><summary>8 previous messages</summary>

> Nice, this roadmap is concrete enough to turn into a real starter project. I’ll inspect the workspace first so I can scaffold it cleanly instead of guessing what’s already there.
>
> The folder is a blank git repo, which is actually perfect for this. I’m going to scaffold the backend around the roadmap: Express + MongoDB, Redis cache-aside, token-bucket rate limiting, docs, and runnable local setup files.
>
> <details><summary>Created 19 files</summary>
>
> - Wrote `./.env.example` (+8 -0)
> - Wrote `./.gitignore` (+5 -0)
> - Wrote `./ARCHITECTURE.md` (+67 -0)
> - Wrote `./README.md` (+75 -0)
> - Wrote `./docker-compose.yml` (+15 -0)
> - Wrote `./package.json` (+31 -0)
> - Wrote `./src/app.js` (+24 -0)
> - Wrote `./src/config.js` (+17 -0)
> - Wrote `./src/db.js` (+10 -0)
> - Wrote `./src/middleware/rateLimiter.js` (+46 -0)
> - Wrote `./src/models/Counter.js` (+11 -0)
> - Wrote `./src/models/Url.js` (+18 -0)
> - Wrote `./src/redis.js` (+12 -0)
> - Wrote `./src/routes/urlRoutes.js` (+120 -0)
> - Wrote `./src/server.js` (+16 -0)
> - Wrote `./src/services/cacheService.js` (+41 -0)
> - Wrote `./src/services/codeService.js` (+19 -0)
> - Wrote `./src/utils/base62.js` (+21 -0)
> - Wrote `./test/base62.test.js` (+16 -0)
>
> </details>
>
> The first pass is in place now: API code, models, Redis helpers, limiter, tests, Docker Compose, and the two docs files. I’m going to run the lightweight tests next, then I’ll check whether dependency install/server verification is possible in this sandbox.
>
> One small edge case surfaced while reviewing the route: `ttlDays: 0` would accidentally fall back to the default TTL because JavaScript treats `0` as falsy. I’m tightening that before verification so bad input gets a proper `400`.
>
> <details><summary>Edited a file</summary>
>
> - Wrote `./src/routes/urlRoutes.js` (+1 -1)
>
> </details>
>
> The unit test hit a Windows sandbox `EPERM` while Node’s test runner tried to spawn its worker process. I’m going to rerun that verification outside the sandbox, because this is exactly the kind of thing that can be environment-related rather than code-related.
>
> No problem. I’ll keep verification inside the sandbox and use a direct Node check that doesn’t rely on the test runner’s child-process behavior.

</details>

Scaffolded the project from scratch in `C:\Users\Admin\Documents\URL shortner`.

Built the roadmap into a working backend structure:

- Express API with `POST /shorten`, `GET /:code`, and `GET /:code/stats`
- MongoDB models for URLs and counters
- Base62 short code generation
- Redis cache-aside redirect flow
- TTL expiry with MongoDB TTL index
- Redis token-bucket rate limiter on `POST /shorten`
- Docker Compose for MongoDB + Redis
- README and architecture doc

Key files:

- [README.md](~/Documents/URL%20shortner/README.md)
- [ARCHITECTURE.md](~/Documents/URL%20shortner/ARCHITECTURE.md)
- [src/routes/urlRoutes.js](~/Documents/URL%20shortner/src/routes/urlRoutes.js)
- [docker-compose.yml](~/Documents/URL%20shortner/docker-compose.yml)

Verification: the direct base62 smoke check passed. `npm test` hit a sandbox `spawn EPERM` from Node’s test runner, and you declined the outside-sandbox rerun, so I left that noted rather than pushing it.

> i am a noob and idk shit - i want to put this project on my resume and study this project thoroughly
> what do you suggest - go with the project you made , and study thoroughly
> r copy paste the code on my own and build it and learn as i copy paste

Go with a third option: **rebuild it yourself using this project as the reference**, not blind copy-paste.

The project I made is a solid starter, but for your resume you need to be able to explain every file, every endpoint, and every tradeoff. So don’t just “use it” and don’t just copy-paste mindlessly. Instead:

1. Keep this version as the “answer key.”
2. Create a fresh folder or branch.
3. Rebuild it phase by phase from the roadmap.
4. After each phase, compare with this code and ask: “Why is it written this way?”
5. Rewrite comments/README in your own words.
6. Only put it on your resume after you can explain it without looking.

My strong recommendation:

**Week plan**

- Day 1: Learn Express basics, build only `POST /shorten`
- Day 2: Add redirect, click count, stats
- Day 3: Add Redis cache
- Day 4: Add expiry
- Day 5-6: Add token bucket rate limiter
- Day 7: Stress test and write numbers down
- Day 8-10: Deploy, write README + architecture notes

For learning, type the code yourself. Copy-paste is allowed only for boring boilerplate after you understand it, like `package.json` or `.gitignore`.

Resume value comes from being able to say:

> “I built a URL shortener with Express, MongoDB, and Redis. Redirects use a cache-aside pattern, links expire with TTL indexes, and URL creation is protected by a Redis token-bucket rate limiter. I benchmarked cold vs warm Redis redirects using autocannon.”

That sentence is only useful if you can defend every word in it.

So: **use this project as your map, rebuild it yourself as the journey.**

> i wnat you to help me
> is it wrong if i copy paste but learn cz idk shit about the tech stacks

No, it’s **not wrong** to copy-paste while learning.

That’s actually normal when you’re new. The only “wrong” version is copy-pasting, not understanding it, then putting it on your resume like you built it confidently from scratch.

The good version is:

**Copy → run → break → understand → rewrite small parts yourself.**

For this project, I suggest we do it like this:

1. You copy the code phase by phase.
2. I explain what each file does in noob-friendly language.
3. You run it.
4. When it breaks, we debug it together.
5. Then I ask you simple interview-style questions from that phase.
6. You rewrite tiny pieces yourself, like the base62 function or route handler.

That way, copy-paste becomes training wheels, not cheating.

Best path for you:

**Start with Phase 1 only.**
Forget Redis, rate limiting, Railway, stress tests for now.

Phase 1 goal:

> Make an Express server that accepts a long URL and returns a short code.

You only need to understand:

- What Node.js is
- What Express is
- What an API endpoint is
- What MongoDB stores
- What Mongoose does
- How `POST /shorten` works

Once that clicks, the rest becomes way less scary.

So yes, you can copy-paste. But we’ll do it properly: **one small chunk, then understanding, then next chunk.**

> okay lets start

Perfect. We start **Day 1: Project setup + `POST /shorten`**.

For now, ignore Redis, rate limiting, deployment, stress testing. Today’s job is only:

> Send a long URL to the server and get back a short URL code.

You need to understand 5 things first:

1. **Node.js** = lets JavaScript run on your computer/server.
2. **Express** = helps us make API routes like `POST /shorten`.
3. **MongoDB** = database where we store long URLs and short codes.
4. **Mongoose** = JavaScript helper for talking to MongoDB.
5. **Endpoint** = a URL on your backend that does something.

Start with this file first:

[src/app.js](~/Documents/URL%20shortner/src/app.js)

Read it and tell me what you think this line means:

```js
app.use(express.json());
```

Don’t worry if your answer is wrong. Guess in plain English. That’s how we’ll do this: you guess, I correct gently, then we move to the next piece.

> use is an api that we're using here to import the express module into the file so it can handle all the routing
> am i right , correct me if i am wrong

Close idea, but small correction.

`app.use(express.json());` is **not importing Express**.

The importing already happened here:

```js
const express = require("express");
```

That line brings Express into the file.

This line:

```js
app.use(express.json());
```

means:

> “Hey Express, whenever a request comes in with JSON data, read it and convert it into a JavaScript object so I can access it with `req.body`.”

Example:

If someone sends this to `POST /shorten`:

```json
{
  "url": "https://google.com"
}
```

Without `express.json()`, Express may not understand the body properly.

With `express.json()`, we can do:

```js
req.body.url;
```

and get:

```js
"https://google.com";
```

So remember:

```js
require("express");
```

imports Express.

```js
app.use(express.json());
```

adds middleware that teaches Express to read JSON request bodies.

Tiny checkpoint question:

What do you think `req.body` means?

> it is a file where the url sent bythe browser gets stored? and express can access it using .url

Very close. Just one important correction:

`req.body` is **not a file**.

It is a **JavaScript object in memory** that Express creates from the data sent by the client/browser/API tool.

Example client sends:

```json
{
  "url": "https://google.com"
}
```

Express turns that into:

```js
req.body = {
  url: "https://google.com",
};
```

So then we can access:

```js
req.body.url;
```

That gives us:

```js
"https://google.com";
```

Think of it like this:

- `req` = the full incoming request
- `req.body` = the data sent inside the request
- `req.body.url` = the specific `url` field from that data

Next tiny question:

In this code:

```js
router.post("/shorten", async (req, res, next) => {
  const { url, ttlDays } = req.body;
});
```

What do you think this line does?

```js
const { url, ttlDays } = req.body;
```

> i dont know

> hey listen i want to build first then do the qna got it ?

Got it. We’ll **build first, Q&A later**.

Here’s the path now:

1. Get the project running locally.
2. Test `POST /shorten`.
3. Test redirect.
4. Test stats.
5. Then we study what we built.

Since the code is already scaffolded, your next step is to install dependencies.

In the project folder:

```powershell
cd "C:\Users\Admin\Documents\URL shortner"
npm install
```

Then start MongoDB and Redis:

```powershell
docker compose up -d
```

Then run the server:

```powershell
npm run dev
```

When the server is running, test health:

```powershell
curl http://localhost:3000/health
```

Expected output:

```json
{ "status": "ok" }
```

Then test shortening:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

Expected output will look like:

```json
{
  "shortCode": "1",
  "shortUrl": "http://localhost:3000/1",
  "originalUrl": "https://example.com",
  "expiresAt": "..."
}
```

First do only:

```powershell
npm install
```

If it errors, paste the error here and we’ll fix it.

> C:\Users\Admin>cd "C:\Users\Admin\Documents\URL shortner"
>
> C:\Users\Admin\Documents\URL shortner>npm install
> npm warn deprecated uuid@8.3.2: uuid@10 and below is no longer supported. For ESM codebases, update to uuid@latest. For CommonJS codebases, use uuid@11 (but be aware this version will likely be deprecated in 2028).
>
> added 173 packages, and audited 174 packages in 19s
>
> 31 packages are looking for funding
> run `npm fund` for details
>
> 3 moderate severity vulnerabilities
>
> To address all issues (including breaking changes), run:
> npm audit fix --force
>
> Run `npm audit` for details.
>
> C:\Users\Admin\Documents\URL shortner>

Good. `npm install` worked.

Ignore the warning for now. Do **not** run `npm audit fix --force` right now. That can change package versions aggressively and break beginner projects.

Next step: start MongoDB and Redis.

Run this in the same folder:

```powershell
docker compose up -d
```

Then check if they started:

```powershell
docker compose ps
```

You want to see `mongo` and `redis` as running.

If Docker says something like “command not found” or “Docker daemon not running,” paste that here.

> C:\Users\Admin\Documents\URL shortner>docker compose up -d
> 'docker' is not recognized as an internal or external command,
> operable program or batch file.

That means Docker is not installed or not added to PATH.

No panic. You have two choices:

**Option A: Install Docker Desktop**
This is closest to the roadmap because it lets you run MongoDB and Redis locally with one command.

Install: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)

After installing, restart your terminal and try:

```powershell
docker --version
docker compose up -d
```

**Option B: Skip Docker for now**
Use hosted MongoDB and hosted Redis later, but that adds account setup and more moving parts. Since you’re new, I recommend Docker.

My suggestion: **install Docker Desktop**. It will help you a lot in backend projects, not just this one.

After installing Docker Desktop, open it once, wait until it says Docker is running, then come back and run:

```powershell
docker compose up -d
```

> okay hold up
> I am a beginner learning backend development.
>
> I want to build a URL shortener using Node.js, Express, and MongoDB.
>
> Do NOT build the entire project for me.
>
> Act as a mentor.
>
> Break the project into milestones and tell me exactly what file to create and what code to write at each step.
> Wait for me to finish each milestone before giving the next one.

Got it. I’ll switch to mentor mode.

We will build it **one milestone at a time**. I will only give you the current milestone. You finish it, then say “done” or paste the error.

Because the current folder already has code, create a clean practice folder inside it:

```powershell
cd "C:\Users\Admin\Documents\URL shortner"
mkdir practice
cd practice
```

**Milestone 1: Basic Express Server**

Goal: make a backend server that responds to `GET /health`.

Run:

```powershell
npm init -y
npm install express dotenv
npm install --save-dev nodemon
```

Create this folder:

```powershell
mkdir src
```

Create file: `src/app.js`

Write this code:

```js
const express = require("express");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
```

Create file: `src/server.js`

Write this code:

```js
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Create file: `.env`

Write:

```env
PORT=3000
```

Now open `package.json` and replace the `"scripts"` part with:

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

Run:

```powershell
npm run dev
```

Then open another terminal and test:

```powershell
curl http://localhost:3000/health
```

Expected result:

```json
{ "status": "ok" }
```

Stop here after this milestone. Tell me either `done` or paste the error.

> Goal: make a backend server that responds to GET /health.
> how

A backend server is just a program that **listens for requests**.

For this milestone, we want:

When someone visits:

```text
http://localhost:3000/health
```

your server replies:

```json
{ "status": "ok" }
```

Do it exactly like this.

**Step 1: Go to the practice folder**

In PowerShell:

```powershell
cd "C:\Users\Admin\Documents\URL shortner"
mkdir practice
cd practice
```

If `practice` already exists, this is fine:

```powershell
cd "C:\Users\Admin\Documents\URL shortner\practice"
```

**Step 2: Create Node project**

```powershell
npm init -y
```

**Step 3: Install Express**

```powershell
npm install express dotenv
npm install --save-dev nodemon
```

**Step 4: Create folders/files**

```powershell
mkdir src
notepad src\app.js
```

Paste this into `app.js`:

```js
const express = require("express");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
```

Save and close Notepad.

Now create server file:

```powershell
notepad src\server.js
```

Paste:

```js
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Save and close.

Create `.env`:

```powershell
notepad .env
```

Paste:

```env
PORT=3000
```

Save and close.

**Step 5: Edit package.json**

Open:

```powershell
notepad package.json
```

Find the `"scripts"` section. Replace it with this:

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

Save it.

**Step 6: Run server**

```powershell
npm run dev
```

You should see:

```text
Server running on http://localhost:3000
```

Leave that terminal open.

**Step 7: Test it**

Open a second PowerShell window and run:

```powershell
curl http://localhost:3000/health
```

If it works, you’ll see:

```json
{ "status": "ok" }
```

That is the whole goal. Once you see that, tell me `done`.

> done

Nice. Milestone 1 complete.

**Milestone 2: Add Your First API Route**

Goal: make the server accept a URL and return it back.

We are not using MongoDB yet. No database. Just learn how `POST /shorten` works.

Create this file:

```powershell
notepad src\routes.js
```

Paste this:

```js
const express = require("express");

const router = express.Router();

router.post("/shorten", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  return res.json({
    message: "URL received",
    originalUrl: url,
  });
});

module.exports = router;
```

Now open:

```powershell
notepad src\app.js
```

Replace the whole file with:

```js
const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(routes);

module.exports = app;
```

Your server may restart automatically because of `nodemon`.

Now test in another terminal:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

Expected result:

```json
{ "message": "URL received", "originalUrl": "https://example.com" }
```

Also test the error case:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{}"
```

Expected result:

```json
{ "error": "url is required" }
```

Stop here. Tell me `done` or paste the error.

> C:\Users\Admin>curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
> curl: (7) Failed to connect to localhost port 3000 after 2238 ms: Could not connect to server

That error means your server is **not running right now**.

You need two terminals:

**Terminal 1: server terminal**

Run:

```powershell
cd "C:\Users\Admin\Documents\URL shortner\practice"
npm run dev
```

Keep this terminal open. Do not close it.

You should see something like:

```text
Server running on http://localhost:3000
```

**Terminal 2: testing terminal**

Then in a second PowerShell window, run:

```powershell
curl http://localhost:3000/health
```

If that works, then run:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

If `npm run dev` shows an error, paste that error here.

> okay no errors next milestone

Great. Milestone 2 complete.

**Milestone 3: Generate a Short Code**

Goal: when you send a URL, the server returns a fake short code like `abc123`.

Still no MongoDB yet. We are learning the logic first.

Open:

```powershell
notepad src\routes.js
```

Replace the whole file with:

```js
const express = require("express");

const router = express.Router();

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

router.post("/shorten", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortCode = generateShortCode();

  return res.json({
    originalUrl: url,
    shortCode: shortCode,
    shortUrl: `http://localhost:3000/${shortCode}`,
  });
});

module.exports = router;
```

Now test:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

Expected output looks like this:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "k9x2ab",
  "shortUrl": "http://localhost:3000/k9x2ab"
}
```

Your `shortCode` will be different each time. That is okay.

Stop here and tell me `done`.

> done

Great. Milestone 3 complete.

**Milestone 4: Store URLs In Memory**

Goal: when you shorten a URL, save it temporarily in your server’s memory. Then visiting `/:code` should redirect to the original URL.

Still no MongoDB. This data will disappear when the server restarts. That is okay for now.

Open:

```powershell
notepad src\routes.js
```

Replace the whole file with:

```js
const express = require("express");

const router = express.Router();

const urlStore = {};

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

router.post("/shorten", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortCode = generateShortCode();

  urlStore[shortCode] = url;

  return res.json({
    originalUrl: url,
    shortCode: shortCode,
    shortUrl: `http://localhost:3000/${shortCode}`,
  });
});

router.get("/:code", (req, res) => {
  const { code } = req.params;

  const originalUrl = urlStore[code];

  if (!originalUrl) {
    return res.status(404).json({ error: "short url not found" });
  }

  return res.redirect(originalUrl);
});

module.exports = router;
```

Now test:

**Step 1: Create a short URL**

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

You will get something like:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:3000/abc123"
}
```

Copy your actual `shortUrl`.

**Step 2: Visit it**

Paste the `shortUrl` into your browser, or test with:

```powershell
curl -i http://localhost:3000/abc123
```

Replace `abc123` with your real code.

Expected: it should redirect to `https://example.com`.

Stop here and tell me `done` or paste the error.

> done

Beautiful. Milestone 4 complete.

**Milestone 5: Add Click Tracking In Memory**

Goal: every time someone visits the short URL, increase a click counter.

We will also add a stats endpoint:

```text
GET /:code/stats
```

Example:

```text
http://localhost:3000/abc123/stats
```

Open:

```powershell
notepad src\routes.js
```

Replace the whole file with:

```js
const express = require("express");

const router = express.Router();

const urlStore = {};

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

router.post("/shorten", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortCode = generateShortCode();

  urlStore[shortCode] = {
    originalUrl: url,
    clicks: 0,
    createdAt: new Date(),
  };

  return res.json({
    originalUrl: url,
    shortCode: shortCode,
    shortUrl: `http://localhost:3000/${shortCode}`,
  });
});

router.get("/:code/stats", (req, res) => {
  const { code } = req.params;

  const urlData = urlStore[code];

  if (!urlData) {
    return res.status(404).json({ error: "short url not found" });
  }

  return res.json({
    originalUrl: urlData.originalUrl,
    shortCode: code,
    clicks: urlData.clicks,
    createdAt: urlData.createdAt,
  });
});

router.get("/:code", (req, res) => {
  const { code } = req.params;

  const urlData = urlStore[code];

  if (!urlData) {
    return res.status(404).json({ error: "short url not found" });
  }

  urlData.clicks = urlData.clicks + 1;

  return res.redirect(urlData.originalUrl);
});

module.exports = router;
```

Now test:

1. Create short URL:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

2. Visit the short URL in browser 2 or 3 times.

3. Check stats:

```powershell
curl http://localhost:3000/YOUR_CODE/stats
```

Replace `YOUR_CODE` with your actual code.

Expected:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "YOUR_CODE",
  "clicks": 2,
  "createdAt": "..."
}
```

Stop here and tell me `done` or paste the error.

> done

Milestone 5 complete. Nice momentum.

**Milestone 6: Add MongoDB Connection**

Now we stop storing data only in memory and prepare to use a real database.

First question: since Docker did not work on your machine, we’ll use **MongoDB Atlas**. It is free and beginner-friendly.

Do this first:

1. Go to [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
2. Create a free account
3. Create a free cluster
4. Create a database user/password
5. Add your IP address to Network Access
6. Copy your MongoDB connection string

It will look something like:

```text
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

After that, install Mongoose:

```powershell
cd "C:\Users\Admin\Documents\URL shortner\practice"
npm install mongoose
```

Then create file:

```powershell
notepad src\db.js
```

Paste this:

```js
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
```

Open:

```powershell
notepad src\server.js
```

Replace the whole file with:

```js
require("dotenv").config();

const app = require("./app");
const connectDB = require("./db");

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
```

Open `.env`:

```powershell
notepad .env
```

Add your MongoDB URI:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string_here
```

Important: replace `your_mongodb_connection_string_here` with your real Atlas connection string.

Then run:

```powershell
npm run dev
```

Expected:

```text
MongoDB connected
Server running on http://localhost:3000
```

Stop here. Tell me `done` if connected, or paste the error.

> wait i think we can use docker

Yes, we can use Docker if you install Docker Desktop first. That is actually the better local-dev path for this project.

Earlier this failed:

```text
'docker' is not recognized
```

That means Windows cannot find Docker. So do this:

1. Install Docker Desktop:
   [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)

2. Open Docker Desktop after installation.

3. Wait until it says Docker is running.

4. Close and reopen PowerShell.

5. Check:

```powershell
docker --version
```

Then:

```powershell
docker compose version
```

If both work, go to your practice project:

```powershell
cd "C:\Users\Admin\Documents\URL shortner\practice"
```

Create this file:

```powershell
notepad docker-compose.yml
```

Paste:

```yaml
services:
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

Then run:

```powershell
docker compose up -d
```

If it works, your local MongoDB URL will be:

```env
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
```

So your `.env` should be:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
```

Once Docker works, tell me `docker ready`, and we’ll continue MongoDB integration from there.

> C:\Users\Admin\Documents\URL shortner\practice>docker compose up -d
> [+] up 14/14
> ✔ Image mongo:7 Pulled 68.6s
> ✔ Network practice_default Created 0.3s
> ✔ Volume practice_mongo_data Created 0.0s
> ✔ Container practice-mongo-1 Started 4.5s
>
> What's next:
> Filter, search, and stream logs from all your Compose services
> in one place with Docker Desktop's Logs view. docker-desktop://dashboard/logs?appId=practice
> got this

Perfect. Docker + MongoDB are running.

Now we connect your Express app to MongoDB.

**Milestone 6: Connect Express To MongoDB**

Step 1: install Mongoose:

```powershell
npm install mongoose
```

Step 2: create `.env` if you don’t already have it:

```powershell
notepad .env
```

Make sure it has this:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
```

Step 3: create database connection file:

```powershell
notepad src\db.js
```

Paste:

```js
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
```

Step 4: update server file:

```powershell
notepad src\server.js
```

Replace the whole file with:

```js
require("dotenv").config();

const app = require("./app");
const connectDB = require("./db");

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
```

Step 5: run server:

```powershell
npm run dev
```

Expected:

```text
MongoDB connected
Server running on http://localhost:3000
```

Stop here and tell me `done` or paste the error.

> MONGO_URI=mongodb://localhost:27017/url_shortener_practice
> are you sure it is this url or
> docker-desktop://dashboard/logs?appId=practice
> this one

Yes, I’m sure: use this one in `.env`:

```env
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
```

The other one:

```text
docker-desktop://dashboard/logs?appId=practice
```

is **not a database URL**.

That is only a special Docker Desktop link to open the logs screen in the Docker app.

Think of it like this:

```text
mongodb://localhost:27017/url_shortener_practice
```

means:

> “My Node app should connect to MongoDB running on my own computer, on port 27017, and use a database named url_shortener_practice.”

This part came from your `docker-compose.yml`:

```yaml
ports:
  - "27017:27017"
```

That exposed MongoDB to your computer at:

```text
localhost:27017
```

So your `.env` should be:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
```

> done

Great. Milestone 6 complete.

**Milestone 7: Create A URL Model**

Goal: define what one saved short URL looks like in MongoDB.

Create a folder:

```powershell
mkdir src\models
```

Create file:

```powershell
notepad src\models\Url.js
```

Paste this:

```js
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
```

That’s it for this milestone.

To make sure there are no syntax errors, restart your server:

```powershell
npm run dev
```

Expected:

```text
MongoDB connected
Server running on http://localhost:3000
```

Stop here and tell me `done` or paste the error.

> done

Nice. Milestone 7 complete.

**Milestone 8: Save Short URLs To MongoDB**

Goal: when you call `POST /shorten`, save the URL in MongoDB instead of only memory.

Open:

```powershell
notepad src\routes.js
```

Replace the whole file with:

```js
const express = require("express");
const Url = require("./models/Url");

const router = express.Router();

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

router.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    const shortCode = generateShortCode();

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode: shortCode,
    });

    return res.json({
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: `http://localhost:3000/${newUrl.shortCode}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:code/stats", async (req, res) => {
  try {
    const { code } = req.params;

    const urlData = await Url.findOne({ shortCode: code });

    if (!urlData) {
      return res.status(404).json({ error: "short url not found" });
    }

    return res.json({
      originalUrl: urlData.originalUrl,
      shortCode: urlData.shortCode,
      clicks: urlData.clicks,
      createdAt: urlData.createdAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const urlData = await Url.findOne({ shortCode: code });

    if (!urlData) {
      return res.status(404).json({ error: "short url not found" });
    }

    urlData.clicks = urlData.clicks + 1;
    await urlData.save();

    return res.redirect(urlData.originalUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
```

Now test:

1. Make sure server is running:

```powershell
npm run dev
```

2. In another terminal:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

3. Copy the returned `shortCode`.

4. Check stats:

```powershell
curl http://localhost:3000/YOUR_CODE/stats
```

5. Visit redirect:

```powershell
curl -i http://localhost:3000/YOUR_CODE
```

6. Check stats again. `clicks` should increase.

Stop here and tell me `done` or paste the error.

> done
> pause here
> how much have we completed so far
> and should i take any screenshots to add somewhere

Paused here. You’ve completed the **core beginner backend** version.

So far you built:

1. **Express server**
   - `GET /health`
   - Confirms the server is alive

2. **POST API**
   - `POST /shorten`
   - Accepts a long URL from JSON body

3. **Short code generation**
   - Creates random short codes like `x8a2bc`

4. **Temporary in-memory storage**
   - First version stored URLs inside a JavaScript object

5. **Redirect route**
   - `GET /:code`
   - Redirects short URL to original URL

6. **Click tracking**
   - Counts how many times a short link was visited

7. **MongoDB with Docker**
   - MongoDB running locally through Docker Compose

8. **Mongoose model**
   - Defined a `Url` schema

9. **MongoDB persistence**
   - Short URLs now save into MongoDB
   - Stats and redirects read from MongoDB
   - Clicks update in MongoDB

In roadmap terms, you’ve basically completed **Phase 1: Core service**, except our code uses random short codes instead of the final base62 counter approach. That’s okay. We’ll upgrade that later.

Yes, take screenshots. They’ll help for README, LinkedIn, and your own proof folder.

Take screenshots of:

1. **Terminal showing server running**
   - Should show:

   ```text
   MongoDB connected
   Server running on http://localhost:3000
   ```

2. **`POST /shorten` result**
   - Shows original URL, shortCode, shortUrl

3. **Redirect test**
   - Browser opened with your short URL redirecting to `example.com`
   - Or terminal showing `curl -i` with redirect status

4. **Stats endpoint**
   - Shows clicks increasing

5. **Docker Desktop / `docker compose ps`**
   - Shows MongoDB container running

Optional but useful:

- Screenshot of MongoDB data if you use MongoDB Compass later.

Create a folder like:

```text
project-proof/
```

and save screenshots with names like:

```text
01-server-running.png
02-shorten-endpoint.png
03-redirect-working.png
04-click-stats.png
05-mongodb-docker.png
```

This is not for the resume directly, but it’s great proof while learning and useful when writing your README later.

> Docker Desktop / docker compose ps
> Shows MongoDB container running
> what screenshot is this
> and percentage wise how much percent of the project are we done with

For the Docker screenshot, run this in PowerShell:

```powershell
cd "C:\Users\Admin\Documents\URL shortner\practice"
docker compose ps
```

You should see something like:

```text
NAME               IMAGE     STATUS        PORTS
practice-mongo-1   mongo:7   Up ...        0.0.0.0:27017->27017/tcp
```

Take a screenshot of that terminal. It proves your MongoDB database is running locally through Docker.

You can also screenshot Docker Desktop if you prefer:

- Open Docker Desktop
- Go to **Containers**
- Find your `practice` project
- Show `practice-mongo-1` running

Either one is fine. Terminal screenshot is simpler.

Percentage-wise:

You are about **35% done** with the full roadmap.

Breakdown:

- Phase 1 Core service: **80% done**
- Phase 2 Redis caching + expiry: **0% done**
- Phase 3 Rate limiting + stress test: **0% done**
- Phase 4 Deploy + documentation: **10% done**, because you already have working proof and a basic structure

Overall: **around 35%**.

Why not 50%? Because Redis, expiry, rate limiting, stress testing, deployment, and docs are still big resume-worthy parts. But you’ve crossed the hardest beginner wall: server + API + database working together.

> okay damn .. im scared i wont be able to explain in the interview

That fear is normal. Honestly, it’s a good sign. It means you care about not faking it.

And you’re not supposed to explain the whole project perfectly right now. You only need to explain the part you’ve actually built.

Right now your interview explanation can be very simple:

> “I built the core backend of a URL shortener using Node.js and Express. It has an endpoint to create a short URL, stores the original URL and short code in MongoDB using Mongoose, redirects users when they visit the short code, and tracks click counts.”

That’s already a real answer.

If they ask, “How does it work?” you say:

> “When the user sends a long URL to `POST /shorten`, the server generates a short code, saves the long URL and code in MongoDB, and returns a short URL. When someone visits `/:code`, the server looks up that code in MongoDB, increments the click count, and redirects to the original URL.”

That is enough for Phase 1.

You do **not** need to sound like a senior engineer. You need to sound honest and clear.

Best strategy:

After every milestone, we’ll make you a tiny “interview script”:

- What did I build?
- Why did I build it?
- What files are involved?
- What could break?
- How would I improve it?

By the time this project is done, you won’t memorize answers. You’ll understand the story.

For now, your Phase 1 confidence line is:

> “I understand the request flow: client sends URL → Express route receives it → Mongoose saves it → MongoDB stores it → redirect route reads it → click count updates.”

That’s the whole heart of the project.

> okay lets finish up the phase 1 milestones

Good. Let’s finish Phase 1.

Right now Phase 1 is working, but we need to improve one thing:

Currently your short code is random:

```js
Math.random().toString(36).substring(2, 8);
```

For the roadmap, we want a **base62 encoder**.

**Milestone 9: Replace Random Code With Base62 Counter**

Goal:

Instead of random short codes, we use numbers:

```text
1 -> 1
10 -> a
61 -> Z
62 -> 10
```

First, create a utils folder:

```powershell
mkdir src\utils
```

Create file:

```powershell
notepad src\utils\base62.js
```

Paste:

```js
const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encodeBase62(number) {
  if (number === 0) {
    return "0";
  }

  let result = "";

  while (number > 0) {
    const remainder = number % 62;
    result = characters[remainder] + result;
    number = Math.floor(number / 62);
  }

  return result;
}

module.exports = encodeBase62;
```

Now create a counter model.

Create file:

```powershell
notepad src\models\Counter.js
```

Paste:

```js
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
```

Now open:

```powershell
notepad src\routes.js
```

Replace the whole file with:

```js
const express = require("express");
const Url = require("./models/Url");
const Counter = require("./models/Counter");
const encodeBase62 = require("./utils/base62");

const router = express.Router();

async function generateShortCode() {
  const counter = await Counter.findOneAndUpdate(
    { name: "url" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );

  return encodeBase62(counter.value);
}

router.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    const shortCode = await generateShortCode();

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode: shortCode,
    });

    return res.json({
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: `http://localhost:3000/${newUrl.shortCode}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:code/stats", async (req, res) => {
  try {
    const { code } = req.params;

    const urlData = await Url.findOne({ shortCode: code });

    if (!urlData) {
      return res.status(404).json({ error: "short url not found" });
    }

    return res.json({
      originalUrl: urlData.originalUrl,
      shortCode: urlData.shortCode,
      clicks: urlData.clicks,
      createdAt: urlData.createdAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const urlData = await Url.findOne({ shortCode: code });

    if (!urlData) {
      return res.status(404).json({ error: "short url not found" });
    }

    urlData.clicks = urlData.clicks + 1;
    await urlData.save();

    return res.redirect(urlData.originalUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
```

Now test by creating a few short URLs:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

Run it multiple times.

Expected short codes should look like:

```text
1
2
3
4
```

Stop here and tell me `done` or paste the error.

> C:\Users\Admin\Documents\URL shortner\practice>npm run dev
>
> > practice@1.0.0 dev
> > nodemon src/server.js
>
> [nodemon] 3.1.14
> [nodemon] to restart at any time, enter `rs`
> [nodemon] watching path(s): _._
> [nodemon] watching extensions: js,mjs,cjs,json
> [nodemon] starting `node src/server.js`
> ◇ injected env (2) from .env // tip: ⌁ auth for agents [www.vestauth.com]
> node:internal/modules/cjs/loader:1386
> throw err;
> ^
>
> Error: Cannot find module './models/Counter'
> Require stack:
>
> - C:\Users\Admin\Documents\URL shortner\practice\src\routes.js
> - C:\Users\Admin\Documents\URL shortner\practice\src\app.js
> - C:\Users\Admin\Documents\URL shortner\practice\src\server.js
>   at Function.\_resolveFilename (node:internal/modules/cjs/loader:1383:15)
>   at defaultResolveImpl (node:internal/modules/cjs/loader:1025:19)
>   at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1030:22)
>   at Function.\_load (node:internal/modules/cjs/loader:1192:37)
>   at TracingChannel.traceSync (node:diagnostics_channel:322:14)
>   at wrapModuleLoad (node:internal/modules/cjs/loader:237:24)
>   at Module.require (node:internal/modules/cjs/loader:1463:12)
>   at require (node:internal/modules/helpers:147:16)
>   at Object.<anonymous> (C:\Users\Admin\Documents\URL shortner\practice\src\routes.js:3:17)
>   at Module.\_compile (node:internal/modules/cjs/loader:1706:14) {
>   code: 'MODULE_NOT_FOUND',
>   requireStack: [
>   > 'C:\\Users\\Admin\\Documents\\URL shortner\\practice\\src\\routes.js',
>   > 'C:\\Users\\Admin\\Documents\\URL shortner\\practice\\src\\app.js',
>   > 'C:\\Users\\Admin\\Documents\\URL shortner\\practice\\src\\server.js'
>   > ]
>   }
>
> Node.js v22.20.0
> [nodemon] app crashed - waiting for file changes before starting...

Good error. This means your `routes.js` is trying to load this file:

```js
./models/Counter
```

but the file does not exist where Node expects it.

Check this first:

```powershell
dir src\models
```

You should see:

```text
Counter.js
Url.js
```

Most likely one of these happened:

- You forgot to create `Counter.js`
- It got saved as `Counter.js.txt`
- It was saved in the wrong folder
- File name spelling/capitalization is different

Fix it like this:

```powershell
notepad src\models\Counter.js
```

Paste this again:

```js
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
```

Save it.

Then also check the base62 file exists:

```powershell
dir src\utils
```

You should see:

```text
base62.js
```

If not, create it:

```powershell
mkdir src\utils
notepad src\utils\base62.js
```

Paste:

```js
const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encodeBase62(number) {
  if (number === 0) {
    return "0";
  }

  let result = "";

  while (number > 0) {
    const remainder = number % 62;
    result = characters[remainder] + result;
    number = Math.floor(number / 62);
  }

  return result;
}

module.exports = encodeBase62;
```

After saving, nodemon should restart automatically. If not, run:

```powershell
npm run dev
```

Expected:

```text
MongoDB connected
Server running on http://localhost:3000
```

> done

Great. Now test the base62 counter version.

In your second terminal, run this 3 times:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

You should get short codes like:

```text
1
2
3
```

Maybe higher if your counter already has values. That is fine.

Then test stats:

```powershell
curl http://localhost:3000/YOUR_CODE/stats
```

Then test redirect:

```powershell
curl -i http://localhost:3000/YOUR_CODE
```

Replace `YOUR_CODE` with the code you actually got.

If all 3 work, say `phase 1 done`.

> okay lets pause here

Paused.

Current status: you’re at the final testing part of **Phase 1**.

Completed in Phase 1 so far:

- Express server
- `GET /health`
- `POST /shorten`
- URL validation for missing input
- MongoDB running through Docker
- Mongoose connection
- `Url` model
- Save short URLs to MongoDB
- Redirect with `GET /:code`
- Click tracking
- Stats endpoint `GET /:code/stats`
- Base62 encoder file
- MongoDB counter model for sequential short codes

Remaining before Phase 1 is fully done:

1. Run `POST /shorten` a few times.
2. Confirm short codes are generated from the counter.
3. Test `GET /:code`.
4. Test `GET /:code/stats`.
5. Confirm click count increases.

When you come back, just say:

> continue Phase 1 testing

and we’ll resume exactly there.

> continue Phase 1 testing

Good. Let’s finish Phase 1 testing.

Make sure your server terminal is running:

```powershell
npm run dev
```

Expected:

```text
MongoDB connected
Server running on http://localhost:3000
```

Now in a second terminal, run:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

You should get something like:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "1",
  "shortUrl": "http://localhost:3000/1"
}
```

Copy your actual `shortCode`.

Then test stats:

```powershell
curl http://localhost:3000/YOUR_CODE/stats
```

Replace `YOUR_CODE`.

Then test redirect:

```powershell
curl -i http://localhost:3000/YOUR_CODE
```

Then test stats again:

```powershell
curl http://localhost:3000/YOUR_CODE/stats
```

You want to see `clicks` increase by 1.

Paste your outputs here, or say `phase 1 done` if everything worked.

> phase 1 done

Phase 1 done. That is a real checkpoint.

You have completed the **core URL shortener service**:

- `POST /shorten` creates a short URL
- Short codes come from a base62 counter
- MongoDB stores the original URL, short code, click count, and created date
- `GET /:code` redirects to the original URL
- Each redirect increments clicks
- `GET /:code/stats` returns metadata and click count
- MongoDB runs locally in Docker

Resume-wise, you can now honestly say:

> Built the core backend for a URL shortener using Node.js, Express, MongoDB, and Mongoose, with base62 short-code generation, redirect handling, and click analytics.

Next phase will be **Phase 2: Redis caching + expiry**.

Before starting Phase 2, I recommend you take these screenshots:

1. `POST /shorten` response
2. `GET /:code/stats` before redirect
3. `curl -i http://localhost:3000/YOUR_CODE` showing redirect
4. `GET /:code/stats` after redirect showing clicks increased
5. `docker compose ps` showing MongoDB running

When ready, say:

> start Phase 2

> okay .. should i push it to git now itself as phase 1 or in the end

Push it now as **Phase 1**.

That’s the better habit and it makes your project look more real. Real projects are built in steps, not one giant final dump.

Do it like this:

1. Commit after Phase 1:

```powershell
git add .
git commit -m "Complete phase 1 core URL shortener"
```

2. Push to GitHub:

```powershell
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Replace:

```text
YOUR_GITHUB_REPO_URL
```

with your repo URL from GitHub.

Why push now:

- You get a clean checkpoint
- If something breaks in Phase 2, you can compare
- Your GitHub history shows you built it step by step
- It helps you explain your learning journey

One thing before committing: make sure `.env` is ignored.

Run:

```powershell
type .gitignore
```

It should include:

```text
.env
node_modules/
```

If your practice folder does not have a `.gitignore`, create one:

```powershell
notepad .gitignore
```

Put:

```text
node_modules/
.env
```

Then commit.

So yes: **push Phase 1 now.**

> C:\Users\Admin\Documents\URL shortner\practice>type .gitignore
> The system cannot find the file specified.

Create it now. Very important before Git.

In your `practice` folder, run:

```powershell
notepad .gitignore
```

Paste this:

```text
node_modules/
.env
```

Save and close.

Then check:

```powershell
type .gitignore
```

You should see:

```text
node_modules/
.env
```

Now check what Git will track:

```powershell
git status
```

Important: if you see `.env` under files to be committed, stop and tell me. We do not want `.env` on GitHub.

> wait i had already pushed everyhting to github and only then did the env thing

That’s okay. Don’t panic.

If your `.env` only has this:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
```

then you did **not leak a real password**. It’s just local config. Still, we should remove `.env` from GitHub because it’s a bad habit to keep env files there.

Do this from your `practice` folder:

```powershell
notepad .gitignore
```

Add:

```text
node_modules/
.env
```

Save it.

Now run:

```powershell
git rm --cached .env
git add .gitignore
git commit -m "Ignore environment file"
git push
```

Important: `git rm --cached .env` removes `.env` from Git tracking, but keeps it on your computer.

After pushing, GitHub’s latest version should no longer show `.env`.

If your `.env` had a real MongoDB Atlas username/password, then you would need to change that password. But for local Docker MongoDB, you’re fine.

> C:\Users\Admin\Documents\URL shortner\practice>git rm --cached .env
> fatal: pathspec '.env' did not match any files

That message means Git is saying:

> “I am not tracking `.env` right now.”

So that’s actually good.

Now do these checks.

Run:

```powershell
git status
```

Then run:

```powershell
git ls-files
```

Look through the output.

If you **do not** see `.env`, you’re safe.

Now create/add `.gitignore`:

```powershell
notepad .gitignore
```

Put this inside:

```text
node_modules/
.env
```

Save it.

Then commit just the `.gitignore`:

```powershell
git add .gitignore
git commit -m "Add gitignore"
git push
```

One more thing: check GitHub manually. Open your repo in the browser and see whether `.env` appears in the file list.

- If `.env` is **not there**, all good.
- If `.env` **is there**, tell me, and we’ll remove it from the repo history/latest commit properly.

> C:\Users\Admin\Documents\URL shortner\practice>git status
> On branch main
> Your branch is up to date with 'origin/main'.
>
> Untracked files:
> (use "git add <file>..." to include in what will be committed)
> ../.env.example
> ../.gitignore
> ../ARCHITECTURE.md
> ../README.md
> ../docker-compose.yml
> ../package-lock.json
> ../package.json
> .gitignore
> ../src/
> ../test/
>
> nothing added to commit but untracked files present (use "git add" to track)
>
> C:\Users\Admin\Documents\URL shortner\practice>git ls-files
> docker-compose.yml
> package-lock.json
> package.json
> src/app.js
> src/db.js
> src/models/Counter.js
> src/models/Url.js
> src/routes.js
> src/server.js
> src/utils/base62.js

Good news: `.env` is **not tracked**.

Your `git ls-files` output does **not** show `.env`, so you did not push your `.env` file.

Now commit the `.gitignore` from inside `practice`:

```powershell
git add .gitignore
git commit -m "Add gitignore"
git push
```

Important: do **not** run `git add .` from the parent folder right now, because Git is also seeing those `../README.md`, `../src/`, etc. files from the earlier scaffold outside your `practice` folder.

For now, keep working inside:

```powershell
C:\Users\Admin\Documents\URL shortner\practice
```

And only add files intentionally. You’re safe.

> oh yeah i also wanted to ask this
> this thing that were pushing is the practice version right .. so what about that
> and also will the interviewers check the timeline f when i pushed n stuff.. like will they match it with the timeline of the poject i have mentioned in my resume
> cz then i think we're doomed

Yes, what you’re pushing right now is the **practice version**.

That is not a bad thing. Actually, that’s the better version to put on GitHub because **you built this one step by step**. The earlier scaffold I made in the parent folder is more like a reference/answer key. Your `practice` folder is the real learning version.

About interviewers checking push timeline: usually, no. Most interviewers will not deeply inspect commit timestamps unless:

- it’s a very GitHub-heavy open-source role
- they suspect the project is fake
- they are doing a deep portfolio review
- the project is central to your resume

But even if they do check, you are not doomed.

Do **not** lie and say:

> “I spent 3 months building this production system from scratch.”

Instead say something honest and strong:

> “I built this as a focused backend learning project. I started with the core URL shortener, then added MongoDB persistence, and I’m extending it with Redis caching, rate limiting, and deployment.”

That sounds completely fine.

Resume timelines do not need to say “I worked on this for 10 days exactly.” You can write:

```text
URL Shortener Backend | Node.js, Express, MongoDB, Redis
Personal Project
```

No date needed. Or just:

```text
2026
```

Also, a project built in 1-2 weeks is totally valid if you understand it well. The danger is not the timeline. The danger is listing technologies you cannot explain.

My suggestion:

- Use the `practice` project as the GitHub repo
- Keep commits like:
  - `Set up Express server`
  - `Add MongoDB persistence`
  - `Add base62 short code generation`
  - `Add Redis caching`
  - `Add rate limiting`
  - `Add deployment docs`
- On resume, don’t exaggerate the timeline
- In interviews, frame it as a learning project you built intentionally

You’re not doomed. You’re just early. Big difference.

> okay but i think this is the heaviest project on my resume .. on a scale of 1 to 10 for a second year passout appearing for interviews - how great do you think it is
>
> and since this is my central project - and i dont know a lot of tech stacks i am using in this - i am worried
>
> also i have been pushing this as "practice" - i want to create the whole project in this but i dont want the name to be visible as practice

For a second-year passout, if you finish the full roadmap and can explain it, I’d rate it around **7.5/10 to 8/10** as a backend resume project.

If it only stays at Phase 1, it’s more like **5.5/10 to 6/10**.

Why full version is strong:

- It has real backend fundamentals: routes, database, redirects
- It has system design flavor: Redis caching, TTL, rate limiting
- It has measurable performance: cold vs warm latency
- It has deployability: Railway/live URL
- It gives interviewers many good discussion points

Your worry is valid, though. This project becomes risky only if your resume says:

> “Built scalable distributed URL shortener using Redis and MongoDB”

but you cannot explain Redis, TTL, 302 redirects, rate limiting, or MongoDB schemas.

So the rule is:

**Only put the parts on your resume after we build and study them.**

Right now your honest resume version is:

> Built a URL shortener backend using Node.js, Express, MongoDB, and Mongoose with short-code generation, redirect handling, click tracking, and stats API.

Later, after Phase 2 and 3, we upgrade the resume bullet.

About the name `practice`: yes, change it. You do not want GitHub showing `practice` as the project name.

You have three names to think about:

1. **Folder name on your laptop**
   Can be changed.

2. **GitHub repo name**
   Should be professional, like:
   - `url-shortener-backend`
   - `scalable-url-shortener`
   - `shortlink-service`

3. **package.json name**
   Should also not be `practice`.

Best name: **`url-shortener-backend`**.

To rename the package, open:

```powershell
notepad package.json
```

Change:

```json
"name": "practice"
```

to:

```json
"name": "url-shortener-backend"
```

Then commit:

```powershell
git add package.json package-lock.json
git commit -m "Rename project package"
git push
```

For GitHub repo name:

- Go to your GitHub repo
- Click **Settings**
- At the top, rename repository from `practice` to `url-shortener-backend`

That is enough. The local folder can still be called `practice`; interviewers won’t see your local folder name. But if you want, you can rename it later too.

> my repo name is URL-shortener

`URL-shortener` is totally fine. Professional enough.

If you want it slightly cleaner, I’d use:

```text
url-shortener
```

Lowercase is more common on GitHub, but your current name is not a problem.

What you should change is the project’s internal package name if it still says `practice`.

In your `practice` folder, run:

```powershell
type package.json
```

Look for:

```json
"name": "practice"
```

If you see that, open:

```powershell
notepad package.json
```

Change it to:

```json
"name": "url-shortener"
```

Then run:

```powershell
npm install
```

That updates `package-lock.json` too.

Then commit:

```powershell
git add package.json package-lock.json
git commit -m "Rename package to url shortener"
git push
```

Your GitHub repo name `URL-shortener` is okay. The visible repo is what interviewers usually see, not your local folder name.

> no thats it my repo name is URL-shortener

Then you’re good. `URL-shortener` is fine as the repo name.

The only thing to make sure is: inside `package.json`, don’t leave the name as `practice`.

Use:

```json
"name": "url-shortener"
```

That way:

- GitHub repo: `URL-shortener`
- Project/package name: `url-shortener`
- Local folder can be `practice`, no one cares

So your repo name is okay. No need to rename it unless you personally want lowercase later.

> no
> githus repo is URL-shortener-backened
> project name also URL-shortener-backened
> local folder practice

That’s fine.

Final naming situation:

```text
GitHub repo:     URL-shortener-backened
Project name:    URL-shortener-backened
Local folder:    practice
```

The **local folder name does not matter**. Interviewers will not see it.

One thing: you probably meant **backend**, not **backened**.

Correct spelling:

```text
URL-shortener-backend
```

Current spelling:

```text
URL-shortener-backened
```

I strongly recommend fixing that typo now, before you share it anywhere.

Use:

```text
URL-shortener-backend
```

for both:

- GitHub repo name
- `package.json` name, preferably lowercase:
  ```json
  "name": "url-shortener-backend"
  ```

This is worth fixing because spelling mistakes in repo names look careless, even if the code is good.

> okay all done .. how much percentage of project are we done wiht

You’re about **35% done** overall.

Current status:

- **Phase 1: Core service**: **100% done**
  - Express server
  - `POST /shorten`
  - Base62 short codes
  - MongoDB storage
  - Redirects
  - Click tracking
  - Stats endpoint

- **Phase 2: Redis caching + expiry**: **0% done**
- **Phase 3: Rate limiting + stress testing**: **0% done**
- **Phase 4: Deploy + docs**: **10% done**
  - You have a GitHub repo and some progress history now

Overall: **around 35%**.

This is a good checkpoint. The core thing works. From here, the project starts becoming more “resume-heavy” because Redis, expiry, rate limiting, benchmarks, and deployment are what make it stand out.

> okay for today lets finish phase 2
> Only put the parts on your resume after we build and study them.
> rememeber
> before starting phase 2, lets say i am a beginner who has very less knowledge about backened but is fast at learning, how long will i take to learn this project on a resume level

Yes, I remember: **we only add resume claims after you build and study that part.**

For your level, assuming you’re fast at learning but still new to backend:

**To build the whole project:** around **7-10 focused days**
**To understand it at resume/interview level:** around **2-3 weeks**

That means not just “it works,” but you can explain:

- what each route does
- why MongoDB is used
- why Redis is added
- what cache hit/miss means
- why redirects use `302`
- how click tracking works
- how expiry works
- how token bucket rate limiting works
- what the stress test numbers mean
- what would break at higher scale

For **Phase 1**, you can probably get interview-comfortable in **1-2 days of review**, because you built it step by step.

For **Phase 2 Redis + expiry**, expect:

- **Build it:** 2-4 hours
- **Understand it properly:** 1-2 days
- **Explain confidently in interview:** after testing cache hit/miss and expiry yourself a few times

For the **full resume-ready project**, realistic timeline:

```text
Build all phases:        7-10 days
Study deeply:            7-14 more days
Total confidence time:   2-3 weeks
```

If you study seriously every day, this can become a strong central project. Not because it uses fancy tech, but because it has a clean story:

> “I started with a basic URL shortener, then improved it with persistence, caching, expiry, rate limiting, benchmarking, and deployment.”

That story is very interview-friendly.

For today, finishing Phase 2 is possible. But after we build it, don’t immediately write “Redis optimized redirects” on your resume until you can explain this sentence:

> “On redirect, I check Redis first. If the URL is cached, I redirect immediately. If not, I fetch from MongoDB, store it in Redis with a TTL, then redirect.”

Once that sentence feels natural, Phase 2 earns its spot on the resume.

> okay understood lets begin phase 2 now

Good. Phase 2 starts now.

**Phase 2 Goal**

Add Redis so redirects become faster.

Right now every redirect does this:

```text
GET /:code -> check MongoDB -> redirect
```

After Redis:

```text
GET /:code -> check Redis first
          -> if found, redirect
          -> if not found, check MongoDB, save in Redis, redirect
```

This is called **cache-aside pattern**.

**Milestone 10: Add Redis To Docker**

Goal: run Redis locally beside MongoDB.

Open your Docker file:

```powershell
notepad docker-compose.yml
```

Replace the whole file with this:

```yaml
services:
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  mongo_data:
```

Now run:

```powershell
docker compose up -d
```

Then check:

```powershell
docker compose ps
```

Expected: you should see both:

```text
mongo
redis
```

running.

Now install Redis client package:

```powershell
npm install ioredis
```

Stop here and tell me `done` or paste the error.

> done

Nice. Redis is now part of your local stack.

**Milestone 11: Connect Express App To Redis**

Goal: create one Redis connection file and make sure the server can connect.

Create file:

```powershell
notepad src\redis.js
```

Paste:

```js
const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (error) => {
  console.error("Redis error:", error.message);
});

module.exports = redis;
```

Open your `.env`:

```powershell
notepad .env
```

Make sure it has:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
REDIS_URL=redis://localhost:6379
```

Now open:

```powershell
notepad src\server.js
```

Replace it with this:

```js
require("dotenv").config();

const app = require("./app");
const connectDB = require("./db");
require("./redis");

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
```

Now run:

```powershell
npm run dev
```

Expected:

```text
Redis connected
MongoDB connected
Server running on http://localhost:3000
```

Stop here and tell me `done` or paste the error.

> done

Good. Milestone 11 complete.

**Milestone 12: Add Redis Cache On Redirect**

Goal: when someone visits a short URL, check Redis first before MongoDB.

Open:

```powershell
notepad src\routes.js
```

Replace the whole file with this:

```js
const express = require("express");
const Url = require("./models/Url");
const Counter = require("./models/Counter");
const encodeBase62 = require("./utils/base62");
const redis = require("./redis");

const router = express.Router();

async function generateShortCode() {
  const counter = await Counter.findOneAndUpdate(
    { name: "url" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );

  return encodeBase62(counter.value);
}

router.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    const shortCode = await generateShortCode();

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode: shortCode,
    });

    await redis.set(
      `url:${newUrl.shortCode}`,
      newUrl.originalUrl,
      "EX",
      24 * 60 * 60,
    );

    return res.json({
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: `http://localhost:3000/${newUrl.shortCode}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:code/stats", async (req, res) => {
  try {
    const { code } = req.params;

    const urlData = await Url.findOne({ shortCode: code });

    if (!urlData) {
      return res.status(404).json({ error: "short url not found" });
    }

    return res.json({
      originalUrl: urlData.originalUrl,
      shortCode: urlData.shortCode,
      clicks: urlData.clicks,
      createdAt: urlData.createdAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const cachedUrl = await redis.get(`url:${code}`);

    if (cachedUrl) {
      console.log("CACHE HIT");
      await Url.updateOne({ shortCode: code }, { $inc: { clicks: 1 } });
      return res.redirect(cachedUrl);
    }

    console.log("CACHE MISS");

    const urlData = await Url.findOne({ shortCode: code });

    if (!urlData) {
      return res.status(404).json({ error: "short url not found" });
    }

    await redis.set(
      `url:${urlData.shortCode}`,
      urlData.originalUrl,
      "EX",
      24 * 60 * 60,
    );

    await Url.updateOne({ shortCode: code }, { $inc: { clicks: 1 } });

    return res.redirect(urlData.originalUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
```

Now test:

1. Restart server if needed:

```powershell
npm run dev
```

2. Create a short URL:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

3. Visit it:

```powershell
curl -i http://localhost:3000/YOUR_CODE
```

Since `POST /shorten` also saves to Redis, this should show in your server terminal:

```text
CACHE HIT
```

4. To test `CACHE MISS`, use an old code that exists in MongoDB from before Redis was added. When you visit it, server should print:

```text
CACHE MISS
```

Then visiting the same old code again should print:

```text
CACHE HIT
```

Stop here and tell me `done` or paste the error.

> C:\Users\Admin>curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
> {"originalUrl":"https://example.com","shortCode":"d","shortUrl":"http://localhost:3000/d"}
> C:\Users\Admin>curl -i http://localhost:3000/d
> HTTP/1.1 302 Found
> X-Powered-By: Express
>
> Location: https://example.com
> Vary: Accept
> Content-Type: text/plain; charset=utf-8
> Content-Length: 41
> Date: Fri, 12 Jun 2026 17:12:59 GMT
> Connection: keep-alive
> Keep-Alive: timeout=5
>
> Found. Redirecting to https://example.com
> C:\Users\Admin>curl -i http://localhost:3000/d
> HTTP/1.1 302 Found
> X-Powered-By: Express
> Location: https://example.com
> Vary: Accept
> Content-Type: text/plain; charset=utf-8
> Content-Length: 41
> Date: Fri, 12 Jun 2026 17:15:28 GMT
> Connection: keep-alive
> Keep-Alive: timeout=5
>
> Found. Redirecting to https://example.com
> C:\Users\Admin>
>
> on the first and second access i got this.. i didnt get cache hit or mis

Your `curl` output is correct. The redirect worked.

`CACHE HIT` / `CACHE MISS` will **not appear in the curl terminal**.

They appear in the **server terminal** where you ran:

```powershell
npm run dev
```

So check the terminal that says:

```text
Server running on http://localhost:3000
```

After you hit:

```powershell
curl -i http://localhost:3000/d
```

that server terminal should show:

```text
CACHE HIT
```

In your case, because `POST /shorten` immediately saved the URL to Redis, both first and second redirects for code `d` should be:

```text
CACHE HIT
CACHE HIT
```

To test `CACHE MISS`, do this:

1. In your server terminal, press:

```text
Ctrl + C
```

2. Run Redis clear command:

```powershell
docker exec -it practice-redis-1 redis-cli FLUSHALL
```

If that container name fails, run:

```powershell
docker compose ps
```

and use the Redis container name shown there.

3. Start server again:

```powershell
npm run dev
```

4. Now visit the same existing code:

```powershell
curl -i http://localhost:3000/d
```

Server terminal should show:

```text
CACHE MISS
```

5. Visit again:

```powershell
curl -i http://localhost:3000/d
```

Server terminal should show:

```text
CACHE HIT
```

So: your API worked. You just need to look at the server terminal for the cache logs.

> done

Good. Milestone 12 complete.

You now have Redis cache-aside working:

- New short URL gets saved to MongoDB
- It also gets cached in Redis
- Redirect checks Redis first
- If Redis has it: `CACHE HIT`
- If Redis does not have it: `CACHE MISS`, then MongoDB is checked and Redis is filled again

That is a major resume-level feature once you understand it.

Now Phase 2 has one more big part: **expiry**.

**Milestone 13: Add `expiresAt` To URL Model**

Goal: every short URL should have an expiry date.

Open:

```powershell
notepad src\models\Url.js
```

Replace the whole file with:

```js
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
```

This adds:

```js
expiresAt;
```

and this line:

```js
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

means MongoDB will eventually delete expired links automatically.

Now restart server:

```powershell
npm run dev
```

If no errors, tell me `done`.

> done

Good. Milestone 13 complete.

**Milestone 14: Accept `ttlDays` In `/shorten`**

Goal: when creating a short URL, allow this:

```json
{
  "url": "https://example.com",
  "ttlDays": 30
}
```

If user does not send `ttlDays`, default to 30 days.

Open:

```powershell
notepad src\routes.js
```

Replace the whole file with this:

```js
const express = require("express");
const Url = require("./models/Url");
const Counter = require("./models/Counter");
const encodeBase62 = require("./utils/base62");
const redis = require("./redis");

const router = express.Router();

async function generateShortCode() {
  const counter = await Counter.findOneAndUpdate(
    { name: "url" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );

  return encodeBase62(counter.value);
}

function getExpiryDate(ttlDays) {
  const days = ttlDays || 30;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

router.post("/shorten", async (req, res) => {
  try {
    const { url, ttlDays } = req.body;

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    const shortCode = await generateShortCode();
    const expiresAt = getExpiryDate(ttlDays);

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode: shortCode,
      expiresAt: expiresAt,
    });

    await redis.set(
      `url:${newUrl.shortCode}`,
      newUrl.originalUrl,
      "EX",
      24 * 60 * 60,
    );

    return res.json({
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: `http://localhost:3000/${newUrl.shortCode}`,
      expiresAt: newUrl.expiresAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:code/stats", async (req, res) => {
  try {
    const { code } = req.params;

    const urlData = await Url.findOne({ shortCode: code });

    if (!urlData) {
      return res.status(404).json({ error: "short url not found" });
    }

    return res.json({
      originalUrl: urlData.originalUrl,
      shortCode: urlData.shortCode,
      clicks: urlData.clicks,
      createdAt: urlData.createdAt,
      expiresAt: urlData.expiresAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const cachedUrl = await redis.get(`url:${code}`);

    if (cachedUrl) {
      console.log("CACHE HIT");
      await Url.updateOne({ shortCode: code }, { $inc: { clicks: 1 } });
      return res.redirect(cachedUrl);
    }

    console.log("CACHE MISS");

    const urlData = await Url.findOne({ shortCode: code });

    if (!urlData) {
      return res.status(404).json({ error: "short url not found" });
    }

    await redis.set(
      `url:${urlData.shortCode}`,
      urlData.originalUrl,
      "EX",
      24 * 60 * 60,
    );

    await Url.updateOne({ shortCode: code }, { $inc: { clicks: 1 } });

    return res.redirect(urlData.originalUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
```

Now test:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\",\"ttlDays\":30}"
```

Expected response now includes:

```json
"expiresAt": "..."
```

Stop here and tell me `done` or paste the error.

> done

Great. Milestone 14 complete.

**Milestone 15: Return `410 Gone` For Expired Links**

Goal: if a link is expired, redirect should not happen. It should return:

```json
{ "error": "short url expired" }
```

with status:

```text
410 Gone
```

For easier testing, we’ll allow very tiny TTL values like `0.001` days.

Open:

```powershell
notepad src\routes.js
```

Find this function:

```js
function getExpiryDate(ttlDays) {
  const days = ttlDays || 30;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}
```

Replace it with:

```js
function getExpiryDate(ttlDays) {
  const days = ttlDays === undefined ? 30 : Number(ttlDays);

  if (!Number.isFinite(days) || days <= 0) {
    return null;
  }

  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

function isExpired(expiresAt) {
  return new Date(expiresAt).getTime() <= Date.now();
}
```

Now inside `POST /shorten`, find:

```js
const expiresAt = getExpiryDate(ttlDays);
```

Immediately under it, add:

```js
if (!expiresAt) {
  return res.status(400).json({ error: "ttlDays must be a positive number" });
}
```

Now inside `GET /:code`, replace the whole redirect route with this:

```js
router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const cachedData = await redis.get(`url:${code}`);

    if (cachedData) {
      console.log("CACHE HIT");

      const parsedData = JSON.parse(cachedData);

      if (isExpired(parsedData.expiresAt)) {
        await redis.del(`url:${code}`);
        return res.status(410).json({ error: "short url expired" });
      }

      await Url.updateOne({ shortCode: code }, { $inc: { clicks: 1 } });
      return res.redirect(parsedData.originalUrl);
    }

    console.log("CACHE MISS");

    const urlData = await Url.findOne({ shortCode: code });

    if (!urlData) {
      return res.status(404).json({ error: "short url not found" });
    }

    if (isExpired(urlData.expiresAt)) {
      await redis.del(`url:${code}`);
      return res.status(410).json({ error: "short url expired" });
    }

    await redis.set(
      `url:${urlData.shortCode}`,
      JSON.stringify({
        originalUrl: urlData.originalUrl,
        expiresAt: urlData.expiresAt,
      }),
      "EX",
      24 * 60 * 60,
    );

    await Url.updateOne({ shortCode: code }, { $inc: { clicks: 1 } });

    return res.redirect(urlData.originalUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});
```

Important: because we now cache JSON instead of just the URL, also update the Redis set inside `POST /shorten`.

Find this:

```js
await redis.set(
  `url:${newUrl.shortCode}`,
  newUrl.originalUrl,
  "EX",
  24 * 60 * 60,
);
```

Replace it with:

```js
await redis.set(
  `url:${newUrl.shortCode}`,
  JSON.stringify({
    originalUrl: newUrl.originalUrl,
    expiresAt: newUrl.expiresAt,
  }),
  "EX",
  24 * 60 * 60,
);
```

Now test expiry:

Create a very short-lived URL:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\",\"ttlDays\":0.00001}"
```

This expires in less than 1 second.

Copy the code, wait 2 seconds, then:

```powershell
curl -i http://localhost:3000/YOUR_CODE
```

Expected:

```text
HTTP/1.1 410 Gone
```

and body:

```json
{ "error": "short url expired" }
```

Stop here and tell me `done` or paste the error.

> done

Excellent. Phase 2 is very close now.

One small improvement before we call it complete:

Right now Redis cache always uses:

```js
("EX", 24 * 60 * 60);
```

That means Redis keeps the key for 24 hours, even if the URL expires sooner. We already check expiry in code, so it works, but better design is:

> Redis key should expire when the URL expires.

**Milestone 16: Make Redis TTL Match URL Expiry**

Goal: when saving to Redis, TTL should be the smaller of:

- 24 hours
- time left until `expiresAt`

Open:

```powershell
notepad src\routes.js
```

Near your helper functions, under `isExpired`, add this:

```js
function getRedisTtlSeconds(expiresAt) {
  const secondsUntilExpiry = Math.floor(
    (new Date(expiresAt).getTime() - Date.now()) / 1000,
  );

  return Math.min(24 * 60 * 60, secondsUntilExpiry);
}
```

Now inside `POST /shorten`, before `await redis.set(...)`, add:

```js
const redisTtlSeconds = getRedisTtlSeconds(newUrl.expiresAt);
```

Then change the Redis set from:

```js
await redis.set(
  `url:${newUrl.shortCode}`,
  JSON.stringify({
    originalUrl: newUrl.originalUrl,
    expiresAt: newUrl.expiresAt,
  }),
  "EX",
  24 * 60 * 60,
);
```

to:

```js
await redis.set(
  `url:${newUrl.shortCode}`,
  JSON.stringify({
    originalUrl: newUrl.originalUrl,
    expiresAt: newUrl.expiresAt,
  }),
  "EX",
  redisTtlSeconds,
);
```

Now inside the `CACHE MISS` section, before `await redis.set(...)`, add:

```js
const redisTtlSeconds = getRedisTtlSeconds(urlData.expiresAt);
```

Then change that Redis set from:

```js
await redis.set(
  `url:${urlData.shortCode}`,
  JSON.stringify({
    originalUrl: urlData.originalUrl,
    expiresAt: urlData.expiresAt,
  }),
  "EX",
  24 * 60 * 60,
);
```

to:

```js
await redis.set(
  `url:${urlData.shortCode}`,
  JSON.stringify({
    originalUrl: urlData.originalUrl,
    expiresAt: urlData.expiresAt,
  }),
  "EX",
  redisTtlSeconds,
);
```

Now test normal link:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\",\"ttlDays\":30}"
```

It should still work.

Then test short expiry again:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\",\"ttlDays\":0.00001}"
```

Wait 2 seconds, then:

```powershell
curl -i http://localhost:3000/YOUR_CODE
```

Expected either:

```text
410 Gone
```

or, if MongoDB TTL already deleted it:

```text
404 Not Found
```

Both are okay for this test.

Stop here and tell me `done` or paste the error.

> C:\Users\Admin>curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\",\"ttlDays\":0.00001}"
> {"error":"something went wrong"}

<details><summary>1 previous message</summary>

> We’ve got a classic Redis TTL edge case: that tiny expiry can round down to `0` seconds, and Redis rejects `EX 0`. I’ll help you patch the helper so it only writes to Redis when the TTL is valid.

</details>

That error is probably because this value became `0`:

```js
redisTtlSeconds;
```

Redis does **not** allow:

```js
EX 0
```

So for super tiny TTLs like `0.00001`, our Redis TTL rounds down to zero and Redis throws an error.

Fix it like this.

Open:

```powershell
notepad src\routes.js
```

Find this function:

```js
function getRedisTtlSeconds(expiresAt) {
  const secondsUntilExpiry = Math.floor(
    (new Date(expiresAt).getTime() - Date.now()) / 1000,
  );

  return Math.min(24 * 60 * 60, secondsUntilExpiry);
}
```

Replace it with:

```js
function getRedisTtlSeconds(expiresAt) {
  const secondsUntilExpiry = Math.ceil(
    (new Date(expiresAt).getTime() - Date.now()) / 1000,
  );

  return Math.min(24 * 60 * 60, secondsUntilExpiry);
}
```

Now in **both places** where you do:

```js
await redis.set(
  `url:${newUrl.shortCode}`,
  JSON.stringify({
    originalUrl: newUrl.originalUrl,
    expiresAt: newUrl.expiresAt,
  }),
  "EX",
  redisTtlSeconds,
);
```

wrap it like this:

```js
if (redisTtlSeconds > 0) {
  await redis.set(
    `url:${newUrl.shortCode}`,
    JSON.stringify({
      originalUrl: newUrl.originalUrl,
      expiresAt: newUrl.expiresAt,
    }),
    "EX",
    redisTtlSeconds,
  );
}
```

And in the cache miss section, wrap the `urlData` Redis set like this:

```js
if (redisTtlSeconds > 0) {
  await redis.set(
    `url:${urlData.shortCode}`,
    JSON.stringify({
      originalUrl: urlData.originalUrl,
      expiresAt: urlData.expiresAt,
    }),
    "EX",
    redisTtlSeconds,
  );
}
```

Then restart if needed and test again:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\",\"ttlDays\":0.00001}"
```

This time it should create the short URL.

Then wait 2 seconds:

```powershell
curl -i http://localhost:3000/YOUR_CODE
```

Expected:

```text
410 Gone
```

or possibly:

```text
404 Not Found
```

Tell me what happens.

> C:\Users\Admin>curl -i http://localhost:3000/i
> HTTP/1.1 410 Gone
> X-Powered-By: Express
> Content-Type: application/json; charset=utf-8
> Content-Length: 29
> ETag: W/"1d-hrr+9lf+7YcyDizxlpaOuDWiN0Q"
> Date: Fri, 12 Jun 2026 18:24:14 GMT
> Connection: keep-alive
> Keep-Alive: timeout=5
>
> {"error":"short url expired"}
> C:\Users\Admin>

Perfect. That is exactly what we wanted.

Milestone 16 complete.

You now have:

- Redis cache-aside redirects
- `CACHE HIT` / `CACHE MISS` behavior
- `expiresAt` stored in MongoDB
- MongoDB TTL index
- API expiry check
- `410 Gone` for expired links
- Redis keys expiring based on URL expiry

That means **Phase 2 is complete**.

Project percentage now:

- Phase 1: **100%**
- Phase 2: **100%**
- Phase 3: **0%**
- Phase 4: **10-15%**

Overall: around **60% done**.

Resume claim you have now earned, but should study before adding:

> Added Redis cache-aside layer for redirects with TTL-based expiry and `410 Gone` handling for expired links.

Before moving to Phase 3 later, I recommend you commit this:

```powershell
git add .
git commit -m "Complete phase 2 Redis caching and expiry"
git push
```

But first make sure `.env` is ignored:

```powershell
git status
```

If `.env` appears in files to be committed, stop. Otherwise commit.

> C:\Users\Admin\Documents\URL shortner\practice>git status
> On branch main
> Your branch is up to date with 'origin/main'.
>
> Untracked files:
> (use "git add <file>..." to include in what will be committed)
> ../.env.example
> ../.gitignore
> ../ARCHITECTURE.md
> ../README.md
> ../docker-compose.yml
> ../package-lock.json
> ../package.json
> ../src/
> ../test/
>
> nothing added to commit but untracked files present (use "git add" to track)

Good: `.env` is not showing. So your secret/local config is safe.

Those `../` files are from the parent folder, the earlier scaffold/reference project. Ignore them for now.

But one thing: your `git status` is not showing Phase 2 modified files. That means either:

- Phase 2 changes are already committed somehow, or
- Git is not detecting the files you edited, or
- You are in a slightly confusing repo/folder setup.

Run this from inside `practice`:

```powershell
git status --short -- .
```

This checks only the current `practice` project.

If it shows modified files like:

```text
 M docker-compose.yml
 M package.json
 M package-lock.json
 M src/routes.js
 M src/models/Url.js
 M src/server.js
?? src/redis.js
```

then commit with:

```powershell
git add docker-compose.yml package.json package-lock.json src/routes.js src/models/Url.js src/server.js src/redis.js
git commit -m "Complete phase 2 Redis caching and expiry"
git push
```

Do **not** use `git add .` right now because Git is seeing those parent-folder files too.

If `git status --short -- .` shows nothing, paste that output here. That means we need to check where your Phase 2 files are being tracked.

> C:\Users\Admin\Documents\URL shortner\practice>git status --short -- .

<details><summary>1 previous message</summary>

> That empty output means Git sees no uncommitted changes inside `practice`. I’m going to help you confirm whether Phase 2 is already committed/tracked or whether the repo root setup is confusing Git a bit.

</details>

You’re good. Phase 2 is already committed.

Your latest commits show:

```text
ec02e03 Complete phase 2 Redis caching and expiry
93d2abd Complete phase 1 core URL shortener
```

So nothing appears in `git status --short -- .` because there are no uncommitted changes inside `practice`.

One important thing I noticed: your Git repo root is actually:

```text
C:\Users\Admin\Documents\URL shortner
```

not:

```text
C:\Users\Admin\Documents\URL shortner\practice
```

That’s why Git keeps showing those `../README.md`, `../src/`, etc. files when you run status from `practice`. They are untracked files in the parent folder from the earlier reference project.

For now, ignore them. Your actual tracked project files are committed, and Phase 2 is safely in Git.

Current status: **Phase 1 + Phase 2 complete and committed.**

> For now, ignore them. Your actual tracked project files are committed, and Phase 2 is safely in Git.
> why.. i dont want them

<details><summary>3 previous messages</summary>

> You’re right to clean them up. Those parent-folder files are the reference scaffold I made before we switched to the mentor-built `practice` version, and if you don’t want them around, we should remove only those untracked parent files and leave your real committed project untouched.
>
> I removed the untracked parent reference files and left your `practice` project plus `.git` alone. I’m checking Git now so we can make sure the workspace is clean and there aren’t any surprise leftovers.
>
> There’s one leftover: `../node_modules` in the parent folder from the earlier scaffold. That’s not part of your real project either, so I’m removing that too; your actual `practice/node_modules` stays in place.

</details>

Cleaned it up.

The parent-folder reference scaffold is gone, including the extra parent `node_modules`. Your real project remains in:

```text
C:\Users\Admin\Documents\URL shortner\practice
```

And Git is now clean: no stray `../` files showing anymore.

So your repo now contains only the project you actually built step by step.

> okay lets do phase 3

<details><summary>1 previous message</summary>

> Great, Phase 3 is where the project starts getting that “I understand backend reliability” texture. I’ll first check the current practice project so I give you the next milestone against the code you actually have.

</details>

Perfect. We’ll do Phase 3 in mentor mode, one milestone at a time.

Phase 3 goal:

> Protect `POST /shorten` with a Redis token bucket rate limiter, then stress test the redirect endpoint and record numbers.

Important: rate limiting applies only to:

```text
POST /shorten
```

Not redirect. We do **not** rate limit `GET /:code`, because that would defeat the point of a shortener.

**Milestone 17: Create Token Bucket Middleware**

Create folder:

```powershell
mkdir src\middleware
```

Create file:

```powershell
notepad src\middleware\rateLimiter.js
```

Paste this:

```js
const redis = require("../redis");

function tokenBucketRateLimiter(options = {}) {
  const capacity = options.capacity || 20;
  const refillRate = options.refillRate || 1;

  return async function rateLimiter(req, res, next) {
    try {
      const ip = req.ip || req.socket.remoteAddress;
      const key = `rate_limit:${ip}`;
      const now = Date.now();

      const bucket = await redis.hgetall(key);

      const tokens =
        bucket.tokens === undefined ? capacity : Number(bucket.tokens);
      const lastRefill =
        bucket.lastRefill === undefined ? now : Number(bucket.lastRefill);

      const secondsPassed = (now - lastRefill) / 1000;
      const tokensToAdd = secondsPassed * refillRate;
      const currentTokens = Math.min(capacity, tokens + tokensToAdd);

      if (currentTokens < 1) {
        const retryAfterSeconds = Math.ceil((1 - currentTokens) / refillRate);

        await redis.hset(key, {
          tokens: currentTokens,
          lastRefill: now,
        });

        await redis.expire(key, capacity * 2);

        res.set("Retry-After", String(retryAfterSeconds));

        return res.status(429).json({
          error: "rate limit exceeded",
          retryAfterSeconds: retryAfterSeconds,
        });
      }

      await redis.hset(key, {
        tokens: currentTokens - 1,
        lastRefill: now,
      });

      await redis.expire(key, capacity * 2);

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "rate limiter failed" });
    }
  };
}

module.exports = tokenBucketRateLimiter;
```

Now open:

```powershell
notepad src\routes.js
```

At the top, add this line with the other `require`s:

```js
const tokenBucketRateLimiter = require("./middleware/rateLimiter");
```

Find this:

```js
router.post("/shorten", async (req, res) => {
```

Replace it with:

```js
router.post("/shorten", tokenBucketRateLimiter(), async (req, res) => {
```

Now test normally:

```powershell
npm run dev
```

Then in another terminal:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

Expected: it should still create a short URL.

Stop here and tell me `done` or paste the error.

> C:\Users\Admin\Documents\URL shortner\practice>npm run dev
>
> > URL-shortener-backned@1.0.0 dev
> > nodemon src/server.js
>
> [nodemon] 3.1.14
> [nodemon] to restart at any time, enter `rs`
> [nodemon] watching path(s): _._
> [nodemon] watching extensions: js,mjs,cjs,json
> [nodemon] starting `node src/server.js`
> ◇ injected env (3) from .env // tip: ◈ encrypted .env [www.dotenvx.com]
> node:internal/modules/cjs/loader:1386
> throw err;
> ^
>
> Error: Cannot find module 'mongoose'
> Require stack:
>
> - C:\Users\Admin\Documents\URL shortner\practice\src\models\Url.js
> - C:\Users\Admin\Documents\URL shortner\practice\src\routes.js
> - C:\Users\Admin\Documents\URL shortner\practice\src\app.js
> - C:\Users\Admin\Documents\URL shortner\practice\src\server.js
>   at Function.\_resolveFilename (node:internal/modules/cjs/loader:1383:15)
>   at defaultResolveImpl (node:internal/modules/cjs/loader:1025:19)
>   at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1030:22)
>   at Function.\_load (node:internal/modules/cjs/loader:1192:37)
>   at TracingChannel.traceSync (node:diagnostics_channel:322:14)
>   at wrapModuleLoad (node:internal/modules/cjs/loader:237:24)
>   at Module.require (node:internal/modules/cjs/loader:1463:12)
>   at require (node:internal/modules/helpers:147:16)
>   at Object.<anonymous> (C:\Users\Admin\Documents\URL shortner\practice\src\models\Url.js:1:18)
>   at Module.\_compile (node:internal/modules/cjs/loader:1706:14) {
>   code: 'MODULE_NOT_FOUND',
>   requireStack: [
>   > 'C:\\Users\\Admin\\Documents\\URL shortner\\practice\\src\\models\\Url.js',
>   > 'C:\\Users\\Admin\\Documents\\URL shortner\\practice\\src\\routes.js',
>   > 'C:\\Users\\Admin\\Documents\\URL shortner\\practice\\src\\app.js',
>   > 'C:\\Users\\Admin\\Documents\\URL shortner\\practice\\src\\server.js'
>   > ]
>   }
>
> Node.js v22.20.0
> [nodemon] app crashed - waiting for file changes before starting...

<details><summary>1 previous message</summary>

> That error is not from the rate limiter code. It means Node looked inside your installed packages and couldn’t find `mongoose`, so the dependency install is out of sync with the code. I’ll quickly check your `package.json` so we fix the right thing instead of guessing.

</details>

Found it. Your `package.json` does **not** have `mongoose` anymore:

```json
"dependencies": {
  "dotenv": "...",
  "express": "...",
  "ioredis": "..."
}
```

So install it again from inside `practice`:

```powershell
cd "C:\Users\Admin\Documents\URL shortner\practice"
npm install mongoose
```

Then run:

```powershell
npm run dev
```

Expected:

```text
Redis connected
MongoDB connected
Server running on http://localhost:3000
```

Also tiny note: your package name has a typo:

```json
"name": "URL-shortener-backned"
```

Later we should fix it to:

```json
"name": "url-shortener-backend"
```

But first get the server running. After `npm install mongoose`, test the same `POST /shorten` command again and tell me what happens.

> done

Good. Milestone 17 complete: the rate limiter middleware is added and normal shortening still works.

Now we test that the limiter actually blocks spam.

**Milestone 18: Test Rate Limit**

Goal: send more than 20 `POST /shorten` requests quickly and confirm some get blocked with:

```text
429 Too Many Requests
```

In a second terminal, run this PowerShell loop:

```powershell
1..25 | ForEach-Object {
  curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
}
```

Expected:

- First bunch should create short URLs
- After the bucket runs out, you should see:

```json
{ "error": "rate limit exceeded", "retryAfterSeconds": 1 }
```

If you see at least one `rate limit exceeded`, the limiter works.

After testing, wait a few seconds and try one normal request again:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

It should work again because the bucket refills.

Stop here and tell me `done` or paste the output/error.

> C:\Users\Admin>1..25 | ForEach-Object { curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}" }
> '1..25' is not recognized as an internal or external command,
> operable program or batch file.

You’re in **Command Prompt**, not PowerShell.

This prompt:

```text
C:\Users\Admin>
```

can be either, but the error style shows it’s Command Prompt.

Use this Command Prompt version instead:

```cmd
for /L %i in (1,1,25) do curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

If you open **PowerShell**, then the previous version works:

```powershell
1..25 | ForEach-Object {
  curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
}
```

Run the Command Prompt version now. You should eventually see:

```json
{ "error": "rate limit exceeded", "retryAfterSeconds": 1 }
```

> done

Nice. Milestone 18 complete.

You now have a working Redis token bucket rate limiter on:

```text
POST /shorten
```

So Phase 3 part 1 is done.

Now we do the stress test part.

**Milestone 19: Install Autocannon**

Goal: install a benchmarking tool so we can measure redirect speed.

From inside your project:

```powershell
cd "C:\Users\Admin\Documents\URL shortner\practice"
npm install --save-dev autocannon
```

Now create one short URL if you don’t already have a good one:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

Copy the returned `shortCode`.

Then run a quick redirect benchmark:

```powershell
npx autocannon -c 20 -d 5 http://localhost:3000/YOUR_CODE
```

Replace `YOUR_CODE` with your real code.

Expected output will include numbers like:

```text
Latency
Req/Sec
Bytes/Sec
```

Stop here and paste the autocannon output, or say `done` if it worked.

> done

Good. Milestone 19 complete.

Now we need meaningful benchmark numbers: **cold vs warm Redis**.

Cold means Redis does **not** have the short URL cached.

Warm means Redis **does** have the short URL cached.

**Milestone 20: Record Cold And Warm Redirect Numbers**

Step 1: Pick one code that exists.

Example:

```text
http://localhost:3000/YOUR_CODE
```

Step 2: Clear Redis cache:

```powershell
docker exec -it practice-redis-1 redis-cli FLUSHALL
```

If that container name fails, run:

```powershell
docker compose ps
```

and use the Redis container name.

Step 3: Run cold test:

```powershell
npx autocannon -c 50 -d 10 http://localhost:3000/YOUR_CODE
```

Copy these numbers from output:

```text
Latency p99
Req/Sec avg
```

Step 4: Run warm test immediately after:

```powershell
npx autocannon -c 50 -d 10 http://localhost:3000/YOUR_CODE
```

Again copy:

```text
Latency p99
Req/Sec avg
```

Warm should usually be better because Redis now has the URL cached.

Write the numbers somewhere like:

```text
Cold Redis:
p99 latency: ___ ms
avg req/sec: ___

Warm Redis:
p99 latency: ___ ms
avg req/sec: ___
```

Paste those numbers here when done.

> done

Nice. Phase 3 is basically complete now.

But I need the actual numbers from your autocannon output so we can use them later in README/resume.

Please paste just this:

```text
Cold Redis:
p99 latency: ___ ms
avg req/sec: ___

Warm Redis:
p99 latency: ___ ms
avg req/sec: ___
```

If you didn’t copy them, no problem. Run these two again:

```powershell
docker exec -it practice-redis-1 redis-cli FLUSHALL
npx autocannon -c 50 -d 10 http://localhost:3000/YOUR_CODE
npx autocannon -c 50 -d 10 http://localhost:3000/YOUR_CODE
```

Replace `YOUR_CODE`.

From the output, look under:

```text
Latency
```

for `99%`, and under:

```text
Req/Sec
```

for `Avg`.

Paste those four values.

> User context
>
> Images:
>
> - `~/Pictures/Screenshots/Screenshot 2026-06-13 133538.png`
> - `~/Pictures/Screenshots/Screenshot 2026-06-13 133705.png`

Good, I can read the numbers.

But important: both tests show:

```text
0 2xx responses, 14k non 2xx responses
```

That means autocannon was hitting a URL that did **not** successfully redirect as expected, or it counted redirects as non-2xx because redirects are `302`.

For our notes, we can still record latency, but we should phrase it as **redirect endpoint benchmark**, not successful `2xx`.

Your numbers:

```text
Cold Redis:
p99 latency: 61 ms
avg req/sec: 1440.1

Warm Redis:
p99 latency: 58 ms
avg req/sec: 1416.6
```

Warm is slightly lower p99, but avg req/sec is slightly lower too. That can happen locally because your laptop, Docker, MongoDB, Redis, and Node are all sharing resources.

For resume/README, don’t exaggerate. Use:

> Benchmarked redirect endpoint with autocannon at 50 concurrent connections, observing ~58-61 ms p99 latency and ~1.4k req/sec locally.

This is safer than saying “Redis improved performance by X%,” because your numbers do not clearly prove a big improvement.

Phase 3 status:

- Token bucket rate limiter: done
- 429 rate limit test: done
- Autocannon benchmark: done
- Numbers recorded: done

So **Phase 3 is complete**.

Now commit:

```powershell
git status
```

If `.env` is not listed, run:

```powershell
git add package.json package-lock.json src/routes.js src/middleware/rateLimiter.js
git commit -m "Complete phase 3 rate limiting and benchmarks"
git push
```

Current project completion: around **80%**.

Remaining: **Phase 4 deploy + docs + README + architecture explanation**.

> okayy lets do phase 4 now

Good. Phase 4 starts now.

Phase 4 has 3 parts:

1. **Clean project for GitHub**
2. **Write README + architecture doc**
3. **Deploy live**

We’ll do docs first, because they help you explain the project.

**Milestone 21: Add A Professional README**

Goal: when an interviewer opens your GitHub repo, they should immediately understand what the project does.

Create README:

```powershell
cd "C:\Users\Admin\Documents\URL shortner\practice"
notepad README.md
```

Paste this:

````md
# URL Shortener Backend

A backend URL shortener built with Node.js, Express, MongoDB, and Redis.

The service creates short URLs, redirects users to the original URL, tracks click counts, caches hot redirects in Redis, supports link expiry, and protects URL creation with a Redis token bucket rate limiter.

## Features

- Create short URLs using `POST /shorten`
- Redirect short URLs using `GET /:code`
- Track total clicks for each short URL
- View link stats using `GET /:code/stats`
- Store URL data in MongoDB
- Use Redis cache-aside pattern for faster redirects
- Expire links using `expiresAt`
- Return `410 Gone` for expired links
- Rate limit URL creation using a Redis token bucket
- Benchmark redirect performance using autocannon

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- ioredis
- Docker
- autocannon

## Local Setup

Clone the repository:

```bash
git clone YOUR_REPO_URL
cd URL-shortener-backend
```
````

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
REDIS_URL=redis://localhost:6379
```

Start MongoDB and Redis:

```bash
docker compose up -d
```

Start the server:

```bash
npm run dev
```

Health check:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

## API Endpoints

### Create Short URL

```http
POST /shorten
```

Request body:

```json
{
  "url": "https://example.com",
  "ttlDays": 30
}
```

Response:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:3000/abc123",
  "expiresAt": "2026-07-13T10:00:00.000Z"
}
```

### Redirect Short URL

```http
GET /:code
```

Returns a `302` redirect to the original URL.

Possible errors:

```json
{
  "error": "short url not found"
}
```

```json
{
  "error": "short url expired"
}
```

### Get Stats

```http
GET /:code/stats
```

Response:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "clicks": 5,
  "createdAt": "2026-06-13T10:00:00.000Z",
  "expiresAt": "2026-07-13T10:00:00.000Z"
}
```

## Caching Strategy

The redirect endpoint uses a cache-aside pattern.

When a user visits a short URL:

1. The server checks Redis for `url:{code}`.
2. If found, it redirects immediately and updates clicks in MongoDB.
3. If not found, it fetches the URL from MongoDB.
4. Then it stores the result in Redis with a TTL.
5. Finally, it redirects the user.

## Rate Limiting

`POST /shorten` is protected using a Redis token bucket rate limiter.

Default behavior:

- Bucket capacity: 20 tokens
- Refill rate: 1 token per second
- If no tokens are available, the API returns `429 Too Many Requests`

## Benchmark

Redirect endpoint benchmarked locally using autocannon:

```bash
npx autocannon -c 50 -d 10 http://localhost:3000/YOUR_CODE
```

Recorded local result:

```text
Cold Redis:
p99 latency: 61 ms
avg req/sec: 1440.1

Warm Redis:
p99 latency: 58 ms
avg req/sec: 1416.6
```

Note: local benchmark results depend on machine resources and Docker performance.

## What I Learned

- How Express handles API routes and middleware
- How MongoDB stores URL metadata
- How Mongoose models define database structure
- How Redis can reduce database reads on hot redirect paths
- How TTL expiry works for short links
- How token bucket rate limiting smooths request bursts
- How to benchmark backend endpoints using autocannon

````

Important: replace this line:

```md
git clone YOUR_REPO_URL
````

with your actual GitHub repo URL.

Then tell me `done`. After that we’ll add `ARCHITECTURE.md`.

> okay is this eveyrhting that i you copy paste

Yes, for **Milestone 21**, copy-paste that whole README.

That’s okay because this is documentation, not core logic. Later, we’ll edit it into **your voice** after you understand the project better.

But do change this part:

```md
git clone YOUR_REPO_URL
```

to your actual repo URL, something like:

```md
git clone https://github.com/YOUR_USERNAME/URL-shortener-backend.git
```

Also check the folder name after clone. If your repo is named:

```text
URL-shortener-backend
```

then keep:

```md
cd URL-shortener-backend
```

If it is spelled differently on GitHub, match that exactly.

So yes:

1. Open:

   ```powershell
   notepad README.md
   ```

2. Paste the README.

3. Replace `YOUR_REPO_URL`.

4. Save.

5. Tell me `done`.

> Install dependencies:
> npm install
> Create a .env file:
> PORT=3000
> MONGO_URI=mongodb://localhost:27017/url_shortener_practice
> REDIS_URL=redis://localhost:6379
> Start MongoDB and Redis:
>
> should this also go into the readme
> docker compose up -d
> Start the server:
> npm run dev
> Health check:
> curl http://localhost:3000/health
> Expected response:
> {
> "status": "ok"
> }
> API Endpoints
> Create Short URL
> POST /shorten
> Request body:
> {
> "url": "https://example.com",
> "ttlDays": 30
> }
> Response:
> {
> "originalUrl": "https://example.com",
> "shortCode": "abc123",
> "shortUrl": "http://localhost:3000/abc123",
> "expiresAt": "2026-07-13T10:00:00.000Z"
> }
> Redirect Short URL
> GET /:code
> Returns a 302 redirect to the original URL.
> Possible errors:
> {
> "error": "short url not found"
> }
> {
> "error": "short url expired"
> }
> Get Stats
> GET /:code/stats
> Response:
> {
> "originalUrl": "https://example.com",
> "shortCode": "abc123",
> "clicks": 5,
> "createdAt": "2026-06-13T10:00:00.000Z",
> "expiresAt": "2026-07-13T10:00:00.000Z"
> }
> Caching Strategy
> The redirect endpoint uses a cache-aside pattern.
> When a user visits a short URL:
> The server checks Redis for url:{code}.
> If found, it redirects immediately and updates clicks in MongoDB.
> If not found, it fetches the URL from MongoDB.
> Then it stores the result in Redis with a TTL.
> Finally, it redirects the user.
> Rate Limiting
> POST /shorten is protected using a Redis token bucket rate limiter.
> Default behavior:
> Bucket capacity: 20 tokens
> Refill rate: 1 token per second
> If no tokens are available, the API returns 429 Too Many Requests
> Benchmark
> Redirect endpoint benchmarked locally using autocannon:
> npx autocannon -c 50 -d 10 http://localhost:3000/YOUR_CODE
> Recorded local result:
> Cold Redis:
> p99 latency: 61 ms
> avg req/sec: 1440.1
>
> Warm Redis:
> p99 latency: 58 ms
> avg req/sec: 1416.6
> Note: local benchmark results depend on machine resources and Docker performance.
> What I Learned
> How Express handles API routes and middleware
> How MongoDB stores URL metadata
> How Mongoose models define database structure
> How Redis can reduce database reads on hot redirect paths
> How TTL expiry works for short links
> How token bucket rate limiting smooths request bursts
> How to benchmark backend endpoints using autocannon
>
> Important: replace this line:
>
> ```md
> git clone YOUR_REPO_URL
> with your actual GitHub repo URL.
> Then tell me done. After that we’ll add ARCHITECTURE.md.
> ```

Yes, **all of that should go into the README**.

The README should include:

- How to install
- How to create `.env`
- How to start MongoDB + Redis
- How to start the server
- How to test health
- API endpoints
- Caching explanation
- Rate limiting explanation
- Benchmark numbers
- What you learned

That is exactly what makes it look professional.

Two important things:

1. Do **not** include your real `.env` file in GitHub.
   But it is okay to show an example in README:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
REDIS_URL=redis://localhost:6379
```

2. Keep markdown formatting.
   Use headings like:

```md
## Local Setup

## API Endpoints

## Caching Strategy
```

and code blocks like:

````md
```bash
npm install
```
````

So yes: paste the full README content I gave you, replace `YOUR_REPO_URL`, save it, then tell me `done`.

> wait what exactly should go in readme give properly and exactly

Absolutely. Put **exactly this** in `README.md`.

Open:

```powershell
notepad README.md
```

Paste this whole thing, then replace only:

```text
YOUR_GITHUB_USERNAME
```

with your GitHub username.

````md
# URL Shortener Backend

A backend URL shortener built with Node.js, Express, MongoDB, and Redis.

The service creates short URLs, redirects users to the original URL, tracks click counts, caches redirect data in Redis, supports link expiry, and protects URL creation with a Redis token bucket rate limiter.

## Features

- Create short URLs using `POST /shorten`
- Redirect short URLs using `GET /:code`
- Track total clicks for each short URL
- View link stats using `GET /:code/stats`
- Store URL data in MongoDB
- Use Redis cache-aside pattern for redirects
- Expire links using `expiresAt`
- Return `410 Gone` for expired links
- Rate limit URL creation using a Redis token bucket
- Benchmark redirect performance using autocannon

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- ioredis
- Docker
- autocannon

## Local Setup

Clone the repository:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/URL-shortener-backend.git
cd URL-shortener-backend
```
````

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
REDIS_URL=redis://localhost:6379
```

Start MongoDB and Redis:

```bash
docker compose up -d
```

Start the server:

```bash
npm run dev
```

Health check:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

## API Endpoints

### Create Short URL

```http
POST /shorten
```

Request body:

```json
{
  "url": "https://example.com",
  "ttlDays": 30
}
```

Response:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:3000/abc123",
  "expiresAt": "2026-07-13T10:00:00.000Z"
}
```

### Redirect Short URL

```http
GET /:code
```

Returns a `302` redirect to the original URL.

Possible errors:

```json
{
  "error": "short url not found"
}
```

```json
{
  "error": "short url expired"
}
```

### Get Stats

```http
GET /:code/stats
```

Response:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "clicks": 5,
  "createdAt": "2026-06-13T10:00:00.000Z",
  "expiresAt": "2026-07-13T10:00:00.000Z"
}
```

## Caching Strategy

The redirect endpoint uses a cache-aside pattern.

When a user visits a short URL:

1. The server checks Redis for `url:{code}`.
2. If found, it redirects immediately and updates clicks in MongoDB.
3. If not found, it fetches the URL from MongoDB.
4. Then it stores the result in Redis with a TTL.
5. Finally, it redirects the user.

## Rate Limiting

`POST /shorten` is protected using a Redis token bucket rate limiter.

Default behavior:

- Bucket capacity: 20 tokens
- Refill rate: 1 token per second
- If no tokens are available, the API returns `429 Too Many Requests`

## Benchmark

Redirect endpoint benchmarked locally using autocannon:

```bash
npx autocannon -c 50 -d 10 http://localhost:3000/YOUR_CODE
```

Recorded local result:

```text
Cold Redis:
p99 latency: 61 ms
avg req/sec: 1440.1

Warm Redis:
p99 latency: 58 ms
avg req/sec: 1416.6
```

Note: local benchmark results depend on machine resources and Docker performance.

## What I Learned

- How Express handles API routes and middleware
- How MongoDB stores URL metadata
- How Mongoose models define database structure
- How Redis can reduce database reads on redirect paths
- How TTL expiry works for short links
- How token bucket rate limiting smooths request bursts
- How to benchmark backend endpoints using autocannon

````

After saving, tell me `done`.

> # URL Shortener Backend
>
> A backend URL shortener built with Node.js, Express, MongoDB, and Redis.
>
> The service creates short URLs, redirects users to the original URL, tracks click counts, caches redirect data in Redis, supports link expiry, and protects URL creation with a Redis token bucket rate limiter.
>
> ## Features
>
> - Create short URLs using `POST /shorten`
> - Redirect short URLs using `GET /:code`
> - Track total clicks for each short URL
> - View link stats using `GET /:code/stats`
> - Store URL data in MongoDB
> - Use Redis cache-aside pattern for redirects
> - Expire links using `expiresAt`
> - Return `410 Gone` for expired links
> - Rate limit URL creation using a Redis token bucket
> - Benchmark redirect performance using autocannon
>
> ## Tech Stack
>
> - Node.js
> - Express.js
> - MongoDB
> - Mongoose
> - Redis
> - ioredis
> - Docker
> - autocannon
>
> ## Local Setup
>
> Clone the repository:
>
> ```bash
> git clone https://github.com/YOUR_GITHUB_USERNAME/URL-shortener-backend.git
> cd URL-shortener-backend
>
> so only this much is going in readme
> all teh content after that i am supposed to execute

No no, the **whole thing** goes in README.

You are **not executing** the commands right now.

In a README, commands are written as instructions for someone else who later wants to run your project.

So this part:

```md
Install dependencies:

```bash
npm install
````

````

means the README will **show** the command `npm install`. You are not supposed to run it while writing the README.

Your README should contain everything from:

```md
# URL Shortener Backend
````

all the way down to:

```md
- How to benchmark backend endpoints using autocannon
```

The commands stay inside markdown code blocks.

You stopped here:

```md
cd URL-shortener-backend
```

Keep pasting the rest of the README after that.

Also replace:

```md
YOUR_GITHUB_USERNAME
```

with your real GitHub username.

Think of README like a project manual. It includes commands, examples, outputs, and explanations. It is not a script.

> API Endpoints
> Create Short URL
> POST /shorten
> Request body:
> {
> "url": "https://example.com",
> "ttlDays": 30
> }
> Response:
> {
> "originalUrl": "https://example.com",
> "shortCode": "abc123",
> "shortUrl": "http://localhost:3000/abc123",
> "expiresAt": "2026-07-13T10:00:00.000Z"
> }
> Redirect Short URL
> GET /:code
> Returns a 302 redirect to the original URL.
> Possible errors:
> {
> "error": "short url not found"
> }
> {
> "error": "short url expired"
> }
> Get Stats
> GET /:code/stats
> Response:
> {
> "originalUrl": "https://example.com",
> "shortCode": "abc123",
> "clicks": 5,
> "createdAt": "2026-06-13T10:00:00.000Z",
> "expiresAt": "2026-07-13T10:00:00.000Z"
> }
> Caching Strategy
> The redirect endpoint uses a cache-aside pattern.
> When a user visits a short URL:
> The server checks Redis for url:{code}.
> If found, it redirects immediately and updates clicks in MongoDB.
> If not found, it fetches the URL from MongoDB.
> Then it stores the result in Redis with a TTL.
> Finally, it redirects the user.
> Rate Limiting
> POST /shorten is protected using a Redis token bucket rate limiter.
> Default behavior:
> Bucket capacity: 20 tokens
> Refill rate: 1 token per second
> If no tokens are available, the API returns 429 Too Many Requests
> Benchmark
> Redirect endpoint benchmarked locally using autocannon:
> npx autocannon -c 50 -d 10 http://localhost:3000/YOUR_CODE
> Recorded local result:
> Cold Redis:
> p99 latency: 61 ms
> avg req/sec: 1440.1
>
> Warm Redis:
> p99 latency: 58 ms
> avg req/sec: 1416.6
> Note: local benchmark results depend on machine resources and Docker performance.
> What I Learned
> How Express handles API routes and middleware
> How MongoDB stores URL metadata
> How Mongoose models define database structure
> How Redis can reduce database reads on redirect paths
> How TTL expiry works for short links
> How token bucket rate limiting smooths request bursts
> How to benchmark backend endpoints using autocannon
>
> can you tell me how to format this with #s and bashes
> can you give me the formated doc so i can directly copy paste

Yes. Copy-paste this formatted markdown directly into your README after the setup section, or replace the whole README with it.

````md
# URL Shortener Backend

A backend URL shortener built with Node.js, Express, MongoDB, and Redis.

The service creates short URLs, redirects users to the original URL, tracks click counts, caches redirect data in Redis, supports link expiry, and protects URL creation with a Redis token bucket rate limiter.

## Features

- Create short URLs using `POST /shorten`
- Redirect short URLs using `GET /:code`
- Track total clicks for each short URL
- View link stats using `GET /:code/stats`
- Store URL data in MongoDB
- Use Redis cache-aside pattern for redirects
- Expire links using `expiresAt`
- Return `410 Gone` for expired links
- Rate limit URL creation using a Redis token bucket
- Benchmark redirect performance using autocannon

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- ioredis
- Docker
- autocannon

## Local Setup

Clone the repository:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/URL-shortener-backend.git
cd URL-shortener-backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
REDIS_URL=redis://localhost:6379
```

Start MongoDB and Redis:

```bash
docker compose up -d
```

Start the server:

```bash
npm run dev
```

Health check:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

## API Endpoints

### Create Short URL

```http
POST /shorten
```

Request body:

```json
{
  "url": "https://example.com",
  "ttlDays": 30
}
```

Response:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:3000/abc123",
  "expiresAt": "2026-07-13T10:00:00.000Z"
}
```

### Redirect Short URL

```http
GET /:code
```

Returns a `302` redirect to the original URL.

Possible errors:

```json
{
  "error": "short url not found"
}
```

```json
{
  "error": "short url expired"
}
```

### Get Stats

```http
GET /:code/stats
```

Response:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "clicks": 5,
  "createdAt": "2026-06-13T10:00:00.000Z",
  "expiresAt": "2026-07-13T10:00:00.000Z"
}
```

## Caching Strategy

The redirect endpoint uses a cache-aside pattern.

When a user visits a short URL:

1. The server checks Redis for `url:{code}`.
2. If found, it redirects immediately and updates clicks in MongoDB.
3. If not found, it fetches the URL from MongoDB.
4. Then it stores the result in Redis with a TTL.
5. Finally, it redirects the user.

## Rate Limiting

`POST /shorten` is protected using a Redis token bucket rate limiter.

Default behavior:

- Bucket capacity: 20 tokens
- Refill rate: 1 token per second
- If no tokens are available, the API returns `429 Too Many Requests`

## Benchmark

Redirect endpoint benchmarked locally using autocannon:

```bash
npx autocannon -c 50 -d 10 http://localhost:3000/YOUR_CODE
```

Recorded local result:

```text
Cold Redis:
p99 latency: 61 ms
avg req/sec: 1440.1

Warm Redis:
p99 latency: 58 ms
avg req/sec: 1416.6
```

Note: local benchmark results depend on machine resources and Docker performance.

## What I Learned

- How Express handles API routes and middleware
- How MongoDB stores URL metadata
- How Mongoose models define database structure
- How Redis can reduce database reads on redirect paths
- How TTL expiry works for short links
- How token bucket rate limiting smooths request bursts
- How to benchmark backend endpoints using autocannon
````

Replace only this part:

```md
YOUR_GITHUB_USERNAME
```

with your GitHub username.

> done

Great. README is done.

**Milestone 22: Add Architecture Document**

Goal: create a simple doc that explains how the system works internally.

Create:

```powershell
notepad ARCHITECTURE.md
```

Paste this:

````md
# Architecture

This project is a backend URL shortener built with Node.js, Express, MongoDB, and Redis.

## High-Level Flow

```text
Client
  |
  | POST /shorten
  v
Express API
  |
  | generate base62 short code
  v
MongoDB
  |
  | save originalUrl, shortCode, clicks, expiresAt
  v
Response with shortUrl
```

```text
Client
  |
  | GET /:code
  v
Express API
  |
  | check Redis cache
  v
Redis
  |
  | cache hit
  v
302 redirect to original URL
```

```text
Client
  |
  | GET /:code
  v
Express API
  |
  | check Redis cache
  v
Redis
  |
  | cache miss
  v
MongoDB
  |
  | fetch original URL
  v
Redis
  |
  | store URL data with TTL
  v
302 redirect to original URL
```

## Main Components

### Express

Express handles HTTP routes:

- `POST /shorten`
- `GET /:code`
- `GET /:code/stats`
- `GET /health`

### MongoDB

MongoDB is the main database.

It stores:

- original URL
- short code
- click count
- creation date
- expiry date

### Redis

Redis is used for two things:

1. Caching redirect data
2. Rate limiting URL creation

For redirect caching, Redis stores data using keys like:

```text
url:abc123
```

For rate limiting, Redis stores data using keys like:

```text
rate_limit:127.0.0.1
```

## Why Redis Is Used

Without Redis, every redirect requires a MongoDB read.

```text
GET /:code -> MongoDB -> redirect
```

With Redis, frequently visited short URLs can be served from cache.

```text
GET /:code -> Redis -> redirect
```

MongoDB is still the source of truth. Redis is only a temporary cache.

## Cache-Aside Pattern

The redirect endpoint uses cache-aside.

1. Check Redis first.
2. If the data exists, use it.
3. If not, fetch from MongoDB.
4. Store the MongoDB result in Redis.
5. Redirect the user.

This keeps Redis simple because the app controls what gets cached.

## Expiry Strategy

Each short URL has an `expiresAt` field.

When a redirect request comes in, the server checks whether the link is expired.

If expired, the server returns:

```text
410 Gone
```

MongoDB also has a TTL index on `expiresAt`, so expired documents are eventually removed automatically.

Redis keys also use TTL so cached URL data does not live forever.

## Rate Limiting Strategy

`POST /shorten` uses a token bucket rate limiter.

Each IP gets a bucket with:

- 20 maximum tokens
- 1 token refilled per second

Each request spends 1 token.

If the bucket has no tokens, the server returns:

```text
429 Too Many Requests
```

This protects the URL creation endpoint from spam.

## Why 302 Redirect

The redirect endpoint uses `302 Found`.

A `301` redirect can be cached by browsers permanently. That is not ideal here because the server needs redirect requests to reach the backend so it can track clicks.

A `302` redirect is temporary, so clients are more likely to request the backend again.

## Benchmark Notes

The redirect endpoint was benchmarked locally using autocannon:

```bash
npx autocannon -c 50 -d 10 http://localhost:3000/YOUR_CODE
```

Recorded local result:

```text
Cold Redis:
p99 latency: 61 ms
avg req/sec: 1440.1

Warm Redis:
p99 latency: 58 ms
avg req/sec: 1416.6
```

These numbers are local machine results and can change depending on system load, Docker performance, and network conditions.

## What Could Improve At Higher Scale

- Use Redis Cluster or managed Redis for high availability.
- Batch or asynchronously process click tracking.
- Use read replicas for MongoDB.
- Add custom aliases for short URLs.
- Add user accounts and authentication.
- Add analytics by time, location, or referrer.
- Add stronger validation and abuse protection.
````

Save it.

Then tell me `done`.

> done

Good. Docs are now in place.

**Milestone 23: Add `.env.example`**

Goal: show required environment variables without exposing your real `.env`.

Create:

```powershell
notepad .env.example
```

Paste:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
REDIS_URL=redis://localhost:6379
```

Save it.

Now check Git:

```powershell
git status
```

Make sure `.env` is **not** listed.

Then commit docs:

```powershell
git add README.md ARCHITECTURE.md .env.example
git commit -m "Add project documentation"
git push
```

Stop here and tell me `done` or paste any error.

> wait where is architecture.md .. we didnt write that

We just created it in the previous step, but maybe it didn’t save or it was created in the wrong folder.

Check this first:

```powershell
cd "C:\Users\Admin\Documents\URL shortner\practice"
dir
```

You should see:

```text
ARCHITECTURE.md
README.md
```

If you do **not** see `ARCHITECTURE.md`, create it now:

```powershell
notepad ARCHITECTURE.md
```

Paste the architecture content I gave in Milestone 22, save it, then run:

```powershell
dir
```

If you want, paste your `dir` output here and I’ll confirm.

> okay done pushing

Nice. Phase 4 docs checkpoint is pushed.

Current status:

- Phase 1 core service: done
- Phase 2 Redis + expiry: done
- Phase 3 rate limiting + benchmark: done
- Phase 4 docs: mostly done

Overall project: around **90% complete**.

Remaining Phase 4 work:

1. Deploy live
2. Add live URL to README
3. Verify production:
   - create short URL
   - visit short URL
   - check stats
4. Final resume bullets
5. Study/interview explanation

Important deployment note: Railway’s free/resource model changes over time, so before we deploy, we should check what you want to use:

- **Railway**: easiest for backend + MongoDB/Redis plugins if available
- **Render**: easy backend deploy, but Redis/Mongo usually external
- **MongoDB Atlas + Upstash Redis + Render/Railway**: very common free-ish student path

For your level, I suggest:

**Render + MongoDB Atlas + Upstash Redis**

It avoids needing Docker in production and is easier to explain:

- Render runs Node app
- MongoDB Atlas stores URLs
- Upstash Redis handles cache/rate limit

When you’re ready, say:

> deploy now

and we’ll do it step by step.

> ok lets start

<details><summary>2 previous messages</summary>

> Let’s start deployment, but I’m going to make the app production-ready first so the hosting step doesn’t become mystery pain. I’ll quickly verify the project files and then we’ll add the tiny changes deployment platforms expect.
>
> <details><summary>Searched the web</summary>
>
> <details><summary>Searched the web</summary>
>
> - Searched the web for `Render Node.js web service start command environment variables official docs`
> - Searched the web for `site:render.com/docs deploy node express render start command`
> - Searched the web for `https://render.com/docs/deploy-node-express-app`
> - Searched the web for `Upstash Redis ioredis TLS connection URL docs`
>
> </details>
>
> </details>

</details>

Good. We’ll deploy with this plan:

```text
Render = runs Node/Express app
MongoDB Atlas = production MongoDB
Upstash Redis = production Redis
```

I checked the official docs: Render deploys Node apps from GitHub using a build command and start command, and MongoDB Atlas requires a database user plus network/IP access before your app can connect. Sources: [Render Node deploy docs](https://render.com/docs/deploy-node-express-app), [MongoDB Atlas connection docs](https://www.mongodb.com/docs/atlas/driver-connection/).

Before touching Render, we need one production fix.

Right now your API returns:

```js
shortUrl: `http://localhost:3000/${newUrl.shortCode}`;
```

That is okay locally, but wrong after deployment. On Render it should return your live URL.

**Milestone 24: Add `BASE_URL` For Deployment**

Open:

```powershell
notepad src\routes.js
```

Find this function area near your helpers:

```js
function getRedisTtlSeconds(expiresAt) {
```

Above `router.post`, add this helper:

```js
function getBaseUrl(req) {
  const baseUrl =
    process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
  return baseUrl.replace(/\/$/, "");
}
```

Now find this inside `POST /shorten`:

```js
shortUrl: `http://localhost:3000/${newUrl.shortCode}`,
```

Replace it with:

```js
shortUrl: `${getBaseUrl(req)}/${newUrl.shortCode}`,
```

Now open:

```powershell
notepad src\app.js
```

Add this line after `const app = express();`:

```js
app.set("trust proxy", true);
```

So it should look like:

```js
const app = express();

app.set("trust proxy", true);

app.use(express.json());
```

Now open:

```powershell
notepad .env.example
```

Make it:

```env
PORT=3000
BASE_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
REDIS_URL=redis://localhost:6379
```

Also open your real `.env`:

```powershell
notepad .env
```

Make sure it has:

```env
PORT=3000
BASE_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
REDIS_URL=redis://localhost:6379
```

Now test locally:

```powershell
npm run dev
```

Then:

```powershell
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\"}"
```

Expected `shortUrl`:

```json
"shortUrl":"http://localhost:3000/..."
```

Stop here and tell me `done` or paste the error.

> done

Good. Commit this production-readiness change before we deploy.

Run:

```powershell
git status
```

Make sure `.env` is not listed.

Then:

```powershell
git add src/routes.js src/app.js .env.example
git commit -m "Prepare app for deployment"
git push
```

After that, we’ll create the production database.

**Milestone 25: Create MongoDB Atlas Database**

Do this in browser:

1. Go to [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
2. Sign in or create account
3. Create a free cluster
4. Create database user
   - Username: anything simple
   - Password: generate/copy it somewhere safe
5. Network Access:
   - Add IP Address
   - For easy deployment, choose:
     ```text
     0.0.0.0/0
     ```
   - This allows Render to connect
6. Click **Connect**
7. Choose **Drivers**
8. Copy the connection string

It will look like:

```text
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Modify it so it includes database name:

```text
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/url_shortener?retryWrites=true&w=majority
```

Important:

- Replace `<password>` with your real password
- Do not commit this URL
- This goes only in Render environment variables later

Stop after you have the MongoDB Atlas connection string. Tell me:

```text
Mongo URI ready
```

Do not paste the password here.

> Mongo URI ready

Good. Next we create production Redis.

**Milestone 26: Create Upstash Redis**

Do this in browser:

1. Go to [Upstash Redis](https://upstash.com/)
2. Sign in or create account
3. Create a new Redis database
4. Choose a free/basic region close to you or close to Render’s deploy region
5. After creation, open the database details
6. Find the Redis connection URL

You want the URL that looks like this:

```text
rediss://default:PASSWORD@something.upstash.io:6379
```

Important details:

- Use `rediss://`, not `redis://`, because hosted Redis usually uses TLS.
- Do not paste the password here.
- Do not commit this URL to GitHub.
- This will go into Render as `REDIS_URL`.

When you have it, say:

```text
Redis URL ready
```

Then we’ll deploy the app on Render.

> Redis URL ready

Great. Now deploy on Render.

**Milestone 27: Deploy Express App On Render**

Go to [Render](https://render.com/) and sign in.

Then:

1. Click **New +**
2. Choose **Web Service**
3. Connect your GitHub account if needed
4. Select your repo:
   ```text
   URL-shortener-backend
   ```
5. Configure:

```text
Name: url-shortener-backend
Runtime: Node
Branch: main
Root Directory: leave blank
Build Command: npm install
Start Command: npm start
```

Important: because your code is inside the `practice` folder, Render may need:

```text
Root Directory: practice
```

Use this rule:

- If GitHub repo shows `package.json` at the top level, leave Root Directory blank.
- If GitHub repo shows a folder named `practice`, and `package.json` is inside it, set:
  ```text
  Root Directory: practice
  ```

Now add environment variables in Render:

```text
BASE_URL=https://YOUR_RENDER_APP_URL
MONGO_URI=your MongoDB Atlas URI
REDIS_URL=your Upstash Redis URL
NODE_ENV=production
```

For `BASE_URL`, Render may only give the URL after first deploy. If so, first deploy without `BASE_URL`, then copy the Render URL and add it after.

Click **Deploy Web Service**.

Wait for deploy logs.

Expected successful logs should include:

```text
Redis connected
MongoDB connected
Server running on http://localhost:...
```

After deployment, Render will give you a URL like:

```text
https://url-shortener-backend.onrender.com
```

Test health:

```powershell
curl https://YOUR_RENDER_APP_URL/health
```

Expected:

```json
{ "status": "ok" }
```

Stop here and tell me what happens. If it fails, paste the Render error logs, but hide passwords.

> ==> It looks like we don't have access to your repo, but we'll try to clone it anyway.
> ==> Cloning from https://github.com/Disha1027/URL-shortener-backened
> ==> Checking out commit decd4de2978f2549823115e8a5d22f7e8144d146 in branch main
> ==> Using Node.js version 24.14.1 (default)
> ==> Docs on specifying a Node.js version: https://render.com/docs/node-version
> ==> Running build command 'npm install'...
> added 91 packages, and audited 92 packages in 1s
> 27 packages are looking for funding
> run `npm fund` for details
> found 0 vulnerabilities
> ==> Uploading build...
> ==> Uploaded in 1.3s. Compression took 0.3s
> ==> Build successful 🎉
> ==> Deploying...
> ==> Setting WEB_CONCURRENCY=1 by default, based on available CPUs in the instance
> ==> Running 'npm start'
>
> > URL-shortener-backned@1.0.0 start
> > node src/server.js
> > ◇ injected env (0) from .env // tip: ⌘ suppress logs { quiet: true }
> > node:internal/url:819
>
>       href = bindingUrl.parse(input, base, true);
>                         ^
>
> TypeError: Invalid URL
> at new URL (node:internal/url:819:25)
> at parseURL (/opt/render/project/src/practice/node_modules/ioredis/built/utils/index.js:240:18)
> at EventEmitter.parseOptions (/opt/render/project/src/practice/node_modules/ioredis/built/Redis.js:676:70)
> at new Redis (/opt/render/project/src/practice/node_modules/ioredis/built/Redis.js:53:14)
> at Object.<anonymous> (/opt/render/project/src/practice/src/redis.js:3:15)
> at Module.\_compile (node:internal/modules/cjs/loader:1812:14)
> at Object..js (node:internal/modules/cjs/loader:1943:10)
> at Module.load (node:internal/modules/cjs/loader:1533:32)
> at Module.\_load (node:internal/modules/cjs/loader:1335:12)
> at wrapModuleLoad (node:internal/modules/cjs/loader:255:19) {
> code: 'ERR_INVALID_URL',
> input: 'redis://redis-cli --tls -u rediss://default:gQAAAAAAAZxjAAIgcDJjNGI5NzQyYzMxYjE0ZWIzYmRiOTU3YjdjNmE5YTcyMA@talented-sunbird-105571.upstash.io:6379'
> }
> Node.js v24.14.1
> ==> Exited with status 1
> ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
> ==> Running 'npm start'
>
> > URL-shortener-backned@1.0.0 start
> > node src/server.js
> > ◇ injected env (0) from .env // tip: ⌘ custom filepath { path: '/custom/path/.env' }
> > node:internal/url:819
>
>       href = bindingUrl.parse(input, base, true);
>                         ^
>
> TypeError: Invalid URL
> at new URL (node:internal/url:819:25)
> at parseURL (/opt/render/project/src/practice/node_modules/ioredis/built/utils/index.js:240:18)
> at EventEmitter.parseOptions (/opt/render/project/src/practice/node_modules/ioredis/built/Redis.js:676:70)
> at new Redis (/opt/render/project/src/practice/node_modules/ioredis/built/Redis.js:53:14)
> at Object.<anonymous> (/opt/render/project/src/practice/src/redis.js:3:15)
> at Module.\_compile (node:internal/modules/cjs/loader:1812:14)
> at Object..js (node:internal/modules/cjs/loader:1943:10)
> at Module.load (node:internal/modules/cjs/loader:1533:32)
> at Module.\_load (node:internal/modules/cjs/loader:1335:12)
> at wrapModuleLoad (node:internal/modules/cjs/loader:255:19) {
> code: 'ERR_INVALID_URL',
> input: 'redis://redis-cli --tls -u rediss://default:gQAAAAAAAZxjAAIgcDJjNGI5NzQyYzMxYjE0ZWIzYmRiOTU3YjdjNmE5YTcyMA@talented-sunbird-105571.upstash.io:6379'
> }
> Node.js v24.14.1

Good, the deploy reached your app. The failure is just the Redis URL format.

You accidentally set `REDIS_URL` to something like:

```text
redis://redis-cli --tls -u rediss://...
```

That is invalid.

In Render, go to:

```text
Your service -> Environment
```

Find `REDIS_URL`.

Set it to **only** the Upstash URL, starting directly with `rediss://`:

```text
rediss://default:YOUR_PASSWORD@YOUR_UPSTASH_HOST:6379
```

Do **not** include:

```text
redis-cli --tls -u
```

Do **not** add `redis://` before it.

Also, since you pasted the Redis password here, I strongly recommend rotating/regenerating the Upstash Redis password/token after the deploy works. It is probably fine in this chat, but good habit.

After editing `REDIS_URL` in Render:

1. Save environment variables.
2. Click **Manual Deploy**.
3. Choose **Clear build cache & deploy** or just **Deploy latest commit**.

Expected logs:

```text
Redis connected
MongoDB connected
Server running on http://localhost:...
```

Then test:

```powershell
curl https://YOUR_RENDER_APP_URL/health
```

Paste the next error if it fails, but hide passwords.

> C:\Users\Admin\Documents\URL shortner\practice>curl https://url-shortener-backend-yqk1.onrender.com/health
> {"status":"ok"}

> hey this much is done
> i tested it with the render base url and it is working .. what is pending now
>
> User context
>
> Images:
>
> - `~/AppData/Local/Temp/codex-clipboard-8ff1ab0d-66df-4c50-a6cb-239ac4016896.png`

Huge checkpoint: your live backend is working.

From your screenshot, production has:

- Live Render health working
- Live short URL redirect working with `302`
- Browser redirecting to Google
- Live stats endpoint working
- Click count updating
- MongoDB Atlas connected
- Upstash Redis connected
- Render deployment working

What’s pending now:

1. **Update README with live URL**

Add near the top:

````md
## Live Demo

Base URL:

```text
https://url-shortener-backend-yqk1.onrender.com
```
````

Example:

```bash
curl https://url-shortener-backend-yqk1.onrender.com/health
```

````

2. **Set `BASE_URL` on Render**

In Render environment variables, make sure:

```env
BASE_URL=https://url-shortener-backend-yqk1.onrender.com
````

This makes `POST /shorten` return live short URLs instead of localhost URLs.

3. **Rotate Upstash Redis credentials**

Because the Redis password appeared in the Render logs you pasted here, regenerate/rotate the Redis password/token in Upstash, then update `REDIS_URL` in Render.

4. **Commit final docs update**

After updating README:

```powershell
git add README.md
git commit -m "Add live deployment URL"
git push
```

5. **Final resume bullets**

After the README update, the project is basically complete. Then we’ll write resume bullets you can actually defend.

Project completion: **97%**.

Only final polish is left: README live URL, credential rotation, and resume/interview study notes.

> \# URL Shortener Backend
>
> A backend URL shortener built with Node.js, Express, MongoDB, and Redis.
>
> The service creates short URLs, redirects users to the original URL, tracks click counts, caches redirect data in Redis, supports link expiry, and protects URL creation with a Redis token bucket rate limiter.
>
> \## Features
>
> \- Create short URLs using `POST /shorten`
>
> \- Redirect short URLs using `GET /:code`
>
> \- Track total clicks for each short URL
>
> \- View link stats using `GET /:code/stats`
>
> \- Store URL data in MongoDB
>
> \- Use Redis cache-aside pattern for redirects
>
> \- Expire links using `expiresAt`
>
> \- Return `410 Gone` for expired links
>
> \- Rate limit URL creation using a Redis token bucket
>
> \- Benchmark redirect performance using autocannon
>
> \## Tech Stack
>
> \- Node.js
>
> \- Express.js
>
> \- MongoDB
>
> \- Mongoose
>
> \- Redis
>
> \- ioredis
>
> \- Docker
>
> \- autocannon
>
> \## Local Setup
>
> Clone the repository:
>
> ```bash
>
> git clone https://github.com/Disha1027/URL-shortener-backened.git
>
> cd URL-shortener-backend
>
> ```
>
> Install dependencies:
>
> ```bash
>
> npm install
>
> ```
>
> Create a `.env` file:
>
> ```env
>
> PORT=3000
>
> MONGO\_URI=mongodb://localhost:27017/url\_shortener\_practice
>
> REDIS\_URL=redis://localhost:6379
>
> ```
>
> Start MongoDB and Redis:
>
> ```bash
>
> docker compose up -d
>
> ```
>
> Start the server:
>
> ```bash
>
> npm run dev
>
> ```
>
> Health check:
>
> ```bash
>
> curl http://localhost:3000/health
>
> ```
>
> Expected response:
>
> ```json
>
> {
>
> &#x20; "status": "ok"
>
> }
>
> ```
>
> \## API Endpoints
>
> \### Create Short URL
>
> ```http
>
> POST /shorten
>
> ```
>
> Request body:
>
> ```json
>
> {
>
> &#x20; "url": "https://example.com",
>
> &#x20; "ttlDays": 30
>
> }
>
> ```
>
> Response:
>
> ```json
>
> {
>
> &#x20; "originalUrl": "https://example.com",
>
> &#x20; "shortCode": "abc123",
>
> &#x20; "shortUrl": "http://localhost:3000/abc123",
>
> &#x20; "expiresAt": "2026-07-13T10:00:00.000Z"
>
> }
>
> ```
>
> \### Redirect Short URL
>
> ```http
>
> GET /:code
>
> ```
>
> Returns a `302` redirect to the original URL.
>
> Possible errors:
>
> ```json
>
> {
>
> &#x20; "error": "short url not found"
>
> }
>
> ```
>
> ```json
>
> {
>
> &#x20; "error": "short url expired"
>
> }
>
> ```
>
> \### Get Stats
>
> ```http
>
> GET /:code/stats
>
> ```
>
> Response:
>
> ```json
>
> {
>
> &#x20; "originalUrl": "https://example.com",
>
> &#x20; "shortCode": "abc123",
>
> &#x20; "clicks": 5,
>
> &#x20; "createdAt": "2026-06-13T10:00:00.000Z",
>
> &#x20; "expiresAt": "2026-07-13T10:00:00.000Z"
>
> }
>
> ```
>
> \## Caching Strategy
>
> The redirect endpoint uses a cache-aside pattern.
>
> When a user visits a short URL:
>
> 1\. The server checks Redis for `url:{code}`.
>
> 2\. If found, it redirects immediately and updates clicks in MongoDB.
>
> 3\. If not found, it fetches the URL from MongoDB.
>
> 4\. Then it stores the result in Redis with a TTL.
>
> 5\. Finally, it redirects the user.
>
> \## Rate Limiting
>
> `POST /shorten` is protected using a Redis token bucket rate limiter.
>
> Default behavior:
>
> \- Bucket capacity: 20 tokens
>
> \- Refill rate: 1 token per second
>
> \- If no tokens are available, the API returns `429 Too Many Requests`
>
> \## Benchmark
>
> Redirect endpoint benchmarked locally using autocannon:
>
> ```bash
>
> npx autocannon -c 50 -d 10 http://localhost:3000/YOUR\_CODE
>
> ```
>
> Recorded local result:
>
> ```text
>
> Cold Redis:
>
> p99 latency: 61 ms
>
> avg req/sec: 1440.1
>
> Warm Redis:
>
> p99 latency: 58 ms
>
> avg req/sec: 1416.6
>
> ```
>
> Note: local benchmark results depend on machine resources and Docker performance.
>
> \## What I Learned
>
> \- How Express handles API routes and middleware
>
> \- How MongoDB stores URL metadata
>
> \- How Mongoose models define database structure
>
> \- How Redis can reduce database reads on redirect paths
>
> \- How TTL expiry works for short links
>
> \- How token bucket rate limiting smooths request bursts
>
> \- How to benchmark backend endpoints using autocannon
>
> this is the entire readme - can you give the entire changed readme so i can copy paste

Copy-paste this as your full `README.md`.

````md
# URL Shortener Backend

A backend URL shortener built with Node.js, Express, MongoDB, and Redis.

The service creates short URLs, redirects users to the original URL, tracks click counts, caches redirect data in Redis, supports link expiry, and protects URL creation with a Redis token bucket rate limiter.

## Live Demo

Base URL:

```text
https://url-shortener-backend-yqk1.onrender.com
```

Health check:

```bash
curl https://url-shortener-backend-yqk1.onrender.com/health
```

Create a short URL:

```bash
curl -X POST https://url-shortener-backend-yqk1.onrender.com/shorten \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"https://example.com\",\"ttlDays\":30}"
```

## Features

- Create short URLs using `POST /shorten`
- Redirect short URLs using `GET /:code`
- Track total clicks for each short URL
- View link stats using `GET /:code/stats`
- Store URL data in MongoDB
- Use Redis cache-aside pattern for redirects
- Expire links using `expiresAt`
- Return `410 Gone` for expired links
- Rate limit URL creation using a Redis token bucket
- Benchmark redirect performance using autocannon

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- ioredis
- Docker
- Render
- MongoDB Atlas
- Upstash Redis
- autocannon

## Local Setup

Clone the repository:

```bash
git clone https://github.com/Disha1027/URL-shortener-backened.git
cd URL-shortener-backened
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
BASE_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/url_shortener_practice
REDIS_URL=redis://localhost:6379
```

Start MongoDB and Redis:

```bash
docker compose up -d
```

Start the server:

```bash
npm run dev
```

Health check:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

## API Endpoints

### Create Short URL

```http
POST /shorten
```

Request body:

```json
{
  "url": "https://example.com",
  "ttlDays": 30
}
```

Response:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:3000/abc123",
  "expiresAt": "2026-07-13T10:00:00.000Z"
}
```

### Redirect Short URL

```http
GET /:code
```

Returns a `302` redirect to the original URL.

Possible errors:

```json
{
  "error": "short url not found"
}
```

```json
{
  "error": "short url expired"
}
```

### Get Stats

```http
GET /:code/stats
```

Response:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "clicks": 5,
  "createdAt": "2026-06-13T10:00:00.000Z",
  "expiresAt": "2026-07-13T10:00:00.000Z"
}
```

## Caching Strategy

The redirect endpoint uses a cache-aside pattern.

When a user visits a short URL:

1. The server checks Redis for `url:{code}`.
2. If found, it redirects immediately and updates clicks in MongoDB.
3. If not found, it fetches the URL from MongoDB.
4. Then it stores the result in Redis with a TTL.
5. Finally, it redirects the user.

## Rate Limiting

`POST /shorten` is protected using a Redis token bucket rate limiter.

Default behavior:

- Bucket capacity: 20 tokens
- Refill rate: 1 token per second
- If no tokens are available, the API returns `429 Too Many Requests`

## Benchmark

Redirect endpoint benchmarked locally using autocannon:

```bash
npx autocannon -c 50 -d 10 http://localhost:3000/YOUR_CODE
```

Recorded local result:

```text
Cold Redis:
p99 latency: 61 ms
avg req/sec: 1440.1

Warm Redis:
p99 latency: 58 ms
avg req/sec: 1416.6
```

Note: local benchmark results depend on machine resources and Docker performance.

## Deployment

The project is deployed using:

- Render for hosting the Node.js API
- MongoDB Atlas for the production MongoDB database
- Upstash Redis for production Redis caching and rate limiting

Production environment variables:

```env
BASE_URL=https://url-shortener-backend-yqk1.onrender.com
MONGO_URI=<MongoDB Atlas connection string>
REDIS_URL=<Upstash Redis connection string>
NODE_ENV=production
```

## What I Learned

- How Express handles API routes and middleware
- How MongoDB stores URL metadata
- How Mongoose models define database structure
- How Redis can reduce database reads on redirect paths
- How TTL expiry works for short links
- How token bucket rate limiting smooths request bursts
- How to benchmark backend endpoints using autocannon
- How to deploy a backend service using Render, MongoDB Atlas, and Upstash Redis
````

Small note: your repo URL currently says `backened`. If that is the actual GitHub repo spelling, keep it. If you renamed it to `backend`, change both `git clone` and `cd` lines.

> ok readme is done
> and i do want to change the backend spelling mistake
> should i first commit and then change or vice verse.. guide me step by step

Do the spelling fix **before** the final commit if possible. Cleaner history.

We’ll fix 3 things:

1. GitHub repo name
2. `package.json` project name
3. README clone URL / folder name

**Step 1: Rename GitHub repo**

Go to GitHub repo page:

```text
Settings -> Repository name
```

Change:

```text
URL-shortener-backened
```

to:

```text
URL-shortener-backend
```

GitHub will redirect old links, but we’ll still update your local remote.

**Step 2: Update local Git remote**

In terminal:

```powershell
cd "C:\Users\Admin\Documents\URL shortner\practice"
git remote -v
```

Then update it:

```powershell
git remote set-url origin https://github.com/Disha1027/URL-shortener-backend.git
```

Check:

```powershell
git remote -v
```

**Step 3: Fix `package.json`**

Open:

```powershell
notepad package.json
```

Change:

```json
"name": "URL-shortener-backned"
```

to:

```json
"name": "url-shortener-backend"
```

Save.

Then run:

```powershell
npm install
```

This updates `package-lock.json`.

**Step 4: Fix README**

Open:

```powershell
notepad README.md
```

Change:

```md
git clone https://github.com/Disha1027/URL-shortener-backened.git
cd URL-shortener-backened
```

to:

```md
git clone https://github.com/Disha1027/URL-shortener-backend.git
cd URL-shortener-backend
```

Save.

**Step 5: Check status**

```powershell
git status
```

Make sure `.env` is not listed.

**Step 6: Commit and push**

```powershell
git add README.md package.json package-lock.json
git commit -m "Fix project naming and update README"
git push
```

After that, your repo name and project name will look clean.

> C:\Users\Admin\Documents\URL shortner\practice>npm install
>
> up to date, audited 167 packages in 8s
>
> 40 packages are looking for funding
> run `npm fund` for details
>
> 3 moderate severity vulnerabilities
>
> To address all issues (including breaking changes), run:
> npm audit fix --force
>
> Run `npm audit` for details.
>
> C:\Users\Admin\Documents\URL shortner\practice>npm audit
>
> # npm audit report
>
> uuid <11.1.1
> Severity: moderate
> uuid: Missing buffer bounds check in v3/v5/v6 when buf is provided - https://github.com/advisories/GHSA-w5hq-g745-h8pq
> fix available via `npm audit fix --force`
> Will install autocannon@2.0.1, which is a breaking change
> node_modules/uuid
> hyperid <=1.2.0 || 1.3.1 - 3.3.0
> Depends on vulnerable versions of uuid
> node_modules/hyperid
> autocannon >=2.1.0
> Depends on vulnerable versions of hyperid
> node_modules/autocannon
>
> 3 moderate severity vulnerabilities
>
> To address all issues (including breaking changes), run:
> npm audit fix --force

This audit issue is coming from **autocannon**, which is only a dev benchmarking tool.

Do **not** run:

```powershell
npm audit fix --force
```

Because npm already told you it would install an older/breaking autocannon version:

```text
Will install autocannon@2.0.1, which is a breaking change
```

For this project, it is okay to leave it for now because:

- It is in `devDependencies`
- It is not used by your production server on Render
- It is only used locally for benchmarking

Now continue the naming commit.

Run:

```powershell
git status
```

Make sure `.env` is not listed.

Then:

```powershell
git add README.md package.json package-lock.json
git commit -m "Fix project naming and update README"
git push
```

If Git says there is nothing to commit, paste the `git status` output.

> done .. what next.. how much is left now

You’re basically at the finish line.

Project completion: **98% done**.

What’s done:

- Phase 1 core service
- Phase 2 Redis caching + expiry
- Phase 3 rate limiting + benchmarking
- Phase 4 deployment
- README
- architecture doc
- live Render URL working
- GitHub naming fixed

What’s left:

1. **Rotate Upstash Redis credentials**
   Because the Redis URL/password was pasted earlier. Go to Upstash, regenerate/rotate credentials, then update `REDIS_URL` in Render and redeploy.

2. **Final production check**
   Test these one more time:

   ```powershell
   curl https://url-shortener-backend-yqk1.onrender.com/health
   curl -X POST https://url-shortener-backend-yqk1.onrender.com/shorten -H "Content-Type: application/json" -d "{\"url\":\"https://example.com\",\"ttlDays\":30}"
   curl -i https://url-shortener-backend-yqk1.onrender.com/YOUR_CODE
   curl https://url-shortener-backend-yqk1.onrender.com/YOUR_CODE/stats
   ```

3. **Write resume bullets**
   We’ll craft them carefully so you can defend every line.

4. **Study/interview prep**
   This is not code work, but it’s the difference between “project exists” and “project helps you get selected.”

After credential rotation and final production test, code-wise the project is **complete**.

> lets start with the resume bullets

Good. Since this is your central project, keep the bullets strong but honest.

Use this on your resume:

**URL Shortener Backend | Node.js, Express, MongoDB, Redis, Docker, Render**

- Built and deployed a URL shortener backend with REST APIs for URL creation, redirection, click tracking, and link stats using Node.js, Express, MongoDB, and Mongoose.
- Added Redis cache-aside layer for redirect lookups with TTL-based expiry, reducing repeated MongoDB reads on frequently accessed short URLs.
- Implemented a Redis-backed token bucket rate limiter on URL creation to control request bursts, returning `429 Too Many Requests` when limits are exceeded.
- Benchmarked redirect endpoint using autocannon at 50 concurrent connections, recording ~58-61 ms p99 latency and ~1.4k requests/sec locally.
- Deployed the service on Render with MongoDB Atlas and Upstash Redis, and documented setup, API usage, architecture, caching strategy, and scaling considerations.

If your resume has less space, use 3 bullets:

- Built and deployed a URL shortener backend using Node.js, Express, MongoDB, and Redis with APIs for shortening URLs, redirects, click tracking, and stats.
- Added Redis cache-aside caching, TTL-based link expiry, and a Redis token bucket rate limiter to improve redirect flow and protect URL creation from spam.
- Benchmarked redirects with autocannon at 50 concurrent connections, recording ~58-61 ms p99 latency and ~1.4k requests/sec locally; deployed on Render using MongoDB Atlas and Upstash Redis.

Best title:

```text
URL Shortener Backend
```

Best tech line:

```text
Node.js, Express.js, MongoDB, Mongoose, Redis, Docker, Render, MongoDB Atlas, Upstash Redis
```

Do **not** say:

```text
Highly scalable distributed system
```

or:

```text
Reduced latency by X%
```

because our benchmark did not clearly prove a big before/after improvement.

A safe resume phrase is:

```text
Implemented Redis cache-aside pattern to reduce repeated database reads on hot redirect paths.
```

That is true and explainable.

> wait so when someone runs this they go to the backend ? theres no UI for this? is UI required in teh frts place

Yes, exactly: this is a **backend-only project**.

There is no UI right now.

Someone uses it by calling API endpoints like:

```bash
POST /shorten
GET /:code
GET /:code/stats
```

That is completely valid for a backend project.

A UI is **not required** for this project, especially if you’re presenting it as:

```text
URL Shortener Backend
```

In fact, for backend interviews, no UI is fine. Interviewers care more about:

- API design
- database schema
- redirect logic
- caching
- expiry
- rate limiting
- deployment
- architecture explanation

That said, a tiny UI can make the project easier to demo.

But it is optional.

**Without UI**, demo looks like:

```bash
curl -X POST ...
curl -i ...
curl /stats
```

**With UI**, demo looks like:

- Paste long URL
- Click “Shorten”
- See short URL
- Click it
- See stats

Should you build a UI?

My recommendation:

For now: **no**.

Finish and study the backend first. Since your resume project is backend-focused, adding a UI too early can distract you.

Later, if you have 1 extra day, add a very simple frontend as a bonus:

```text
/public/index.html
```

or a tiny React app.

But don’t let UI become the main thing. Your project’s strength is backend architecture.

> \resumeProjectHeading
> {\textbf{URL Shortener Backend} $\vert$ Node.js, Express, MongoDB, Redis, Docker, Render}{May 2026 – June 2026}
> \resumeItemListStart
> \resumeItem{Developed and deployed a URL Shortener Backend using Node.js, Express.js, MongoDB, and Mongoose, providing RESTful APIs for URL shortening, redirection, click tracking, and analytics.}
> \resumeItem{Implemented Redis cache-aside pattern to reduce repeated database reads on hot redirect paths.}
> \resumeItem{Designed and integrated a Redis-backed rate limiting mechanism to control request bursts, enhance reliability, and prevent API abuse.}
> \resumeItem{Containerized and deployed the application using Docker and Render, integrated MongoDB Atlas and Upstash Redis, and achieved ~1.4k requests/sec with ~58–61 ms p99 latency during performance testing using autocannon.}
> \resumeItemListEnd
>
> see if this is nice .. else suggest changes

This is pretty good, but I’d make it slightly more honest and sharper.

Main fixes:

- Don’t say “Containerized and deployed using Docker and Render” because Render deployment did **not** use Docker. You used Docker locally for MongoDB/Redis.
- “Analytics” is okay, but “stats API” is more accurate unless you built charts/time-based analytics.
- “Achieved” sounds a bit strong. Better: “recorded locally” because benchmark was local, not production.

Use this version:

```latex
\resumeProjectHeading
  {\textbf{URL Shortener Backend} $\vert$ Node.js, Express.js, MongoDB, Redis, Docker, Render}{May 2026 -- June 2026}
\resumeItemListStart
  \resumeItem{Built and deployed a URL shortener backend using Node.js, Express.js, MongoDB, and Mongoose, providing REST APIs for URL creation, redirection, click tracking, and link stats.}
  \resumeItem{Implemented Redis cache-aside caching with TTL-based expiry to reduce repeated MongoDB reads on frequently accessed redirect paths.}
  \resumeItem{Designed a Redis-backed token bucket rate limiter for URL creation, returning \texttt{429 Too Many Requests} during request bursts.}
  \resumeItem{Used Docker for local MongoDB/Redis setup and deployed the API on Render with MongoDB Atlas and Upstash Redis.}
  \resumeItem{Benchmarked the redirect endpoint using autocannon at 50 concurrent connections, recording approximately 1.4k requests/sec and 58--61 ms p99 latency locally.}
\resumeItemListEnd
```

If you need only 4 bullets, combine the last two:

```latex
\resumeItem{Used Docker for local MongoDB/Redis setup, deployed the API on Render with MongoDB Atlas and Upstash Redis, and benchmarked redirects at approximately 1.4k requests/sec with 58--61 ms p99 latency locally.}
```

This version is strong, accurate, and defendable.

> can i remove the docker point

Yes, you can remove the Docker point.

Docker is useful, but if you don’t want to defend it deeply, don’t highlight it. You can still leave Docker in the tech stack if you’re comfortable saying:

> “I used Docker Compose locally to run MongoDB and Redis.”

But if you want a cleaner backend-focused version, use this:

```latex
\resumeProjectHeading
  {\textbf{URL Shortener Backend} $\vert$ Node.js, Express.js, MongoDB, Redis, Render}{May 2026 -- June 2026}
\resumeItemListStart
  \resumeItem{Built and deployed a URL shortener backend using Node.js, Express.js, MongoDB, and Mongoose, providing REST APIs for URL creation, redirection, click tracking, and link stats.}
  \resumeItem{Implemented Redis cache-aside caching with TTL-based expiry to reduce repeated MongoDB reads on frequently accessed redirect paths.}
  \resumeItem{Designed a Redis-backed token bucket rate limiter for URL creation, returning \texttt{429 Too Many Requests} during request bursts.}
  \resumeItem{Deployed the API on Render with MongoDB Atlas and Upstash Redis, and benchmarked redirects using autocannon at approximately 1.4k requests/sec with 58--61 ms p99 latency locally.}
\resumeItemListEnd
```

This is my recommended version. It avoids Docker and still sounds strong.

> create a porject report for this ... keep it detailed enuf so i can revise it before internships

<details><summary>3 previous messages</summary>

> Absolutely. I’ll make this as a revision-friendly project report, not just a README duplicate: architecture, request flows, Redis, rate limiter, deployment, interview questions, and “how to explain it” notes in one place.
>
> <details><summary>Created a file</summary>
>
> - Wrote `./practice/PROJECT_REPORT.md` (+672 -0)
>
> </details>
>
> The report is created as `PROJECT_REPORT.md` inside your practice project. I’m doing a quick check now so I can tell you exactly where it is and whether Git sees it.

</details>

Created the project report here:

[PROJECT_REPORT.md](~/Documents/URL%20shortner/practice/PROJECT_REPORT.md)

It’s detailed for internship revision: project overview, tech stack, endpoint flows, MongoDB schema, Redis cache-aside, TTL expiry, token bucket rate limiting, benchmarking, deployment, interview Q&A, resume-safe explanation, and a final revision checklist.

Git sees it as untracked. To commit it:

```powershell
git add PROJECT_REPORT.md
git commit -m "Add project report"
git push
```
