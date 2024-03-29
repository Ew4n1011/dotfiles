#!/bin/bash
#|---/ /+----------------------------------+---/ /|#
#|--/ /-| Script to extract fonts & themes |--/ /-|#
#|-/ /--| Prasanth Rangan                  |-/ /--|#
#|/ /---+----------------------------------+/ /---|#

scrDir=$(dirname "$(realpath "$0")")
source "${scrDir}/global_fn.sh"
if [ $? -ne 0 ] ; then
    echo "Error: unable to source global_fn.sh..."
    exit 1
fi

cat "${scrDir}/restore_fnt.lst" | while read lst
do

    fnt=`echo $lst | awk -F '|' '{print $1}'`
    tgt=`echo $lst | awk -F '|' '{print $2}'`
    tgt=`eval "echo $tgt"`

    if [ ! -d "${tgt}" ]
    then
        mkdir -p "${tgt}" || echo "creating the directory as root instead..." && sudo mkdir -p "${tgt}"
        echo -e "\033[0;32m[EXTRACT]\033[0m ${tgt} directory created..."
    fi

    sudo tar -xzf "${CloneDir}/Source/arcs/${fnt}.tar.gz" -C "${tgt}/"
    echo -e "\033[0;32m[EXTRACT]\033[0m ${fnt}.tar.gz --> ${tgt}..."

done

echo -e "\033[0;32m[FONTS]\033[0m rebuilding font cache..."
fc-cache -f
