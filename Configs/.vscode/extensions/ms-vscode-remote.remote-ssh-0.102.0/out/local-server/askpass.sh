#!/bin/sh

VSCODE_SSH_ASKPASS_RESULT=`mktemp`
VSCODE_SSH_ASKPASS_RESULT="$VSCODE_SSH_ASKPASS_RESULT" "$VSCODE_SSH_ASKPASS_NODE" "$VSCODE_SSH_ASKPASS_MAIN" "$VSCODE_SSH_ASKPASS_EXTRA_ARGS" $*
cat $VSCODE_SSH_ASKPASS_RESULT
rm $VSCODE_SSH_ASKPASS_RESULT