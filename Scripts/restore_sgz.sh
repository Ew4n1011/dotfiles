#!/bin/bash
#|---/ /+----------------------------+---/ /|#
#|--/ /-| Script to configure system |--/ /-|#
#|-/ /--| Ew4n1011/Prasanth Rangan   |-/ /--|#
#|/ /---+----------------------------+/ /---|#

source global_fn.sh
if [ $? -ne 0 ] ; then
    echo "Error: unable to source global_fn.sh, please execute from $(dirname $(realpath $0))..."
    exit 1
fi

# sddm
if pkg_installed sddm
    then

    if [ ! -d /usr/lib/sddm/sddm.conf.d ] ; then
        sudo mkdir -p /usr/lib/sddm/sddm.conf.d
    fi

    if [ ! -f /usr/lib/sddm/sddm.conf.d/default.t2.bkp ] ; then
        echo "configuring sddm..."
        sudo cp /usr/lib/sddm/sddm.conf.d/default.conf /usr/lib/sddm/sddm.conf.d/default.t2.bkp
        sudo sed -i "/^DisplayServer=/c\DisplayServer=wayland
        /^Current=/c\Current=ittu
        /^CursorTheme=/c\CursorTheme=Eevee" /usr/lib/sddm/sddm.conf.d/default.conf
    fi

    if [ ! -f /usr/share/sddm/themes/ittu/components/artwork/gifs/${USER}.gif ] ; then
        sudo cp $(find /usr/share/sddm/themes/ittu/components/artwork/gifs -name "*.gif" | sort -R | head -1) /usr/share/sddm/themes/ittu/components/artwork/gifs/${USER}.gif
        echo "avatar set for ${USER}..."
    fi

    # Set keyboard layout to es
    if [ ! -f /etc/X11/xorg.conf.d/00-keyboard.conf ] ; then
        sudo locale-ctl set-x11-keymap es
    fi

else
    echo "WARNING: sddm is not installed..."
fi

# grub
if pkg_installed grub
    then

    if [ ! -f /etc/default/grub.t2.bkp ] && [ ! -f /boot/grub/grub.t2.bkp ]
        then
        echo "configuring grub..."
        sudo cp /etc/default/grub /etc/default/grub.t2.bkp

        if nvidia_detect
            then
            sudo sed -i "/^GRUB_CMDLINE_LINUX_DEFAULT=/c\GRUB_CMDLINE_LINUX_DEFAULT=\"loglevel=3 quiet splash nvidia_drm.modeset=1\"" /etc/default/grub
        fi

        # fix laptop keyboard lag at boot
        if laptop_detect
            then
            sudo sed -i "/^GRUB_CMDLINE_LINUX_DEFAULT=/c\GRUB_CMDLINE_LINUX_DEFAULT=\"loglevel=3 quiet splash i8042.nopnp=1 i8042.dumbkbd=1\"" /etc/default/grub
        fi

        sudo sed -i "/^GRUB_DEFAULT=/c\GRUB_DEFAULT=saved
        /^GRUB_GFXMODE=/c\GRUB_GFXMODE=1280x1024x32,auto
        /^#GRUB_THEME=/c\GRUB_THEME=\"/boot/grub/themes/yorha-1920x1080/theme.txt\"
        /^#GRUB_SAVEDEFAULT=true/c\GRUB_SAVEDEFAULT=true" /etc/default/grub

        sudo cp /boot/grub/grub.cfg /boot/grub/grub.t2.bkp
        sudo grub-mkconfig -o /boot/grub/grub.cfg
    fi

else
    echo "WARNING: grub is not installed..."
fi


# dolphin
if pkg_installed dolphin && pkg_installed xdg-utils
    then
    xdg-mime default org.kde.dolphin.desktop inode/directory
    echo "setting" `xdg-mime query default "inode/directory"` "as default file explorer..."

else
    echo "WARNING: dolphin is not installed..."
fi


# zsh
if pkg_installed zsh
    then

    if [ "$SHELL" != "/usr/bin/zsh" ] ; then
        echo "changing shell to zsh..."
        chsh -s $(which zsh)
    fi

else
    echo "WARNING: zsh is not installed..."
fi