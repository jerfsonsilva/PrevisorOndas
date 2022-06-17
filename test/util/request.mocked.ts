import * as HTTPUtil from '@src/util/request'
export const mockedRequest =
  new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>
