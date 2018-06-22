# ngx-charts-web
Angular chart components

Please use
```
  ng g <component/service/etc> --project=ngx-charts-web
```
to generate things for the library. This will create the component/service/etc inside the `projects/ngx-charts-web` directory.

To build the library use the command 
```
  npm run build-lib
```
To build the library and launch the documentation app, run
```
  npm run start
```
`ng serve` will only start the documentation app, but the library needs to be built as the app it as a dependency. 

Library-side hot reloading to come in the future.

To update version, use
```
  npm run version-major
  npm run version-minor
  npm run version-patch
```
depending on the type of version update. This is because the library has its own package.json and will need to be updated.

To publish to npm, run
```
  npm run publish
```


