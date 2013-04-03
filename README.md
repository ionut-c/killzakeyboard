#killzakeyboard
==============
___

##W8A - Last Updated: 02.04.2013
- Experimental Post Screen, Sound prefferences, New Enemy spawning, Full HD User Interface, Full HD Canvas, Sound support (MP3), Namespaces, New Score Screen

###[Queuing Features]

___

Dragos
======

**Programming**
- define 12 levels
- increase canvas objects/assets by 87.5% (background already increased)
- pause game on ESCAPE
- pause game on blur
- ScoreScreen Real Kill Rate
- ScoreScreen Next button (play Next Level) - only show Replay button if level was lost (not enough kill rate), hide button when last level was completed
- Scorescreen Replay (replay current Level) - available after any level

**Art**
- level completion stars
- title screen background
- level selection background and icons
- per level backgrounds
- fix assets quality
- death animation

Ionut
=====

**Programming**
- bring W8A up to date (ongoing)
- make divs for level completion stars
- folder structure
- check namespaces

**Candy**
- koocha die sounds (2-4)
- finish ui design (waiting for Art)

Notable Bugs
====
- Slower rendering/movement in Firefox (questionable, aditional testing required)
- Levels end sooner than they should (suspecting enemy spawn system)

Backlog
=====

Known Issues / Abandoned
=====
- No Support for Opera (requestAnimationFrame not available)
- No Support for Safari (requestAnimationFrame not available)
- Chrome plays PostScreen sounds lower than normal after playing shootSnd and Music
- Silent Gap when loopping music in Firefox (declared bug on Bugzilla)
- (only locally) IE requests to allow block content
- (only locally) Chrome must be started with the following parameter: --enable-file-cookies, to store cookies
