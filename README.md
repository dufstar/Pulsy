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
- create underlay when pulsy is active (optional)
- link closetooltip and close underlay events
- way for user to modify location of dot (special variable in positioning of the dots?) or can choose to override position altogether
- create function to render root components
- send object in through props
- get ES6 up and running
- automatically run gulp babel and watch for changes
- move all styles into one object

NEXT
- fix repositioning on window resize and scroll


Tooltip API
- tooltip pop direction
- choose whether to have a pointer arrow
- tooltip transitions
- colors

LATER
- separate js styles into separate files using import and export
- install radium
- convert everything to ES6 syntax
- add hover effects
- dot transitions
- dot as tooltip

SOMETIME
- determine whether pulsy dot is near an edge - default tooltip to left or bottom accordingly
- make pulsydots track either local or session storage as an option
- make mobile/touch-screen ready
- option to show an opt-out button in the tooltip, which sets localstorage to true for all
- way to add custom html within tooltip (links, divs with css, etc.) instead of just a string.
- fire event when all dots have been clicked and set a tourComplete key to true
- restart pulsydots automatically upon hitting the reset button along with clearing localstorage
- option for a 'next' button in all tooltips, which automatically moves you to the next tooltip pulsy
- perhaps move original render method into the pulsy object so that the user can just call pulsy.start in their code.  is that useful?  could be, because then they could use the same syntax for all the changes they wish to make (ie pulsy.start; pulsy.style.dot.color = blue; etc.)
- when the tour ends, return an object that tells the user whether the tour was completed or aborted, and maybe how many steps were completed.
- give user ability to see how many dots have been clicked, which one was just clicked, whether tour was completed, so they can do something with that information
- easier way for users to modify the pulsy object than I'm currently envisioning - so they can just pass in their options all at once or something


pulsyUtilities API
- create multiple styles (styleType) for tooltip, dot, and underlay, and make it so that user can just modify one option and have it all just work (pull this option from data-attribute in HTML).  this can all be handled in an external css file, and changing the option simply changes the css file being linked to.  they can also simply link to their own css file.
-  allow them to turn on edgeSense, which will automatically sense whether your tooltip is overflowing the edge of the screen, and will override the popDirection
- text for your tooltip (pull from data-attribute in the HTML)
- give them option to make pulsydots ordered or unordered.  if unordered (default), they all show up at once.  if they're ordered, maybe pull that from data attributes as well, and there has to be one with data-pulsy-1 named, then just step to the next one.
- allow user to set a callback onStepComplete
- allow user to set a callback onTourComplete
- next button option, on or off.  shows a done button by default for the last tooltip, whether ordered or unordered.  if unordered, clicking next takes you to the next pulsydot as determined by dotId
- choose local or session storage for dot memory (local is default)
- ability to turn an optOutButton on or off, which gives the user the ability to end the tour by setting local storage for all dots
- ability to turn keyboardNav on or off (right, left, enter, escape)
- ability to run pulsyTours by className - tour groups, so to speak
- for ordered tours, ability to declare which step you would like to start from



pulsyUtilities
  styles
    animation
    dot
    tooltip
      general
      closeTooltip
      nextButton
      optOutButton
    underlay
  tooltip
    direction  
  target
    coordinates
  options
    edgeSense
    ordered
    nextButton
    exitButton
    keyboardNav
    storageType
  onTourComplete
  onStepComplete
  onOptOut
