const router = require('express').Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {
  //tratar dados do body
  const { name, salary, approved, status } = req.body

  const person = {
    name,
    salary,
    approved,
    status,
  }
  if (!name || !salary || !approved || !status) {
    return res.status(422).json({ error: 'All that params are required' })
  }

  //create

  try {
    await Person.create(person)

    res.status(201).json({ message: 'Person created with successfull' })
  } catch (error) {
    res.status(500).json({ error: `Something was wrong: \n ${error}` })
  }
})

router.get('/', async (req, res) => {
  try {
    const people = await Person.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ error: `Something was wrong: \n ${error}` })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findOne({ _id: id })
    if (!person) return res.status(422).json({ message: 'user not found' })
    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ error: `Something was wrong: \n ${error}` })
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { name, salary, approved, status } = req.body
  const person = {
    name,
    salary,
    approved,
    status,
  }
  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person)
    if (updatedPerson.matchedCount === 0)
      return res.status(422).json({ message: 'user not found' })
    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ error: `Something was wrong: \n ${error}` })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const person = await Person.findOne({ _id: id })
  if (!person) return res.status(422).json({ message: 'user not found' })
  try {
    await Person.deleteOne({ _id: id })

    return res.status(200).json({ message: 'user deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: `Something was wrong: \n ${error}` })
  }
})

module.exports = router
