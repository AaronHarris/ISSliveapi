# ISS LIVE API

This project was created as a quick-and-dirty way to track the attitude of the International Space Station over time using the publicly-available NASA data from JSC's [Space Station Live](http://spacestationlive.nasa.gov/displays/). Specifically the ADCO display is monitored. This setup can be done in a few ways, but how I did it was having a desktop computer running 24/7 to gather this daya and periodically checking it track its progress.

This was written during Summer 2013, which is when I interned for NASA's Jet Propulsion Laboratory. I would have continued working on this, but I already copmleted my internship.

## A Few Notes

* While this script works and collected two months of ISS data, it is not considered stable, nor guarantees accurate data. Specifically the exact ISS time is not guaranteed, as this accurracy wasn't necessary for the project I was working on (desktop system clock is used instead).
* Setting up a local Apache/MySQL server is optional, but was a handy way to record the data in case of a power outtage. Also removed the need to manually copy paste data into Excel.
* This script accesses the ADCO page directly, so if the url changes, it needs to be updated in the script
Very often (maybe once every 90 minutes) the webpage will not display any data for about 10 minutes because the server has lost connection with the ISS. I cannot control this.
* This code does not reveal nor collect any information that NASA has not made directly available to the general public, nor does it increase server load on NASA's servers.
* This code only pulls the current (your computer's) date and time, as well as the ISS's Current and Commanded Pitch, Yaw, and Roll.

## How it works
1. Go to [http://spacestationlive.nasa.gov/displays/adcoDisplay2.html](http://spacestationlive.nasa.gov/displays/adcoDisplay2.html) in Google Chrome
2. Click on the Bookmarklet in your bookmarks bar that says "Scrape ISS ATTITUDe (Google Chrome Only)"
3. A new window will pop up with a table that records all updates made to the page. Closing the tab for the original page will halt the data collectio nbut keep the window open.
4. Select All (Ctrl+A) in the window, which can then be copied (Ctrl+C) and easily pasted into Excel (Ctrl+V)
5. Occasionally, the desktop page loses connection with the NASA Livestreamer server. (Usually once every 24 hours, but sometimes more than once in a day, and sometimes can go several days just fine.) You will need to close the current tab and open a new tab and navgiate to the link above. A new window will open as in Step 3.

## Quick Installation
1. This only works in Google Chrome
2. Either open the file ISSliveapi.html or alternatively just use the link below. Press + Drag the link below into your Bookmarks Bar on Google Chrome (make sure it is visible from the Bookmarks menu).

<a href="javascript:(function (){var jsCode=document.createElement('script');jsCode.setAttribute('src','https://dl.dropboxusercontent.com/u/16624233/JS/scrapeISSsrc.js');document.body.appendChild(jsCode);}());">Scrape ISS Attitude (Google Chrome only)</a>

You are now ready to start collecting ISS attitude data!

## Future Work
I would implement the following if given more time at JPL. Also if you can make any improvements, please fork this repository and send me a pull request!

* Collect more then just the Pitch, Roll, and Yaw. Ideally include all the fields on all the pages and keep them archived and available via a RESTful API. One can dream.

* Please note: What's actually happening is the bookmarklet pulls the script from my dropbox so that when I make updates, you don't have to re-add the bookmarklet; the changes happen immediately next time to click the bookmarklet. Ideally this would be pulled from Github directly.

* Rewrite this to not have to involve any humans in the data collection whatsoever (namely, the Excel Copy+Paste, and leaving a computer running 24/7 in a desktop browser). At the time I wrote this, I estimated that the time to do this would take longer than the accumulated time of me doing parts manually. However as more people find this useful, it may become desired to invest more time in making this run automatically.

## Long Installation (including writing to database)
1. Follow Quick Installation Instructions
2. Install [XAMPP](http://www.apachefriends.org/en/xampp.html) for your computer
3. Place the addentry.php file into your /xampp/htdocs directory.
4. Start the Apache Server and MySQL (from the XAMPP console)
5. Configure your MySQL with a user named root and a blank password.
6. Navigate to localhost:80 in your broswer and click the link for phpmyadmin
7. Create a new database named issdata
8. Create a new table named attitude
9. Create the fields necessary (using types VARCHAR and DECIMAL) to collect the various fields (specifically, `date`, `time`, `yaw`, `yawcmd`, `pitch`, `pitchcmd`, `roll`, `rollcmd`)
10. It should all work now. You can browse the attitude table to verify whether data is being written to the database.