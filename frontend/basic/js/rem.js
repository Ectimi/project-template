!(function () {
  const setRem = () =>
    (document.documentElement.style.fontSize =
      document.body.clientWidth / 10 + 'px')

  setRem()

  window.addEventListener('resize', () => {
    setRem()
  })
})()
