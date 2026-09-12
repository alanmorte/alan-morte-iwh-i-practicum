# Welcome to the Integrating With HubSpot I: Foundations Practicum

This repository is for the Integrating With HubSpot I: Foundations course. This practicum is one of two requirements for receiving your Integrating With HubSpot I: Foundations certification. You must also take the exam and receive a passing grade (at least 75%).

To read the full directions, please go to the [practicum instructions](https://app.hubspot.com/academy/l/tracks/1092124/1093824/5493?language=en).

**HubSpot developer TEST account custom objects list view:** https://app.hubspot.com/contacts/52019510/objects/2-69154354/views/all/list

Custom object: `practicum_projects` (`objectTypeId` `2-69154354`)  
Properties: `name`, `status`, `notes` (associated to CONTACT)

This app is a local draft for Alan's review. It talks to developer TEST portal `52019510` only.

___
## Tips:
- Commit to your repository often. Even if you make small tweaks to your code, it’s best to be committing to your repository frequently.
- The subject of the custom object is up to you. Feel free to get creative!
- Create a HubSpot developer test account and a private app. Store the private app access token in a local `.env` file only.
- **DO NOT commit your private app access token.** Never put the token in `index.js`, README, git history, or any committed file. `.gitignore` excludes `.env`.
- Ensure you re-merge any working branches into the main branch.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example env file and add your **local** private app token. Leave the committed `.env.example` token empty.

```bash
cp .env.example .env
```

3. In `.env`, set:

```
HUBSPOT_ACCESS_TOKEN=your-token-goes-here-locally-only
HUBSPOT_OBJECT_TYPE_ID=2-69154354
PORT=3000
```

4. Start the app:

```bash
node index.js
```

Or:

```bash
npm start
```

5. Open http://localhost:3000

- `GET /` lists `practicum_projects` records in **Custom Object Table**
- `GET /update-cobj` is the create form titled `Update Custom Object Form | Integrating With HubSpot I Practicum.`
- `POST /update-cobj` creates a CRM record via the HubSpot CRM v3 objects API, then redirects to `/`

## Pre-requisites:
- Using [Node](https://nodejs.org/en/download) and node packages
- Using [Express](https://expressjs.com/en/starter/installing.html)
- Using [Axios](https://axios-http.com/docs/intro)
- Using [Pug templating system](https://pugjs.org/api/getting-started.html)
- Using the command line
- Using [Git and GitHub](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners)

## Requirements
- All work must be your own. During the grading process we will check the revision history. Submissions that do not meet this requirement will not be considered.
- You must have at least two new routes in your index.js file and one new pug template for the homepage.
- You must create a developer test account and link to it in your README.md file. Submissions that do not meet this requirement will not be considered.
