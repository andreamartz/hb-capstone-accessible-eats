# Accessible Eats

## About the author
Learn more about the developer: [Andrea Martz](https://www.linkedin.com/in/andreamartz/)

## Important note about the data
This project was built as a proof of concept with fake data. No conclusions of any kind should be drawn about the businesses represented in the screenshots below or any other businesses searched using the app.

For best results, search the 55438 zip code or nearby zip codes.

## Project Description
The physical world has mostly been built for people without disabilities. For people in wheelchairs, this creates problems on a daily basis. For example, if the front door of a building does not open automatically, a person in a wheelchair will have a very difficult time entering.

At the time this project was built, social media platforms like Yelp tended not to provide more than the most general accessibility information, such as "Wheelchair accessible." What does wheelchair accessible really mean? There are many features of a restaurant that can be accessible or inaccessible. One overall rating is not sufficient.
 
Accessible Eats aims to empower wheelchair users and their loved ones by 
crowd-sourcing accessibility information about multiple features of a restaurant and making it public. Users can...

1) ...let others know how accessible (or inaccessible) a business or public 
place is by providing feedback.
2) ...learn from the experiences of others when choosing a restaurant in an 
unfamiliar town. This helps them avoid restaurants that are not making enough of an effort to be accessible. 

## User Flow with Screenshots
### Homepage
The app opens on the homepage, which displays a Google Map with markers for restaurants in a default zip code (55438). 
<img src="static/img/screenshots/Homepage-top.png" alt="homepage with map and markers" width="400"/>

The markers are clickable; when clicked, each will open an info window about that restaurant.

<img src="static/img/screenshots/Homepage-map-info-windows.png" alt="homepage with map, markers and info windows" width="400"/>


### Info Cards
Below the map are informational cards for the restaurants on the map. Similar cards appear on multiple pages. All cards are rendered from a single React component. The cards summarize the accessibility information provided for the restaurants by users. Here is a close-up look at one of the cards:
<img src="static/img/screenshots/close-up-of-a-card.png" alt="restaurant info card with food photo" width="300"/>

#### What Users Say Section
The percentages on the cards are the aggregated percentages of users who gave feedback indicating that the restaurant had each of the accessibility features. See Feedback section below for more information.

The emoji displayed for each feature is based on the percentage as follows:
* below 50%: red frowning emoji
* 50 to 80%: orange neutral emoji
* above 80%: green smiling emoji

### Aggregated Feedback




## Technologies Used

### Main Tech Stack

This is a single-page app built primarily with:

* Python
* Flask
* PostgreSQL
* JavaScript
* React.js

### Other Libraries and Frameworks
* SQLAlchemy
* Faker
* Jinja - Jinja was used to return a single HTML page to the frontend
* Bootstrap

### APIs
* Google Maps API (mapping and geocoding services)
* Yelp Fusion API


## How to install


## References
- [Accessibility for Yelp](https://www.tanya-moss.com/yelp)
- [Yelp for Everyone](https://www.sarahpaul.us/case-study-yelp)