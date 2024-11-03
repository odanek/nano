interface BundleArgs {
  packageDir: string;
}

export function bundle(args: BundleArgs): void {
  console.log(args.packageDir);
}
