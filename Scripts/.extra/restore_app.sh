#!/bin/bash
#|---/ /+-----------------------------+---/ /|#
#|--/ /-| Script to configure my apps |--/ /-|#
#|-/ /--| Ew4n1011/Prasanth Rangan    |-/ /--|#
#|/ /---+-----------------------------+/ /---|#

ScrDir=`dirname $(dirname $(realpath $0))`

source $ScrDir/global_fn.sh
if [ $? -ne 0 ] ; then
    echo "Error: unable to source global_fn.sh, please execute from $(dirname $(realpath $0))..."
    exit 1
fi

CloneDir=`dirname $(realpath $CloneDir)`

# discord
if pkg_installed discord
    then
    discord &> /dev/null &
    sleep 2
    killall discord

    sh -c "$(curl -sS https://raw.githubusercontent.com/Vendicated/VencordInstaller/main/install.sh)"
fi

# spotify
if pkg_installed spotify && pkg_installed spicetify-cli && pkg_installed spicetify-themes-git
    then
    spotify &> /dev/null &
    sleep 2
    killall spotify

    sudo chmod a+wr /opt/spotify
    sudo chmod a+wr /opt/spotify/Apps -R
    
    # Setup spicetify themes (Dribbblish)
    cd /usr/share/spicetify-cli/Themes/Dribbblish
    spicetify config current_theme Dribbblish color_scheme rosepine
    spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
    
    spicetify backup apply
fi