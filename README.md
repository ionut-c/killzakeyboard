#killzakeyboard
==============
___

##W8A
- recreate app

___

Dragos
======

**Programming**
- define 12 levels
- increase canvas objects/assets by 87.5% (background already increased)
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
- remove X from pause menu (breaks up the game / unneeded / confusing with resume)
- remove pause menu from main screen
- add "The way of the Raccoon" menu to main screen
- 

**Candy**
- koocha die sounds (2-4)
- create minimalistic background for menus

Notable Bugs
====
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
