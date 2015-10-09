# Pulsey
Create beautiful pulsey tours for your app


Component Map
1 PulsyTour
2 PulsyDot      2 PulsyUnderlay
3 PulsyTooltip

Usage
- user adds pulsy-tour id div to body of target page
- user adds pt-anchor tags to all target elements


COMPLETED
- move js styles into separate js file and import into main one?
- put dot in center of pt-anchor
- add in click events
- listen for window resize
- add states to local storage
- check to see if pt-anchor has position fixed, and assign that to pulsydot accordingly
- check to see if pt-anchor has position fixed on scroll
- fix weird positioning issue
- easy way to customize tooltip note
- create underlay when pulsy is active (optional)
- link closetooltip and close underlay events
- way for user to modify location of dot (special variable in positioning of the dots?) or can choose to override position altogether
- create function to render root components
- send object in through props
- get ES6 up and running
- automatically run gulp babel and watch for changes

NEXT
- convert to ES6
- install radium
- add hover effects
- option to show an opt-out button in the tooltip, which sets localstorage to true for all
- way to add custom html within tooltip (links, divs with css, etc.) instead of just a string.
- fire event when all dots have been clicked and set a tourComplete key to true

- option for a 'next' button in all tooltips, which automatically moves you to the next tooltip pulsy
- automatically toggle a tooltip style that prevents it from being offscreen
- add a click handler that allows the user to trigger whatever event they want when dot is clicked and when tooltip is closed (likely using component did mount/unmount)
- restart pulsydots automatically upon hitting the reset button along with clearing localstorage
- begin the css craziness...in a controlled way
- choose tooltip pop direction
- choose whether to have a pointer arrow
- tooltip transitions
- dot keyframes and transitions
- colors for all
- dot sizes

LATER
- determine whether pulsy dot is near an edge - default tooltip to left or bottom accordingly
- make pulsydots track either local or session storage as an option
- make mobile/touch-screen ready
- create listener that starts pulsytour based on a user-defined event
