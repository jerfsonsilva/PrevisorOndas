export class InternalError extends Error {
  constructor(
    public message: string,
    protected code: number = 500,
    protected description?: string
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export interface errorCode {
  erroCode: number
  message: string
}

export const errorListCode: { [key: string]: errorCode } = {
  internalError: {
    erroCode: 500,
    message: 'Internal error',
  },
}
