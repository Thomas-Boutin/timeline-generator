# Timeline Generator

Generator built with love to make modern and responsive timelines.

Used in production at the [Mobilis In Mobile conference](https://mobilis-in-mobile.io/).

## Development

```bash
npm run serve
```


## Build

```bash
npm run build
```

## Use

The generated bundle expects an html div with **timeline** as an id and a **slots-endpoint** attribute like so :

```html
<div id="timeline" slots-endpoint="/slots.json" />
```

The slots expected structure is available [here](https://mobilis-in-mobile.io/slots2023.json)
