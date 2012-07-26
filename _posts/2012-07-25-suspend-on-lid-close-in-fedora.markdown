---
layout: blog-post
title: "Suspend on Lid Close in Fedora :: Josh D Miller :: joshdmiller.com"
posttitle: Suspend on Lid Close in Fedora
tags:
    - technology
    - fedora
    - linux
    - howto
    - fun
---

I like [Fedora](http://www.fedoraproject.org). As all who know me are aware, [Arch
Linux](http://www.archlinux.org) is my favorite Linux distribution; but if I had
to pick another distro, it would be Fedora. The problem with Fedora for me is
that it assumes you are using a configuration with which they are familiar, like
[GNOME](http://www.gnome.org) or [KDE](http://www.kde.org). Their setups,
documentation, and architecture are built with these assumptions.

But my favorite desktop environment is a custom configuration
based on [Xmonad](http://xmonad.org). When I use Fedora, configuration can get a
little funky - and frustrating. I installed Fedora on my laptop this morning to
play with Fedora 17 and quickly noticed an issue - without running GNOME, my
laptop would not suspend on lid close.

It took a little bit of effort, but the answer is super easy. Here's how I fixed
it.

<!-- more -->

Fedora comes with a package called
[`pm-utils`](http://pm-utils.freedesktop.org/wiki/), which is a set of scripts
to make power-management from the command-line easy. And sure enough, typing
`sudo pm-suspend` worked out of the box and exactly as expected - a plus to be
sure. And when I opened the lid of my laptop, it resumed - precisely as I expected
it to. But when I closed the lid, nothing happened.

Insert [ACPID](http://acpid.sourceforge.net/), a daemon for monitoring and
reacting to ACPI events.
[ACPI](http://en.wikipedia.org/wiki/Advanced_Configuration_and_Power_Interface)
is a specification for hardware manufacturers to ensure
all operating systems can configure the hardware in a standard way. The
principal use for this is in power management. When buttons are pressed (like
the power button) or the lid is closed, an ACPI event is thrown. Using ACPID, we
can capture that event and react to it. It's actually pretty easy and takes
editing only two files, but we first need to install it:

    $ sudo yum install acpid

That's it. Now that it's installed, there's a new directory inside
`/etc` called `acpi` that contains two folders: `actions` and `events`. These
folders contain definitions of the eponymous type; an 'event' is
something to which ACPID can listen and an 'action' is something to do in
response.

First, let's listen for an event. Create a file (as root, of course) called
`/etc/acpi/events/lidclose` that contains the following:

    event=button/lid
    action=/etc/acpi/actions/suspend.sh

This is super simple; it says to listen for the event called "button/lid", which
is the hardware switch that is activated on closing and opening the laptop lid,
and when it occurs to run the shell script specified as the 'action'.

So let's create the action file at `/etc/acpi/actions/suspend.sh` and populate
it with this simple `if` statement:

    #!/bin/bash

    [ $(cat /proc/acpi/button/lid/LID0/state | awk '{print $2}') == "closed" ] && pm-suspend

The first line just indicates that this needs to be run using Bash. The next
line may look complicated if you're not used to writing shell scripts, but it's
really simple. It justs looks at the file containing the lid state, takes its
second value, and compares it to the string "closed". If it matches,
`pm-suspend` is executed. In case you missed it, we need the `if` statement
because the event is fired when the lid is opened and when it is closed. If we
didn't ensure that the lid was closed, it would fire again when we opened it!

And that's it. It works. Yay!

