import * as Yup from 'yup'

Yup.addMethod(Yup.string, 'min', function (min, msg) {
  return this.test({
    name: 'min',
    exclusive: true,
    message: msg,
    test: (value) => !value || value.length >= min
  })
})

export default Yup
