import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  let { data } = req.body

  if (!data) {
    res.status(422).json('User Data Not Found')
  }

  if (data?.verified === 'unverified') {
    data.verifyWarning = true
  }

  try {
    req.session.set('user', data)
    await req.session.save()
    res.status(200).json('Session Changed')
  } catch (error) {
    res.status(500).json('Something Went Wrong')
  }
})
