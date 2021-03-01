#!/usr/bin/env bash

echo "Injecting secrets..."
echo "Updating iOS secret"
echo $IOS_SECRET | base64 --decode > "$APPCENTER_SOURCE_DIRECTORY/ios/SpiceSpiceBaby/AppCenter-Config.plist"
echo "Finished injecting secrets."