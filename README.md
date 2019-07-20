# README Roulette

Fortune wheel for the HH.js README Roulette.

## What is this

README Roulette is a recurring feature of HH.js where attendees present projects of interest in a three minute time frame.

These can be projects they recently used, discovered or even wrote themselves. Everyone gets just one single slide: The project's README.

The speaker selection is random and done using this virtual fortune wheel.

## How to participate

Attendees who want to share a project or npm package can submit a link to github.com or npmjs.com as comment on the event's detail page on meetup.com.

## How to operate the wheel

During the event go to https://hamburg-js.github.io/roulette. A fortune wheel with all submitted comments will appear on screen or some brief instructions with a QR code in case no comments have been posted yet.

Hit the _Go!_ button to spin the wheel. An attendees name and profile pic will be shown.
Once they are on stage, hit the _README!_ button.
A popup window with the submitted URL will open and a 3 minute countdown will start. A progress bar will be shown in the window underneath that visualizes the remaining time.

When the time is up or the window gets closed the wheel is shown again, but this time without the previous presenter.

## Test drive

You can test the app by appending an event ID to the URL, for example https://hamburg-js.github.io/roulette?dfhkvcyslbxb.

**Note:** The winners' IDs are stored in the browser's local storage so that they can be excluded from subsequent rounds. In order to reset the wheel you have to clear your browser's storage.
