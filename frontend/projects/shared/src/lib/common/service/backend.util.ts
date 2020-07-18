
const DEFAULT_BACKEND_API = 'api/';

export class BackendUtil {

  static adjustBackendApi (url: string): string {
    if (!url) {
      return DEFAULT_BACKEND_API;
    }
    if (!url.endsWith('/')) {
      return `${url}/`;
    }
    return url;
  }

  static isBackendUrl(backendApi: string, url: string): boolean {
    return url.indexOf(backendApi) >= 0;
  }
}
