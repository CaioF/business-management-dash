import { describe, expect, test, jest } from '@jest/globals';
import { StubMarker } from './stub_marker';
import { MarkContactedUseCase } from '../../../core/mark_contacted/use_case';
import { MarkContactedRequest } from '../../../core/mark_contacted/entities/request';
import { Contact } from '../../../core/mark_contacted/entities/contact';
import { MarkContactedResponse } from '../../../core/mark_contacted/entities/response';

describe('mark as contacted use case', () => {
    test('no errors', done => {
      const marker = new StubMarker(true, [], 1)
      const useCase = new MarkContactedUseCase(marker)
      const useCaseReq = new MarkContactedRequest(
        new Contact(1, 1)
      )

      function responseHandler(resp: MarkContactedResponse) {
        try {
          expect(resp).toStrictEqual(new MarkContactedResponse(true, [], 1));
          done();
        } catch (error) {
          done(error);
        }
      }
      const errorHandler = jest.fn();

      useCase.execute(useCaseReq, errorHandler, responseHandler)

      expect(errorHandler).toBeCalledTimes(0)
    });
})