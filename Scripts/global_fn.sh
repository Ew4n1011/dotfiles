#!/bin/bash
#|---/ /+--------------------------+---/ /|#
#|--/ /-| Global functions         |--/ /-|#
#|-/ /--| Ew4n1011/Prasanth Rangan |-/ /--|#
#|/ /---+--------------------------+/ /---|#

set -e

CloneDir=`dirname $(dirname $(realpath $0))`

service_ctl()
{
    local ServChk=$1

    if [[ $(systemctl list-units --all -t service --full --no-legend "${ServChk}.service" | sed 's/^\s*//g' | cut -f1 -d' ') == "${ServChk}.service" ]]
    then
        echo "$ServChk service is already enabled, enjoy..."
    else
        echo "$ServChk service is not running, enabling..."
        sudo systemctl enable ${ServChk}.service
        sudo systemctl start ${ServChk}.service
        echo "$ServChk service enabled, and running..."
    fi
}

pkg_installed()
{
    local PkgIn=$1

    if pacman -Qi $PkgIn &> /dev/null
    then
        #echo "${PkgIn} is already installed..."
        return 0
    else
        #echo "${PkgIn} is not installed..."
        return 1
    fi
}

pkg_available()
{
    local PkgIn=$1

    if pacman -Si $PkgIn &> /dev/null
    then
        #echo "${PkgIn} available in arch repo..."
        return 0
    else
        #echo "${PkgIn} not available in arch repo..."
        return 1
    fi
}

chk_aurh()
{
    if pkg_installed yay
    then
        aurhlpr="yay"
    elif pkg_installed paru
    then
        aurhlpr="paru"
    fi
}

aur_available()
{
    local PkgIn=$1
    chk_aurh

    if $aurhlpr -Si $PkgIn &> /dev/null
    then
        #echo "${PkgIn} available in aur repo..."
        return 0
    else
        #echo "aur helper is not installed..."
        return 1
    fi
}

nvidia_detect()
{
    if [ `lspci -k | grep -A 2 -E "(VGA|3D)" | grep -i nvidia | wc -l` -gt 0 ]
    then
        #echo "nvidia card detected..."
        return 0
    else
        #echo "nvidia card not detected..."
        return 1
    fi
}

amd_detect()
{
    if [ `lspci -k | grep -A 2 -E "(VGA|3D)" | grep -i amd | wc -l` -gt 0 ]
    then
        #echo "amd card detected..."
        return 0
    else
        #echo "amd card not detected..."
        return 1
    fi
}

laptop_detect()
{
    if [ -d /sys/class/power_supply/ ]; then
        for supply in /sys/class/power_supply/*; do
            if [ -e "$supply/type" ]; then
                type=$(cat "$supply/type")
                if [ "$type" == "Battery" ]; then
                    return 0  # It's a laptop
                fi
            fi
        done
    fi
    return 1  # It's not a laptop
}