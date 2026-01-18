#!/bin/bash
set -e

# Install apt packages
sudo apt-get update
sudo apt-get install -y ripgrep fd-find stow curl

# Install mise
curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate bash)"' >>~/.bashrc
export PATH="$HOME/.local/bin:$PATH"

# Trust mise config before activating
~/.local/bin/mise trust

eval "$(~/.local/bin/mise activate bash)"

# Install neovim (prebuilt binary)
ARCH=$(uname -m)
if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
	NVIM_ARCHIVE="nvim-linux-arm64.tar.gz"
else
	NVIM_ARCHIVE="nvim-linux-x86_64.tar.gz"
fi
curl -LO "https://github.com/neovim/neovim/releases/latest/download/${NVIM_ARCHIVE}"
sudo tar -C /usr/local -xzf "$NVIM_ARCHIVE" --strip-components=1
rm "$NVIM_ARCHIVE"

# Install claude-code
npm install -g @anthropic-ai/claude-code

# Setup project
mise install
pnpm install

# Setup SSH from mounted host keys
if [ -d /tmp/host-ssh ]; then
	mkdir -p ~/.ssh
	cp -r /tmp/host-ssh/* ~/.ssh/ 2>/dev/null || true
	cat /tmp/host-ssh/*.pub > ~/.ssh/authorized_keys 2>/dev/null || true
	chmod 700 ~/.ssh
	chmod 600 ~/.ssh/* 2>/dev/null || true
	chmod 644 ~/.ssh/*.pub 2>/dev/null || true
fi

# Run local setup if exists
if [ -f .devcontainer/setup.local.sh ]; then
	.devcontainer/setup.local.sh
fi
