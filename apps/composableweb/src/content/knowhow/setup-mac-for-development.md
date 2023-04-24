---
title: 'Set up Mac for Development'
datePublished: '2023-04-21'
dateCreated: '2023-04-21'
summary: 'Development tools and general setup'
tags:
  - MacOS
draft: true
---
## 1. Install homebrew (will auto-install xcode)

```bash
# paste in terminal and follow the instructions
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# install the bare minimum

brew install \
  wget \
  git \
  starship
```

## 2. SYSTEM PREFERENCES (TERMINAL)

```bash
# take screenshots as jpg (usually smaller size) and not png
defaults write com.apple.screencapture type jpg

# do not open previous previewed files (e.g. PDFs) when opening a new one
defaults write com.apple.Preview ApplePersistenceIgnoreState YES

# show Library folder
chflags nohidden ~/Library

# show hidden files
defaults write com.apple.finder AppleShowAllFiles YES

# show path bar
defaults write com.apple.finder ShowPathbar -bool true

# show status bar
defaults write com.apple.finder ShowStatusBar -bool true

killall Finder;
```

## 3. Install Brews and Casks

```bash
# install brews
brew install \
  android-platform-tools \
  appcleaner \
  autoconf \
  automake \
  awscli \
  bash \
  bash-completion \
  commitizen \
  coreutils \
  entr \
  exa \
  findutils \
  freetype \
  gnu-sed \
  grc \
  htop \
  hub \
  imagemagick \
  macchina \
  make \
  mcrypt \
  moreutils \
  mtr \
  openssl \
  pv \
  python \
  rename \
  rsync \
  terminal-notifier \
  the_silver_searcher \
  tree \
  vim \
  watchman \
  youtube-dl \
  z \
  zopfli
```

```bash
# install casks
brew install --cask \
  1password \
  bartender \
  diffmerge \
  discord \
  dropbox \
  duet \
  freecad \
  handbrake \
  imagealpha \
  imageoptim \
  iterm2 \
  kaleidoscope \
  libreoffice \
  licecap \
  logseq \
  maccy \
  mailspring \
  microsoft-auto-update \
  microsoft-edge \
  mongodb-compass \
  ngrok \
  notion \
  numi \
  obsidian \
  pgadmin4 \
  qlcolorcode \
  qlimagesize \
  qlmarkdown \
  qlstephen \
  quicklook-json \
  raycast \
  rocket \
  rocket-chat \
  tabby \
  visual-studio-code \
  vlc \
  vnc-viewer \
  webpquicklook
```

## 4. Install OhMyZSH

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# install plugins
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

```

## 5. Install Fonts

```bash
brew tap homebrew/cask-fonts
brew install --cask \
  font-hack-nerd-font \
  font-fira-code \
  font-barlowfont-jetbrains-mono
```

## 6. Install Volta for node version management

```bash
curl https://get.volta.sh | bash
```

## 7. Set System Preferences

Make sure you’re using the latest OS.

### From System Settings → Desk and Dock

Remove most applications from the Dock
"Double-click a window's title bar" off
Automatic Hide
Smaller Dock
"Show recent applications in Dock" off
"Show indicators for open applications" off
"Automatically rearrange Spaces based on most recent use" off
"Automatically hide and show the menu bar" always
From System Settings → Appearance:

"Appearance" set to Dark
"Accent color" set to gray
"Show Icon size" set to small
"Allow wallpaper tinting in windows" turn on
From System Settings → Control Center → Battery

"Show Percentage" turn on
From System Settings → Control Center → Clock

Set to 24-hour clock
Show date "Always"
Disable "Show the day of the week"
From System Settings → Keyboard

"Key repeat rate" set to fastest
From System Settings → Keyboard → All input Sources

disable "Correct spelling automatically"
disable "Capitalize words automatically"
disable "Use smart quotes and dashes"
use ” for double quotes
use ’ for single quotes
From System Settings → Trackpad

“Tracking Speed” set to the fastest
“Click” set to lightest
From System Settings → Notifications

Turn off every notification, except for calendar (I use Cron)
"Allow notification when the display is sleeping" off
"Allow notifications when the screen is locked" off
"Allow notifications when mirroring or sharing the display" off
From System Settings → Siri

Disable
From System Settings → iCloud

Turn off everything except "Photos", "Contacts", "Notes" and "Messages”
From System Settings → Spotlight

Disable all Spotlight applications (I use RayCast)

### From Finder → Settings

On the sidebar hide all items except "AirDrop" "Applications" "Documents" "Downloads" and “Desktop”

- Hide all tags
- Show all Filename Extensions
- Select “Remove Items from Bin after 30 Days”
- Set System Preferences From the Terminal

### Update the computer name

```bash
sudo scutil --set ComputerName "newname"
sudo scutil --set LocalHostName "newname"
sudo scutil --set HostName "newname"
```
