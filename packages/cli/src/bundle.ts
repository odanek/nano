interface BundleArgs {
  packageDir: string;
}

export function bundle(args: BundleArgs) {
  console.log(args.packageDir);
}
