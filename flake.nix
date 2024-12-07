{
  description = "gabri.me";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.systems.follows = "systems";
    };
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
        # Grab node version from .nvmrc file if exits otherwise fallback to latest node
        nodeVersion =
          if builtins.pathExists ./.nvmrc
          then
            builtins.concatStringsSep
            "_" [
              "nodejs"
              (builtins.head (builtins.splitVersion (builtins.readFile
                    ./.nvmrc)))
            ]
          else "nodejs";
      in {
        devShells.default = pkgs.mkShell {
          name = "gabri.me";
          buildInputs = with pkgs; [
            pkgs.${nodeVersion}
            nodePackages.pnpm
            actionlint
          ];
        };
      }
    );
}
