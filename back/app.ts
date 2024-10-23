import express from 'express'
import bodyParser from 'body-parser'
import { PostgresAuthenticator } from './impl/login/postgres_authenticator'
import { LoginUseCase } from '../core/login/use_case'
import { LoginRequest } from '../core/login/entities/request'
import { User } from '../core/login/entities/user'
import { LoginResponse } from '../core/login/entities/response'
import { PostgresLister } from './impl/list/postgres_lister'
import { ListUseCase } from '../core/list/use_case'
import { ListRequest } from '../core/list/entities/request'
import { Filter } from '../core/list/entities/filter'
import { ListResponse } from '../core/list/entities/response'
import { PostgresMarker } from './impl/mark_contacted/postgres_marker'
import { MarkContactedUseCase } from '../core/mark_contacted/use_case'
import { MarkContactedRequest } from '../core/mark_contacted/entities/request'
import { Contact } from '../core/mark_contacted/entities/contact'
import { MarkContactedResponse } from '../core/mark_contacted/entities/response'

const app = express()
const port = 3001

app.use(bodyParser.json())

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    res.status(400)
    res.json({ok: false, errors: ["Invalid request JSON"]})
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
     res.sendStatus(200);
   }
   else {
     next();
   }
});

app.post('/list', (req, res) => {
  res.setHeader("Content-Type", "application/json")

  const lister = new PostgresLister()
  const useCase = new ListUseCase(lister)
  const useCaseReq = new ListRequest(
    new Filter(
        req.body.name,
        req.body.reviewGreaterThan,
        req.body.reviewLessThan,
        req.body.contactedFrom,
        req.body.contactedTo,
        req.body.contactedBy,
        req.body.userId,
        req.body.page
      )
  )

  try {
    useCase.execute(
      useCaseReq,
      (lRes: ListResponse) => {
        res.status(400)
        res.json(lRes)
      },
      (lRes: LoginResponse) => {
        if (!lRes.ok) {
          res.status(400)
        }
        res.json(lRes)
      }
    )
  } catch (error) {
    res.status(500)
    res.json({ok: false, errors: ["Internal server error"]})
  }
})

app.get('/list', (req, res) => {
  res.setHeader("Content-Type", "application/json")

  const lister = new PostgresLister()
  const useCase = new ListUseCase(lister)
  const useCaseReq = new ListRequest(
    new Filter(
        req.body.name,
        req.body.reviewGreaterThan,
        req.body.reviewLessThan,
        req.body.contactedFrom,
        req.body.contactedTo,
        req.body.contactedBy,
        1,
        1
      )
  )

  try {
    useCase.execute(
      useCaseReq,
      (lRes: ListResponse) => {
        res.status(400)
        res.json(lRes)
      },
      (lRes: LoginResponse) => {
        if (!lRes.ok) {
          res.status(400)
        }
        res.json(lRes)
      }
    )
  } catch (error) {
    res.status(500)
    res.json({ok: false, errors: ["Internal server error"]})
  }
})

app.post('/mark-as-contacted', (req, res) => {
  res.setHeader("Content-Type", "application/json")

  const marker = new PostgresMarker()
  const useCase = new MarkContactedUseCase(marker)
  const useCaseReq = new MarkContactedRequest(
    new Contact(
        req.body.userId,
        req.body.businessId,
      )
  )

  try {
    useCase.execute(
      useCaseReq,
      (lRes: MarkContactedResponse) => {
        if (lRes.errors.length == 1 && lRes.errors[0] == "User not found") {
          res.status(404)
        } else {
          res.status(400)
        }
        res.json(lRes)
        return
      },
      (lRes: MarkContactedResponse) => {
        if(!lRes.ok) {
          res.status(404)
        }
        res.json(lRes)
        return
      }
    )
  } catch (error) {
    res.status(500)
    res.json({ok: false, errors: ["Internal server error"]})
    return
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
