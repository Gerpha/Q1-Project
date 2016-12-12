Q1 Project



Scenario: User wants to view detailed info about an airline, aircraft, or airport
Given I’m a user visiting the landing page of a website,
When I enter a flight number, airline, or airport name or code,
And I click “Search”
Then it pulls up whatever matches my input
And I can see all the info about the flight, airline, or airport

As a user,
When I visit the landing page,
I want an input box so I can search for all flights,
And see their speed, elevation, and location.

As a user,
When I search for an airline in the search box
I want to see detailed info relating to that airline
So it can direct me to their website, etc

As a user,
When I search for an airport in the search box
I want to see detailed info relating to that airport
So it can direct me to their website, etc

As a user,
When I click search and it brings up my specified content,
I want to click on that item
So I can view all the detailed information

Given I’m l
When I’m viewing information on a page
And I want to go back to the main landing page
Then I want to have a “Home” button in the top right hand corner
So I can click on it and be taken back home

As a user,
When I click on the “About” button in the top right hand corner,
I want to see info about the developer and site, etc.
So I can call him up and give him an awesome job ;)
