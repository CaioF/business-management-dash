import { describe, expect, test, jest } from '@jest/globals';
import { StubLister } from './stub_lister';
import { ListUseCase } from '../../../core/list/use_case';
import { ListRequest } from '../../../core/list/entities/request';
import { Filter } from '../../../core/list/entities/filter';
import { ListResponse } from '../../../core/list/entities/response';

describe('list use case', () => {
    test('no errors', done => {
      const lister = new StubLister(true, [], [])
      const useCase = new ListUseCase(lister)

      const useCaseReq = new ListRequest(
        new Filter(
            "name",
            0,
            100,
            "2024-01-01 00:00:00",
            "2024-01-31 00:00:00",
            1,
            1,
            1
        )
      )

      function responseHandler(resp: ListResponse) {
        try {
          expect(resp).toStrictEqual(new ListResponse(true, [], []));
          done();
        } catch (error) {
          done(error);
        }
      }
      const errorHandler = jest.fn();

      useCase.execute(useCaseReq, errorHandler, responseHandler)

      expect(errorHandler).toBeCalledTimes(0)
    });

    test('invalid contacted from', done => {
        const lister = new StubLister(true, [], [])
        const useCase = new ListUseCase(lister)

        const useCaseReq = new ListRequest(
          new Filter(
              "name",
              0,
              100,
              "invalid",
              "2024-01-31 00:00:00",
              1,
              1,
              1
          )
        )

        const responseHandler = jest.fn();
        function errorHandler(resp: ListResponse) {
          try {
            expect(resp).toStrictEqual(
                new ListResponse(
                    false,
                    ["Minimum contact date must be a date"],
                    []
                )
            );
            done();
          } catch (error) {
            done(error);
          }
        }

        useCase.execute(useCaseReq, errorHandler, responseHandler)

        expect(responseHandler).toBeCalledTimes(0)
      });

      test('invalid contacted to', done => {
        const lister = new StubLister(true, [], [])
        const useCase = new ListUseCase(lister)

        const useCaseReq = new ListRequest(
          new Filter(
              "name",
              0,
              100,
              "2024-01-01 00:00:00",
              "invalid",
              1,
              1,
              1
          )
        )

        const responseHandler = jest.fn();
        function errorHandler(resp: ListResponse) {
          try {
            expect(resp).toStrictEqual(
                new ListResponse(
                    false,
                    ["Maximum contact date must be a date"],
                    []
                )
            );
            done();
          } catch (error) {
            done(error);
          }
        }

        useCase.execute(useCaseReq, errorHandler, responseHandler)

        expect(responseHandler).toBeCalledTimes(0)
      });
})