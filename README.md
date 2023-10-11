# docs
   * https://www.webscrapingapi.com/recruiting/Web-Scraping-API-Service-2023.pdf

# to run
   * npm i
   * npm run dev 
   * installing headless chrome for puppeteer can be difficult, I am on Ubuntu 20.04, in WSL and had to install:  
      * sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm-dev


# built with  
   * npx create-next-app

# proposals
   * index the blog posts' authors and create endpoint ex: /api/authors/:authorId that gives only articles written by that author

# Unique Feature
   * added a preview of the results so the user can see them visualy as cards and not just as json

# api endpoints
   * GET - /api - returns a "API is running" status
   * GET - /api/scrape?url=:url tries to scrape the url and return appropriate json

