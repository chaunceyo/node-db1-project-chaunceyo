const router = require('express').Router()
const {checkAccountId, checkAccountNameUnique, checkAccountPayload} = require("./accounts-middleware")
const Account = require("./accounts-model")

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
      const accounts = await Account.getAll()
      res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account)
})

router.post('/', 
  checkAccountPayload, 
  checkAccountNameUnique,
  async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    req.body.name = req.body.name.trim()
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
})

router.put(
  '/:id', 
  checkAccountId,
  checkAccountPayload, 
  checkAccountNameUnique,
  async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const updatedAccount = await Account.updateById(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  }catch(err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const deletedAccount = await Account.deleteById(req.params.id)
    res.json(deletedAccount)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
