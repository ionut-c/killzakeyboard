#killzakeyboard
==============
___

##W8A - Last Updated: 29.03.2013
- Added Sound, THE Cookie, Scaling, Progress Bar

###[Queuing Features]
- Experimental Post Screen
- Sound prefferences
- New Enemy spawning (waiting)
- Full HD User Interface
- Full HD Canvas
- Sound support (MP3)

___

Dragos
======

**Programming**
- define 3 levels
- enemy spawning overhaul
- change level selection from 5 levels to 12 (number is discussible)
- display stats in PostScreen (plain text)
- increase canvas objects/assets by 87.5% (background already increased)

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
- bring W8A to date (ongoing)
- test wav files in Firefox (might get rid of the sound gap)
- pause game and show menu on ESCAPE

**Candy**
- koocha die sounds (2-4)
- PostScreen animation (waiting for final layout)
- PostScreen sounds (waiting for final layout)
- finish ui design (waiting for Art)

Notable Bugs
====
- THE Cookie stopped working (conflict with SRS Cookie)
- THE Cookie overrides the SRS Cookie with 50503... value after playing a game, sound system fails.

- Slower rendering/movment in Firefox (questionable, aditional testing required)
- Silent Gap when loopping ogg files in Firefox (might be solved with wav files)
- Levels end sooner than they should (suspecting enemy spawn system)
- Suspicious Cookie Behaviour in Chrome - not creating cookies (might not apply anymore since THE Cookie, additional testing required).

Backlog
=====

Other Issues / Abandoned
=====
- No Support for Opera (requestAnimationFrame not available)
- No Support for Safari (requestAnimationFrame not available)
- Chrome plays PostScreen sounds lower than normal after playing shootSnd and Music
