# Install MyCMS

## prepare-dev

### prepare src-directory
- run `npm install`
- fix mytourbook/node_modules/@types/vis/index.d.ts
```
export class Graph3d {
  constructor(container: HTMLElement,
              items: any,
              options?: any);

  setCameraPosition(pos);
}
```
- fix mytourbook/node_modules/js-data/dist/js-data.js defineMapper 
```
    descriptor.configurable = true;
    Object.defineProperty(mapper.recordClass.prototype, localField, descriptor);
```
- node_modules\@angular\cli\models\webpack-configs\common.js for tests: resolve .js before .ts
```
            extensions: ['.js', '.ts'],
``` 
