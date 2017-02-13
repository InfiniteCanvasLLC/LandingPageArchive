# Landing Page Archive

This repo contains the old Landing Pages used by Neon Games.  I'll call attention to a few key things here, but feel free to ask questions on Slack.

## Where did these landing pages come from?

[https://themeforest.net/](https://themeforest.net/) has a bunch of great themes.  Most of the landing pages are based on the [Polar](https://themeforest.net/item/polar-creative-multipurpose-wordpress-theme/14105221) template.  The unmodified template is also in Git.

## What changes were made to the landing pages

The purpose of the landing pages as we used them, was for product validation.  So the priorities are:

- Simple.  There shouldn't be a lot of content or menus on the page.  The purpose should be clear.
- Following from simplicity, is ease of measurement.  If there are too many options for a user, the data becomes more fuzzy and we need more data points to extract anything meaningful.
- Small load time.  There's plenty of data that for load times much over a second or two, user drop off is quite significant.  By having these be static pages that don't need a Ruby on Rails back-end or database, we let Apache / Nginx do what they do best.  And just throw files at your web browser.

So consequently, a lot of extraneous elements from the Polar template were removed.  The page only has 3-4 sections and most of the content is above the fold.

## Telemetry

Product validation requires some telemetry hooks, otherwise a lander doesn't serve much purpose.

So the modified landing pages make liberal use of MixPanel.  The following events are logged:

1. Page load
2. Scrolling.  Every 10% down the page, one event is generated.
3. Clicking the "Download" link
4. Mailing list sign-up

When advertising on Facebook, the CTR / conversion rate is also measured.

**NOTE:** We did not use CPC advertising, for the same reasons we've encountered with Audicy.

## Creating a new landing page

As a starting point, I would recommend doing the following.

1. Clone this repo locally
2. Go into any top level directory
3. Open the polar-template/index.html files in your web browser.  These are static pages and you don't need a local web server like MAMP.
4. Once you find a lander that might serve as a good starting point, copy that folder into a new repo and start modifying it.

Alternatively, you can also find a new template on ThemeForest.  A paid template is fine, please see Rishi or Serge with how to expense it.

## Hosting landing pages

Since these are just static pages, you don't need Heroku or AWS to serve these.  No database or server side logic is performed.

For Neon Games, we hosted these out of [Dreamhost](https://www.dreamhost.com/), and pointed a domain at a subdirectory.

We can do this again, but the world has changed and Dreamhost is overkill.  I recommend we spin up a small [Digital Ocean](https://www.digitalocean.com/) droplet to host these.  We can easily point a domain to one.

This is much cheaper, since they are static pages, a $5/mo droplet running Nginx should suffice.  We could probably get away with hosting a few landers on one.
