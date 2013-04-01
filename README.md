#killzakeyboard
==============
___

##W8A - Last Updated: 29.03.2013
- Added Sound, THE Cookie, Scaling, Progress Bar

###[Queuing Features]
- Experimental Post Screen
- Sound prefferences
- New Enemy spawning
- Full HD User Interface
- Full HD Canvas
- Sound support (MP3)
- Namespaces

___

Dragos
======

**Programming**
- define 12 levels
- increase canvas objects/assets by 87.5% (background already increased)
- pause game on ESCAPE

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
- build ESCAPE menu (called when on game pause, closing the menu unpauses the game)
- build PostScreen (as in .png for now)
- concluding PostScreen sound (when killrate appears)

**Candy**
- koocha die sounds (2-4)
- finish ui design (waiting for Art)

Notable Bugs
====
- Slower rendering/movment in Firefox (questionable, aditional testing required)
- Levels end sooner than they should (suspecting enemy spawn system)
- Suspicious Cookie Behaviour in Chrome - not creating cookies (might not apply anymore since THE Cookie, additional testing required).

Backlog
=====

Other Issues / Abandoned
=====
- No Support for Opera (requestAnimationFrame not available)
- No Support for Safari (requestAnimationFrame not available)
- Chrome plays PostScreen sounds lower than normal after playing shootSnd and Music
- Silent Gap when loopping music in Firefox (declared bug on Bugzilla)
