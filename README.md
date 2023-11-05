
# 📦 dependency-logs // @thefirstspine/logs

Javascript and Typescript service to deliver unified logs. Works with Winstonjs.

Each log has fixed parts that are separated with a tabulation character `\t`:

```
{timestamp}\t{level}\t{fullMessage}
```

`fullMessage` is a JSON object that has two properties:
- `message` that is the main message of the log
- `data` that is some data about the log (context for instance).

## Install

```bash
npm i @thefirstspine/logs@latest
```

## Documentation

### LogsService

Main service to handle the logs in the TFS Platform.

#### info

Log an information message. An information is has only a purpose for debugging.

**Synopsis:** `info(message: string, data?: any): void`

**Params:**

- `message: string` The message to log.
- `data?: any` The data about the log (context for instance).

#### warning

Log a warning. A warning is an unexpected behavior that occurs in the platform, but handled properly.

**Synopsis:** `warning(message: string, data?: any): void`

**Params:**

- `message: string` The message to log.
- `data?: any` The data about the log (context for instance).

#### error

Log an error. An error should be treated immediatly because this is an unexpected and not handled behavior.

**Synopsis:** `error(message: string, data?: any): void`

**Params:**

- `message: string` The message to log.
- `data?: any` The data about the log (context for instance).

## How to use

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Publish on NPM

```bash
npm publish
```

## License

TFS Platform is NOT licensed. You are free to download, view, run the repository. You are NOT allowed to redistribute this project for both commercial and non-commercial use. Deal with it.
