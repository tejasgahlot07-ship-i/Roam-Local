# Roam Local

A regional travel guide for Delhi and Gurugram built to help residents, students, and visitors discover heritage landmarks, cafes, hangout spots, and local transit tips across NCR.

## Features
- **Explore Directory:** Search destinations by name or keyword, filter by region (Gurugram, South Delhi, Central Delhi), and sort by rating.
- **Destination Details & Live Weather:** View timings, entry info, metro connectivity, and real-time weather updates powered by the Open-Meteo API.
- **Saved Places:** Bookmark favorite destinations, stored persistently on the server in `data/favorites.json`.
- **Community Tips Board:** Share, edit, upvote, and delete local travel tips backed by MongoDB.
- **Contact Form:** Submit location suggestions directly to `data/messages.json` via Express REST APIs.

## Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express
- **Database & Storage:** MongoDB (Mongoose), Local JSON File Storage (`fs/promises`)
- **External API:** Open-Meteo Weather API

## Team
- Tejas Gahlot
- Rahul Rajpurohit
- Adarsh Beniwal
- Paarth Yadav
- Pratyaksh Jain
