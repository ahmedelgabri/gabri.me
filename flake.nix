{
  description = "gabri.me";
  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      perSystem =
        { pkgs, ... }:
        {
          devShells.default = pkgs.mkShell {
            name = "gabri.me";
            # wrangler is deliberately absent: it is a pinned pnpm
            # devDependency, so `pnpm exec wrangler` matches what CI deploys
            # with, and a second copy from nixpkgs would drift from it.
            buildInputs = with pkgs; [
              nodejs
              actionlint
              pnpm
              astro-language-server
            ];
            shellHook = "";
          };
        };
    };
}
