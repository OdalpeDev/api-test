// eslint-disable-next-line @typescript-eslint/no-var-requires
const rTracer = require('cls-rtracer');

export class GeneralUtils {
  /**
   *
   */
  public static get getTraceId(): string {
    return rTracer.id() || '';
  }
}
