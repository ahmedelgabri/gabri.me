let
  # Grab node version from .nvmrc file
  nodeVersion =
    if builtins.pathExists ./.nvmrc then
      builtins.concatStringsSep
        "_" [
        "nodejs"
        (builtins.head (builtins.splitVersion (builtins.readFile
          ./.nvmrc)))
      ] else "nodejs";
in
with import <nixpkgs> { };
mkShell {
  # name = "";
  buildInputs = with pkgs; [
    pkgs.${nodeVersion}
    nodePackages.pnpm
  ];
}
